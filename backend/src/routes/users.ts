import express from 'express';
import { prisma } from '../utils/database';
import { validate, updateProfileSchema, paginationSchema } from '../utils/validation';
import { authenticate, authorize } from '../middleware/auth';
import { asyncHandler, createError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

const router = express.Router();

// Get user profile
router.get('/profile/:username', asyncHandler(async (req, res) => {
  const { username } = req.params;

  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      username: true,
      firstName: true,
      lastName: true,
      avatar: true,
      bio: true,
      location: true,
      website: true,
      githubUrl: true,
      linkedinUrl: true,
      totalXP: true,
      currentLevel: true,
      learningStreak: true,
      joinDate: true,
      lastActive: true,
      projects: {
        where: { isPublished: true },
        select: {
          id: true,
          title: true,
          description: true,
          difficulty: true,
          technology: true,
          thumbnail: true,
          likes: true,
          views: true,
          createdAt: true
        },
        orderBy: { createdAt: 'desc' },
        take: 6
      },
      badges: {
        include: {
          badge: true
        },
        orderBy: { earnedAt: 'desc' },
        take: 8
      }
    }
  });

  if (!user) {
    throw createError('User not found', 404);
  }

  res.json({
    success: true,
    data: { user }
  });
}));

// Update user profile
router.put('/profile', authenticate, asyncHandler(async (req, res) => {
  const userId = req.user!.id;
  const updateData = validate(updateProfileSchema, req.body);

  const user = await prisma.user.update({
    where: { id: userId },
    data: updateData,
    select: {
      id: true,
      email: true,
      username: true,
      firstName: true,
      lastName: true,
      avatar: true,
      bio: true,
      location: true,
      website: true,
      githubUrl: true,
      linkedinUrl: true,
      totalXP: true,
      currentLevel: true,
      learningStreak: true,
      joinDate: true,
      lastActive: true
    }
  });

  logger.info(`User profile updated: ${user.email}`);

  res.json({
    success: true,
    message: 'Profile updated successfully',
    data: { user }
  });
}));

// Get user dashboard data
router.get('/dashboard', authenticate, asyncHandler(async (req, res) => {
  const userId = req.user!.id;

  // Get user stats
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      totalXP: true,
      currentLevel: true,
      learningStreak: true,
      lastStreakDate: true
    }
  });

  if (!user) {
    throw createError('User not found', 404);
  }

  // Get recent projects
  const recentProjects = await prisma.project.findMany({
    where: { authorId: userId },
    select: {
      id: true,
      title: true,
      description: true,
      difficulty: true,
      technology: true,
      thumbnail: true,
      likes: true,
      views: true,
      createdAt: true
    },
    orderBy: { createdAt: 'desc' },
    take: 5
  });

  // Get recent enrollments
  const recentEnrollments = await prisma.enrollment.findMany({
    where: { userId },
    include: {
      track: {
        select: {
          id: true,
          title: true,
          description: true,
          level: true,
          thumbnail: true
        }
      }
    },
    orderBy: { createdAt: 'desc' },
    take: 5
  });

  // Get recent badges
  const recentBadges = await prisma.userBadge.findMany({
    where: { userId },
    include: {
      badge: true
    },
    orderBy: { earnedAt: 'desc' },
    take: 5
  });

  // Get learning streak
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const hasActivityToday = await prisma.lessonProgress.findFirst({
    where: {
      userId,
      completedAt: {
        gte: new Date(today.getFullYear(), today.getMonth(), today.getDate())
      }
    }
  });

  const hasActivityYesterday = await prisma.lessonProgress.findFirst({
    where: {
      userId,
      completedAt: {
        gte: new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate()),
        lt: new Date(today.getFullYear(), today.getMonth(), today.getDate())
      }
    }
  });

  // Update streak if needed
  let currentStreak = user.learningStreak;
  if (hasActivityToday && !hasActivityYesterday) {
    currentStreak += 1;
    await prisma.user.update({
      where: { id: userId },
      data: { 
        learningStreak: currentStreak,
        lastStreakDate: today
      }
    });
  } else if (!hasActivityToday && user.lastStreakDate && 
             user.lastStreakDate < yesterday) {
    currentStreak = 0;
    await prisma.user.update({
      where: { id: userId },
      data: { learningStreak: 0 }
    });
  }

  res.json({
    success: true,
    data: {
      user: {
        ...user,
        learningStreak: currentStreak
      },
      recentProjects,
      recentEnrollments,
      recentBadges
    }
  });
}));

