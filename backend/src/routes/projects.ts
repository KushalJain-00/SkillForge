import express from 'express';
import { prisma } from '../utils/database';
import { validate, createProjectSchema, paginationSchema } from '../utils/validation';
import { authenticate, optionalAuth } from '../middleware/auth';
import { asyncHandler, createError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

const router = express.Router();

// Get all projects
router.get('/', optionalAuth, asyncHandler(async (req, res) => {
  const { 
    page = 1, 
    limit = 12, 
    difficulty, 
    technology, 
    sortBy = 'createdAt', 
    sortOrder = 'desc',
    featured
  } = req.query;

  const skip = (Number(page) - 1) * Number(limit);

  const where: any = { isPublished: true };
  
  if (difficulty) {
    where.difficulty = difficulty;
  }
  
  if (technology) {
    where.technology = {
      has: technology
    };
  }
  
  if (featured === 'true') {
    where.isFeatured = true;
  }

  const [projects, total] = await Promise.all([
    prisma.project.findMany({
      where,
      select: {
        id: true,
        title: true,
        description: true,
        difficulty: true,
        technology: true,
        tags: true,
        thumbnail: true,
        githubUrl: true,
        liveUrl: true,
        likes: true,
        views: true,
        comments: true,
        rating: true,
        createdAt: true,
        author: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            avatar: true
          }
        },
        _count: {
          select: {
            likes: true,
            comments: true
          }
        }
      },
      orderBy: { [sortBy as string]: sortOrder },
      skip,
      take: Number(limit)
    }),
    prisma.project.count({ where })
  ]);

  res.json({
    success: true,
    data: {
      projects,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    }
  });
}));

// Get single project
router.get('/:id', optionalAuth, asyncHandler(async (req, res) => {
  const { id } = req.params;

  const project = await prisma.project.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      description: true,
      content: true,
      difficulty: true,
      technology: true,
      tags: true,
      thumbnail: true,
      githubUrl: true,
      liveUrl: true,
      likes: true,
      views: true,
      comments: true,
      rating: true,
      createdAt: true,
      updatedAt: true,
      author: {
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
          avatar: true,
          bio: true,
          totalXP: true,
          currentLevel: true
        }
      },
      _count: {
        select: {
          likes: true,
          comments: true
        }
      }
    }
  });

  if (!project || !project.isPublished) {
    throw createError('Project not found', 404);
  }

  // Increment view count
  await prisma.project.update({
    where: { id },
    data: { views: { increment: 1 } }
  });

  // Check if user liked this project
  let userLiked = false;
  if (req.user) {
    const like = await prisma.projectLike.findUnique({
      where: {
        userId_projectId: {
          userId: req.user.id,
          projectId: id
        }
      }
    });
    userLiked = !!like;
  }

  res.json({
    success: true,
    data: {
      project: {
        ...project,
        userLiked
      }
    }
  });
}));

// Create project
router.post('/', authenticate, asyncHandler(async (req, res) => {
  const projectData = validate(createProjectSchema, req.body);
  const userId = req.user!.id;

  const project = await prisma.project.create({
    data: {
      ...projectData,
      authorId: userId
    },
    select: {
      id: true,
      title: true,
      description: true,
      difficulty: true,
      technology: true,
      tags: true,
      thumbnail: true,
      githubUrl: true,
      liveUrl: true,
      isPublished: true,
      createdAt: true
    }
  });

  logger.info(`Project created: ${project.title} by ${req.user?.email}`);

  res.status(201).json({
    success: true,
    message: 'Project created successfully',
    data: { project }
  });
}));

// Update project
router.put('/:id', authenticate, asyncHandler(async (req, res) => {
  const { id } = req.params;
  const projectData = validate(createProjectSchema, req.body);
  const userId = req.user!.id;

  // Check if project exists and user owns it
  const existingProject = await prisma.project.findFirst({
    where: {
      id,
      authorId: userId
    }
  });

  if (!existingProject) {
    throw createError('Project not found or insufficient permissions', 404);
  }

  const project = await prisma.project.update({
    where: { id },
    data: projectData,
    select: {
      id: true,
      title: true,
      description: true,
      difficulty: true,
      technology: true,
      tags: true,
      thumbnail: true,
      githubUrl: true,
      liveUrl: true,
      isPublished: true,
      updatedAt: true
    }
  });

  logger.info(`Project updated: ${project.title} by ${req.user?.email}`);

  res.json({
    success: true,
    message: 'Project updated successfully',
    data: { project }
  });
}));

