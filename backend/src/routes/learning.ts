import express from 'express';
import { prisma } from '../utils/database';
import { validate, createLearningTrackSchema, createModuleSchema, paginationSchema } from '../utils/validation';
import { authenticate, authorize, optionalAuth } from '../middleware/auth';
import { asyncHandler, createError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

const router = express.Router();

// Get all learning tracks
router.get('/tracks', optionalAuth, asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, level, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

  const skip = (Number(page) - 1) * Number(limit);

  const where: any = { isPublished: true };
  if (level) {
    where.level = level;
  }

  const [tracks, total] = await Promise.all([
    prisma.learningTrack.findMany({
      where,
      select: {
        id: true,
        title: true,
        description: true,
        level: true,
        duration: true,
        rating: true,
        totalStudents: true,
        thumbnail: true,
        modules: {
          select: {
            id: true,
            title: true,
            order: true,
            duration: true
          },
          orderBy: { order: 'asc' }
        },
        _count: {
          select: {
            enrollments: true
          }
        }
      },
      orderBy: { [sortBy as string]: sortOrder },
      skip,
      take: Number(limit)
    }),
    prisma.learningTrack.count({ where })
  ]);

  res.json({
    success: true,
    data: {
      tracks,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    }
  });
}));

// Get single learning track
router.get('/tracks/:id', optionalAuth, asyncHandler(async (req, res) => {
  const { id } = req.params;

  const track = await prisma.learningTrack.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      description: true,
      level: true,
      duration: true,
      rating: true,
      totalStudents: true,
      thumbnail: true,
      isPublished: true,
      modules: {
        select: {
          id: true,
          title: true,
          description: true,
          order: true,
          duration: true,
          content: true,
          videoUrl: true,
          resources: true,
          lessons: {
            select: {
              id: true,
              title: true,
              description: true,
              order: true,
              duration: true,
              content: true,
              videoUrl: true,
              resources: true
            },
            orderBy: { order: 'asc' }
          }
        },
        orderBy: { order: 'asc' }
      },
      _count: {
        select: {
          enrollments: true
        }
      }
    }
  });

  if (!track || !track.isPublished) {
    throw createError('Learning track not found', 404);
  }

  // Get user enrollment if authenticated
  let userEnrollment = null;
  if (req.user) {
    userEnrollment = await prisma.enrollment.findUnique({
      where: {
        userId_trackId: {
          userId: req.user.id,
          trackId: id
        }
      },
      select: {
        progress: true,
        isCompleted: true,
        completedAt: true
      }
    });
  }

  res.json({
    success: true,
    data: {
      track,
      userEnrollment
    }
  });
}));

// Enroll in learning track
router.post('/tracks/:id/enroll', authenticate, asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user!.id;

  // Check if track exists
  const track = await prisma.learningTrack.findUnique({
    where: { id }
  });

  if (!track || !track.isPublished) {
    throw createError('Learning track not found', 404);
  }

  // Check if already enrolled
  const existingEnrollment = await prisma.enrollment.findUnique({
    where: {
      userId_trackId: {
        userId,
        trackId: id
      }
    }
  });

  if (existingEnrollment) {
    throw createError('Already enrolled in this track', 400);
  }

  // Create enrollment
  const enrollment = await prisma.enrollment.create({
    data: {
      userId,
      trackId: id
    },
    include: {
      track: {
        select: {
          id: true,
          title: true,
          description: true,
          level: true,
          duration: true,
          thumbnail: true
        }
      }
    }
  });

  logger.info(`User enrolled in track: ${req.user?.email} -> ${track.title}`);

  res.status(201).json({
    success: true,
    message: 'Successfully enrolled in learning track',
    data: { enrollment }
  });
}));

// Get user enrollments
router.get('/enrollments', authenticate, asyncHandler(async (req, res) => {
  const userId = req.user!.id;
  const { page = 1, limit = 10 } = req.query;

  const skip = (Number(page) - 1) * Number(limit);

  const [enrollments, total] = await Promise.all([
    prisma.enrollment.findMany({
      where: { userId },
      include: {
        track: {
          select: {
            id: true,
            title: true,
            description: true,
            level: true,
            duration: true,
            thumbnail: true,
            rating: true,
            totalStudents: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: Number(limit)
    }),
    prisma.enrollment.count({ where: { userId } })
  ]);

  res.json({
    success: true,
    data: {
      enrollments,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    }
  });
}));

// Update enrollment progress
router.patch('/enrollments/:enrollmentId/progress', authenticate, asyncHandler(async (req, res) => {
  const { enrollmentId } = req.params;
  const { progress } = req.body;
  const userId = req.user!.id;

  if (progress < 0 || progress > 100) {
    throw createError('Progress must be between 0 and 100', 400);
  }

  const enrollment = await prisma.enrollment.findFirst({
    where: {
      id: enrollmentId,
      userId
    }
  });

  if (!enrollment) {
    throw createError('Enrollment not found', 404);
  }

  const isCompleted = progress >= 100;
  const completedAt = isCompleted ? new Date() : null;

  const updatedEnrollment = await prisma.enrollment.update({
    where: { id: enrollmentId },
    data: {
      progress,
      isCompleted,
      completedAt
    },
    include: {
      track: {
        select: {
          id: true,
          title: true,
          level: true
        }
      }
    }
  });

  // Award XP for completion
  if (isCompleted && !enrollment.isCompleted) {
    const xpReward = 100; // Base XP for completing a track
    await prisma.user.update({
      where: { id: userId },
      data: {
        totalXP: {
          increment: xpReward
        }
      }
    });

    // Check for level up
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { totalXP: true, currentLevel: true }
    });

    if (user) {
      const newLevel = Math.floor(user.totalXP / 1000) + 1;
      if (newLevel > user.currentLevel) {
        await prisma.user.update({
          where: { id: userId },
          data: { currentLevel: newLevel }
        });
      }
    }

    logger.info(`Track completed: ${req.user?.email} -> ${updatedEnrollment.track.title}`);
  }

  res.json({
    success: true,
    message: 'Progress updated successfully',
    data: { enrollment: updatedEnrollment }
  });
}));

// Get module content
router.get('/modules/:id', authenticate, asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user!.id;

  const module = await prisma.module.findUnique({
    where: { id },
    include: {
      track: {
        select: {
          id: true,
          title: true,
          isPublished: true
        }
      },
      lessons: {
        select: {
          id: true,
          title: true,
          description: true,
          order: true,
          duration: true,
          content: true,
          videoUrl: true,
          resources: true,
          quiz: true
        },
        orderBy: { order: 'asc' }
      }
    }
  });

  if (!module || !module.track.isPublished) {
    throw createError('Module not found', 404);
  }

  // Check if user is enrolled
  const enrollment = await prisma.enrollment.findFirst({
    where: {
      userId,
      trackId: module.trackId
    }
  });

  if (!enrollment) {
    throw createError('You must be enrolled in this track to access modules', 403);
  }

  // Get user progress for this module
  const moduleProgress = await prisma.moduleProgress.findUnique({
    where: {
      userId_moduleId: {
        userId,
        moduleId: id
      }
    }
  });

  res.json({
    success: true,
    data: {
      module,
      progress: moduleProgress
    }
  });
}));

