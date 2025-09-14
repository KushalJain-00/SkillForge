import express from 'express';
import { prisma } from '../utils/database';
import { validate, createForumPostSchema, createForumReplySchema, paginationSchema } from '../utils/validation';
import { authenticate, optionalAuth } from '../middleware/auth';
import { asyncHandler, createError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

const router = express.Router();

// Get all forum posts
router.get('/posts', optionalAuth, asyncHandler(async (req, res) => {
  const { 
    page = 1, 
    limit = 10, 
    category, 
    solved, 
    sortBy = 'createdAt', 
    sortOrder = 'desc' 
  } = req.query;

  const skip = (Number(page) - 1) * Number(limit);

  const where: any = {};
  
  if (category) {
    where.category = category;
  }
  
  if (solved !== undefined) {
    where.isSolved = solved === 'true';
  }

  const [posts, total] = await Promise.all([
    prisma.forumPost.findMany({
      where,
      select: {
        id: true,
        title: true,
        content: true,
        category: true,
        tags: true,
        isSolved: true,
        isPinned: true,
        likes: true,
        views: true,
        replies: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            avatar: true,
            totalXP: true,
            currentLevel: true
          }
        },
        _count: {
          select: {
            replies: true
          }
        }
      },
      orderBy: [
        { isPinned: 'desc' },
        { [sortBy as string]: sortOrder }
      ],
      skip,
      take: Number(limit)
    }),
    prisma.forumPost.count({ where })
  ]);

  res.json({
    success: true,
    data: {
      posts,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    }
  });
}));

// Get single forum post
router.get('/posts/:id', optionalAuth, asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await prisma.forumPost.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      content: true,
      category: true,
      tags: true,
      isSolved: true,
      isPinned: true,
      likes: true,
      views: true,
      replies: true,
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
          currentLevel: true,
          joinDate: true
        }
      }
    }
  });

  if (!post) {
    throw createError('Forum post not found', 404);
  }

  // Increment view count
  await prisma.forumPost.update({
    where: { id },
    data: { views: { increment: 1 } }
  });

  // Get replies
  const replies = await prisma.forumReply.findMany({
    where: { postId: id },
    select: {
      id: true,
      content: true,
      parentId: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
          avatar: true,
          totalXP: true,
          currentLevel: true
        }
      },
      replies: {
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
              avatar: true,
              totalXP: true,
              currentLevel: true
            }
          }
        },
        orderBy: { createdAt: 'asc' }
      }
    },
    orderBy: { createdAt: 'asc' }
  });

  res.json({
    success: true,
    data: {
      post,
      replies
    }
  });
}));

// Create forum post
router.post('/posts', authenticate, asyncHandler(async (req, res) => {
  const postData = validate(createForumPostSchema, req.body);
  const userId = req.user!.id;

  const post = await prisma.forumPost.create({
    data: {
      ...postData,
      authorId: userId
    },
    select: {
      id: true,
      title: true,
      content: true,
      category: true,
      tags: true,
      isSolved: true,
      isPinned: true,
      likes: true,
      views: true,
      replies: true,
      createdAt: true,
      author: {
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
          avatar: true,
          totalXP: true,
          currentLevel: true
        }
      }
    }
  });

  logger.info(`Forum post created: ${post.title} by ${req.user?.email}`);

  res.status(201).json({
    success: true,
    message: 'Forum post created successfully',
    data: { post }
  });
}));

// Update forum post
router.put('/posts/:id', authenticate, asyncHandler(async (req, res) => {
  const { id } = req.params;
  const postData = validate(createForumPostSchema, req.body);
  const userId = req.user!.id;

  // Check if post exists and user owns it
  const existingPost = await prisma.forumPost.findFirst({
    where: {
      id,
      authorId: userId
    }
  });

  if (!existingPost) {
    throw createError('Forum post not found or insufficient permissions', 404);
  }

  const post = await prisma.forumPost.update({
    where: { id },
    data: postData,
    select: {
      id: true,
      title: true,
      content: true,
      category: true,
      tags: true,
      isSolved: true,
      isPinned: true,
      likes: true,
      views: true,
      replies: true,
      updatedAt: true,
      author: {
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
          avatar: true,
          totalXP: true,
          currentLevel: true
        }
      }
    }
  });

  logger.info(`Forum post updated: ${post.title} by ${req.user?.email}`);

  res.json({
    success: true,
    message: 'Forum post updated successfully',
    data: { post }
  });
}));

// Delete forum post
router.delete('/posts/:id', authenticate, asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user!.id;

  // Check if post exists and user owns it
  const existingPost = await prisma.forumPost.findFirst({
    where: {
      id,
      authorId: userId
    }
  });

  if (!existingPost) {
    throw createError('Forum post not found or insufficient permissions', 404);
  }

  await prisma.forumPost.delete({
    where: { id }
  });

  logger.info(`Forum post deleted: ${existingPost.title} by ${req.user?.email}`);

  res.json({
    success: true,
    message: 'Forum post deleted successfully'
  });
}));