// Get user portfolio
router.get('/portfolio/:username', asyncHandler(async (req, res) => {
  const { username } = req.params;

  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      username: true,
      firstName: true,
      lastName: true,
      avatar: true,
      bio: true,
      location: true,
      website: true,
      githubUrl: true,
      linkedinUrl: true,
      totalXP: true,
      currentLevel: true,
      learningStreak: true,
      joinDate: true,
      projects: {
        where: { isPublished: true },
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
          rating: true,
          createdAt: true
        },
        orderBy: { createdAt: 'desc' }
      },
      badges: {
        include: {
          badge: true
        },
        orderBy: { earnedAt: 'desc' }
      }
    }
  });

  if (!user) {
    throw createError('User not found', 404);
  }

  res.json({
    success: true,
    data: { user }
  });
}));

// Get user projects
router.get('/:username/projects', asyncHandler(async (req, res) => {
  const { username } = req.params;
  const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

  const user = await prisma.user.findUnique({
    where: { username },
    select: { id: true }
  });

  if (!user) {
    throw createError('User not found', 404);
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [projects, total] = await Promise.all([
    prisma.project.findMany({
      where: { 
        authorId: user.id,
        isPublished: true 
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
        likes: true,
        views: true,
        rating: true,
        createdAt: true
      },
      orderBy: { [sortBy as string]: sortOrder },
      skip,
      take: Number(limit)
    }),
    prisma.project.count({
      where: { 
        authorId: user.id,
        isPublished: true 
      }
    })
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

// Get user badges
router.get('/:username/badges', asyncHandler(async (req, res) => {
  const { username } = req.params;

  const user = await prisma.user.findUnique({
    where: { username },
    select: { id: true }
  });

  if (!user) {
    throw createError('User not found', 404);
  }

  const badges = await prisma.userBadge.findMany({
    where: { userId: user.id },
    include: {
      badge: true
    },
    orderBy: { earnedAt: 'desc' }
  });

  res.json({
    success: true,
    data: { badges }
  });
}));

// Search users
router.get('/search', asyncHandler(async (req, res) => {
  const { q, page = 1, limit = 10 } = req.query;

  if (!q || typeof q !== 'string') {
    throw createError('Search query is required', 400);
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where: {
        AND: [
          { isActive: true },
          {
            OR: [
              { username: { contains: q, mode: 'insensitive' } },
              { firstName: { contains: q, mode: 'insensitive' } },
              { lastName: { contains: q, mode: 'insensitive' } }
            ]
          }
        ]
      },
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        avatar: true,
        bio: true,
        totalXP: true,
        currentLevel: true
      },
      orderBy: { totalXP: 'desc' },
      skip,
      take: Number(limit)
    }),
    prisma.user.count({
      where: {
        AND: [
          { isActive: true },
          {
            OR: [
              { username: { contains: q, mode: 'insensitive' } },
              { firstName: { contains: q, mode: 'insensitive' } },
              { lastName: { contains: q, mode: 'insensitive' } }
            ]
          }
        ]
      }
    })
  ]);

  res.json({
    success: true,
    data: {
      users,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    }
  });
}));

// Admin: Get all users
router.get('/', authenticate, authorize('ADMIN'), asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

  const skip = (Number(page) - 1) * Number(limit);

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        totalXP: true,
        currentLevel: true,
        joinDate: true,
        lastActive: true
      },
      orderBy: { [sortBy as string]: sortOrder },
      skip,
      take: Number(limit)
    }),
    prisma.user.count()
  ]);

  res.json({
    success: true,
    data: {
      users,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    }
  });
}));

// Admin: Update user role
router.patch('/:userId/role', authenticate, authorize('ADMIN'), asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  if (!['STUDENT', 'INSTRUCTOR', 'ADMIN'].includes(role)) {
    throw createError('Invalid role', 400);
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data: { role },
    select: {
      id: true,
      email: true,
      username: true,
      role: true
    }
  });

  logger.info(`User role updated: ${user.email} -> ${role}`);

  res.json({
    success: true,
    message: 'User role updated successfully',
    data: { user }
  });
}));

export default router;