// Update module progress
router.patch('/modules/:id/progress', authenticate, asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { progress } = req.body;
  const userId = req.user!.id;

  if (progress < 0 || progress > 100) {
    throw createError('Progress must be between 0 and 100', 400);
  }

  const module = await prisma.module.findUnique({
    where: { id },
    select: { id: true, trackId: true }
  });

  if (!module) {
    throw createError('Module not found', 404);
  }

  // Check enrollment
  const enrollment = await prisma.enrollment.findFirst({
    where: {
      userId,
      trackId: module.trackId
    }
  });

  if (!enrollment) {
    throw createError('You must be enrolled in this track', 403);
  }

  const isCompleted = progress >= 100;
  const completedAt = isCompleted ? new Date() : null;

  const moduleProgress = await prisma.moduleProgress.upsert({
    where: {
      userId_moduleId: {
        userId,
        moduleId: id
      }
    },
    update: {
      progress,
      isCompleted,
      completedAt
    },
    create: {
      userId,
      moduleId: id,
      enrollmentId: enrollment.id,
      progress,
      isCompleted,
      completedAt
    }
  });

  res.json({
    success: true,
    message: 'Module progress updated successfully',
    data: { progress: moduleProgress }
  });
}));

// Admin: Create learning track
router.post('/tracks', authenticate, authorize('INSTRUCTOR', 'ADMIN'), asyncHandler(async (req, res) => {
  const trackData = validate(createLearningTrackSchema, req.body);

  const track = await prisma.learningTrack.create({
    data: {
      ...trackData,
      authorId: req.user!.id
    },
    select: {
      id: true,
      title: true,
      description: true,
      level: true,
      duration: true,
      thumbnail: true,
      isPublished: true
    }
  });

  logger.info(`Learning track created: ${track.title} by ${req.user?.email}`);

  res.status(201).json({
    success: true,
    message: 'Learning track created successfully',
    data: { track }
  });
}));

// Admin: Create module
router.post('/tracks/:trackId/modules', authenticate, authorize('INSTRUCTOR', 'ADMIN'), asyncHandler(async (req, res) => {
  const { trackId } = req.params;
  const moduleData = validate(createModuleSchema, req.body);

  // Check if track exists and user has permission
  const track = await prisma.learningTrack.findFirst({
    where: {
      id: trackId,
      OR: [
        { authorId: req.user!.id },
        { authorId: { not: null } } // For now, allow any instructor to add modules
      ]
    }
  });

  if (!track) {
    throw createError('Track not found or insufficient permissions', 404);
  }

  const module = await prisma.module.create({
    data: {
      ...moduleData,
      trackId
    },
    select: {
      id: true,
      title: true,
      description: true,
      order: true,
      duration: true,
      content: true,
      videoUrl: true,
      resources: true
    }
  });

  logger.info(`Module created: ${module.title} in track ${track.title}`);

  res.status(201).json({
    success: true,
    message: 'Module created successfully',
    data: { module }
  });
}));

// Search learning tracks
router.get('/search', asyncHandler(async (req, res) => {
  const { q, level, page = 1, limit = 10 } = req.query;

  if (!q || typeof q !== 'string') {
    throw createError('Search query is required', 400);
  }

  const skip = (Number(page) - 1) * Number(limit);

  const where: any = {
    isPublished: true,
    OR: [
      { title: { contains: q, mode: 'insensitive' } },
      { description: { contains: q, mode: 'insensitive' } }
    ]
  };

  if (level) {
    where.level = level;
  }

  const [tracks, total] = await Promise.all([
    prisma.learningTrack.findMany({
      where,
      select: {
        id: true,
        title: true,
        description: true,
        level: true,
        duration: true,
        rating: true,
        totalStudents: true,
        thumbnail: true
      },
      orderBy: { rating: 'desc' },
      skip,
      take: Number(limit)
    }),
    prisma.learningTrack.count({ where })
  ]);

  res.json({
    success: true,
    data: {
      tracks,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    }
  });
}));

export default router;