// Mark post as solved
router.patch('/posts/:id/solve', authenticate, asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user!.id;

  // Check if post exists and user owns it
  const existingPost = await prisma.forumPost.findFirst({
    where: {
      id,
      authorId: userId
    }
  });

  if (!existingPost) {
    throw createError('Forum post not found or insufficient permissions', 404);
  }

  const post = await prisma.forumPost.update({
    where: { id },
    data: { isSolved: true },
    select: {
      id: true,
      title: true,
      isSolved: true
    }
  });

  logger.info(`Forum post marked as solved: ${post.title} by ${req.user?.email}`);

  res.json({
    success: true,
    message: 'Post marked as solved',
    data: { post }
  });
}));

// Add reply to forum post
router.post('/posts/:id/replies', authenticate, asyncHandler(async (req, res) => {
  const { id } = req.params;
  const replyData = validate(createForumReplySchema, req.body);
  const userId = req.user!.id;

  // Check if post exists
  const post = await prisma.forumPost.findUnique({
    where: { id }
  });

  if (!post) {
    throw createError('Forum post not found', 404);
  }

  const reply = await prisma.forumReply.create({
    data: {
      ...replyData,
      userId,
      postId: id
    },
    select: {
      id: true,
      content: true,
      parentId: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
          avatar: true,
          totalXP: true,
          currentLevel: true
        }
      }
    }
  });

  // Update reply count
  await prisma.forumPost.update({
    where: { id },
    data: { replies: { increment: 1 } }
  });

  logger.info(`Reply added to forum post: ${post.title} by ${req.user?.email}`);

  res.status(201).json({
    success: true,
    message: 'Reply added successfully',
    data: { reply }
  });
}));

// Update forum reply
router.put('/replies/:id', authenticate, asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const userId = req.user!.id;

  if (!content || content.trim().length === 0) {
    throw createError('Reply content is required', 400);
  }

  // Check if reply exists and user owns it
  const existingReply = await prisma.forumReply.findFirst({
    where: {
      id,
      userId
    }
  });

  if (!existingReply) {
    throw createError('Reply not found or insufficient permissions', 404);
  }

  const reply = await prisma.forumReply.update({
    where: { id },
    data: { content: content.trim() },
    select: {
      id: true,
      content: true,
      parentId: true,
      updatedAt: true,
      user: {
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
          avatar: true,
          totalXP: true,
          currentLevel: true
        }
      }
    }
  });

  logger.info(`Forum reply updated by ${req.user?.email}`);

  res.json({
    success: true,
    message: 'Reply updated successfully',
    data: { reply }
  });
}));

// Delete forum reply
router.delete('/replies/:id', authenticate, asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user!.id;

  // Check if reply exists and user owns it
  const existingReply = await prisma.forumReply.findFirst({
    where: {
      id,
      userId
    },
    include: {
      post: true
    }
  });

  if (!existingReply) {
    throw createError('Reply not found or insufficient permissions', 404);
  }

  await prisma.forumReply.delete({
    where: { id }
  });

  // Update reply count
  await prisma.forumPost.update({
    where: { id: existingReply.postId },
    data: { replies: { decrement: 1 } }
  });

  logger.info(`Forum reply deleted by ${req.user?.email}`);

  res.json({
    success: true,
    message: 'Reply deleted successfully'
  });
}));

// Get forum categories
router.get('/categories', asyncHandler(async (req, res) => {
  const categories = await prisma.forumPost.groupBy({
    by: ['category'],
    _count: {
      id: true
    },
    orderBy: {
      _count: {
        id: 'desc'
      }
    }
  });

  const categoryData = categories.map(cat => ({
    name: cat.category,
    count: cat._count.id
  }));

  res.json({
    success: true,
    data: { categories: categoryData }
  });
}));

// Search forum posts
router.get('/search', asyncHandler(async (req, res) => {
  const { q, category, page = 1, limit = 10 } = req.query;

  if (!q || typeof q !== 'string') {
    throw createError('Search query is required', 400);
  }

  const skip = (Number(page) - 1) * Number(limit);

  const where: any = {
    OR: [
      { title: { contains: q, mode: 'insensitive' } },
      { content: { contains: q, mode: 'insensitive' } },
      { tags: { has: q } }
    ]
  };

  if (category) {
    where.category = category;
  }

  const [posts, total] = await Promise.all([
    prisma.forumPost.findMany({
      where,
      select: {
        id: true,
        title: true,
        content: true,
        category: true,
        tags: true,
        isSolved: true,
        likes: true,
        views: true,
        replies: true,
        createdAt: true,
        author: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            avatar: true,
            totalXP: true,
            currentLevel: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: Number(limit)
    }),
    prisma.forumPost.count({ where })
  ]);

  res.json({
    success: true,
    data: {
      posts,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    }
  });
}));

// Get trending posts
router.get('/trending', asyncHandler(async (req, res) => {
  const { limit = 5 } = req.query;

  const posts = await prisma.forumPost.findMany({
    where: {
      createdAt: {
        gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
      }
    },
    select: {
      id: true,
      title: true,
      category: true,
      likes: true,
      views: true,
      replies: true,
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
    orderBy: [
      { likes: 'desc' },
      { views: 'desc' }
    ],
    take: Number(limit)
  });

  res.json({
    success: true,
    data: { posts }
  });
}));

export default router;