// Delete project
router.delete('/:id', authenticate, asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user!.id;

  // Check if project exists and user owns it
  const existingProject = await prisma.project.findFirst({
    where: {
      id,
      authorId: userId
    }
  });

  if (!existingProject) {
    throw createError('Project not found or insufficient permissions', 404);
  }

  await prisma.project.delete({
    where: { id }
  });

  logger.info(`Project deleted: ${existingProject.title} by ${req.user?.email}`);

  res.json({
    success: true,
    message: 'Project deleted successfully'
  });
}));

// Like/Unlike project
router.post('/:id/like', authenticate, asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user!.id;

  // Check if project exists
  const project = await prisma.project.findUnique({
    where: { id }
  });

  if (!project) {
    throw createError('Project not found', 404);
  }

  // Check if already liked
  const existingLike = await prisma.projectLike.findUnique({
    where: {
      userId_projectId: {
        userId,
        projectId: id
      }
    }
  });

  if (existingLike) {
    // Unlike
    await prisma.projectLike.delete({
      where: { id: existingLike.id }
    });

    await prisma.project.update({
      where: { id },
      data: { likes: { decrement: 1 } }
    });

    res.json({
      success: true,
      message: 'Project unliked',
      data: { liked: false }
    });
  } else {
    // Like
    await prisma.projectLike.create({
      data: {
        userId,
        projectId: id
      }
    });

    await prisma.project.update({
      where: { id },
      data: { likes: { increment: 1 } }
    });

    res.json({
      success: true,
      message: 'Project liked',
      data: { liked: true }
    });
  }
}));

// Get project comments
router.get('/:id/comments', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { page = 1, limit = 10 } = req.query;

  const skip = (Number(page) - 1) * Number(limit);

  // Check if project exists
  const project = await prisma.project.findUnique({
    where: { id },
    select: { id: true }
  });

  if (!project) {
    throw createError('Project not found', 404);
  }

  const [comments, total] = await Promise.all([
    prisma.projectComment.findMany({
      where: { projectId: id },
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            avatar: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: Number(limit)
    }),
    prisma.projectComment.count({ where: { projectId: id } })
  ]);

  res.json({
    success: true,
    data: {
      comments,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    }
  });
}));

// Add project comment
router.post('/:id/comments', authenticate, asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const userId = req.user!.id;

  if (!content || content.trim().length === 0) {
    throw createError('Comment content is required', 400);
  }

  // Check if project exists
  const project = await prisma.project.findUnique({
    where: { id }
  });

  if (!project) {
    throw createError('Project not found', 404);
  }

  const comment = await prisma.projectComment.create({
    data: {
      content: content.trim(),
      userId,
      projectId: id
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
          avatar: true
        }
      }
    }
  });

  // Update comment count
  await prisma.project.update({
    where: { id },
    data: { comments: { increment: 1 } }
  });

  logger.info(`Comment added to project: ${project.title} by ${req.user?.email}`);

  res.status(201).json({
    success: true,
    message: 'Comment added successfully',
    data: { comment }
  });
}));

// Search projects
router.get('/search', asyncHandler(async (req, res) => {
  const { q, difficulty, technology, page = 1, limit = 12 } = req.query;

  if (!q || typeof q !== 'string') {
    throw createError('Search query is required', 400);
  }

  const skip = (Number(page) - 1) * Number(limit);

  const where: any = {
    isPublished: true,
    OR: [
      { title: { contains: q, mode: 'insensitive' } },
      { description: { contains: q, mode: 'insensitive' } },
      { tags: { has: q } }
    ]
  };

  if (difficulty) {
    where.difficulty = difficulty;
  }

  if (technology) {
    where.technology = {
      has: technology
    };
  }

  const [projects, total] = await Promise.all([
    prisma.project.findMany({
      where,
      select: {
        id: true,
        title: true,
        description: true,
        difficulty: true,
        technology: true,
        tags: true,
        thumbnail: true,
        likes: true,
        views: true,
        rating: true,
        createdAt: true,
        author: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            avatar: true
          }
        }
      },
      orderBy: { rating: 'desc' },
      skip,
      take: Number(limit)
    }),
    prisma.project.count({ where })
  ]);

  res.json({
    success: true,
    data: {
      projects,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    }
  });
}));

// Get featured projects
router.get('/featured', asyncHandler(async (req, res) => {
  const { limit = 6 } = req.query;

  const projects = await prisma.project.findMany({
    where: {
      isPublished: true,
      isFeatured: true
    },
    select: {
      id: true,
      title: true,
      description: true,
      difficulty: true,
      technology: true,
      thumbnail: true,
      likes: true,
      views: true,
      rating: true,
      createdAt: true,
      author: {
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
          avatar: true
        }
      }
    },
    orderBy: { createdAt: 'desc' },
    take: Number(limit)
  });

  res.json({
    success: true,
    data: { projects }
  });
}));

export default router;
