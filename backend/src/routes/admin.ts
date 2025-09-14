import express from 'express';
import { prisma } from '../utils/database';
import { authenticate, authorize } from '../middleware/auth';
import { asyncHandler, createError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

const router = express.Router();

// All admin routes require authentication and admin role
router.use(authenticate);
router.use(authorize('ADMIN'));

// Get dashboard stats
router.get('/dashboard', asyncHandler(async (req, res) => {
  const [
    totalUsers,
    activeUsers,
    totalCourses,
    totalProjects,
    totalPosts,
    recentUsers,
    courseMetrics,
    systemHealth
  ] = await Promise.all([
    // Total users
    prisma.user.count(),
    
    // Active users (last 30 days)
    prisma.user.count({
      where: {
        lastActive: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        }
      }
    }),
    
    // Total courses
    prisma.learningTrack.count({
      where: { isPublished: true }
    }),
    
    // Total projects
    prisma.project.count({
      where: { isPublished: true }
    }),
    
    // Total forum posts
    prisma.forumPost.count(),
    
    // Recent users
    prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        joinDate: true,
        lastActive: true,
        isActive: true
      },
      orderBy: { joinDate: 'desc' },
      take: 10
    }),
    
    // Course metrics
    prisma.learningTrack.findMany({
      where: { isPublished: true },
      select: {
        id: true,
        title: true,
        level: true,
        rating: true,
        totalStudents: true,
        _count: {
          select: {
            enrollments: true
          }
        }
      },
      orderBy: { totalStudents: 'desc' },
      take: 10
    }),
    
    // System health (mock data for now)
    Promise.resolve([
      { metric: 'Server Uptime', value: '99.9%', status: 'excellent' },
      { metric: 'Response Time', value: '120ms', status: 'good' },
      { metric: 'Database Load', value: '45%', status: 'good' },
      { metric: 'Storage Usage', value: '67%', status: 'warning' }
    ])
  ]);

  // Calculate completion rate
  const totalEnrollments = await prisma.enrollment.count();
  const completedEnrollments = await prisma.enrollment.count({
    where: { isCompleted: true }
  });
  const completionRate = totalEnrollments > 0 ? Math.round((completedEnrollments / totalEnrollments) * 100) : 0;

  res.json({
    success: true,
    data: {
      stats: {
        totalUsers,
        activeUsers,
        totalCourses,
        totalProjects,
        totalPosts,
        completionRate
      },
      recentUsers,
      courseMetrics,
      systemHealth
    }
  });
}));

// Get all users with pagination
router.get('/users', asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, search, role, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

  const skip = (Number(page) - 1) * Number(limit);

  const where: any = {};
  
  if (search) {
    where.OR = [
      { email: { contains: search, mode: 'insensitive' } },
      { username: { contains: search, mode: 'insensitive' } },
      { firstName: { contains: search, mode: 'insensitive' } },
      { lastName: { contains: search, mode: 'insensitive' } }
    ];
  }
  
  if (role) {
    where.role = role;
  }

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
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
        lastActive: true,
        _count: {
          select: {
            projects: true,
            enrollments: true,
            badges: true
          }
        }
      },
      orderBy: { [sortBy as string]: sortOrder },
      skip,
      take: Number(limit)
    }),
    prisma.user.count({ where })
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

// Update user role
router.patch('/users/:id/role', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!['STUDENT', 'INSTRUCTOR', 'ADMIN'].includes(role)) {
    throw createError('Invalid role', 400);
  }

  const user = await prisma.user.update({
    where: { id },
    data: { role },
    select: {
      id: true,
      email: true,
      username: true,
      role: true
    }
  });

  logger.info(`User role updated: ${user.email} -> ${role} by ${req.user?.email}`);

  res.json({
    success: true,
    message: 'User role updated successfully',
    data: { user }
  });
}));

// Toggle user active status
router.patch('/users/:id/status', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { isActive } = req.body;

  const user = await prisma.user.update({
    where: { id },
    data: { isActive },
    select: {
      id: true,
      email: true,
      username: true,
      isActive: true
    }
  });

  logger.info(`User status updated: ${user.email} -> ${isActive ? 'active' : 'inactive'} by ${req.user?.email}`);

  res.json({
    success: true,
    message: `User ${isActive ? 'activated' : 'deactivated'} successfully`,
    data: { user }
  });
}));

// Get all courses
router.get('/courses', asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, search, level, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

  const skip = (Number(page) - 1) * Number(limit);

  const where: any = {};
  
  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } }
    ];
  }
  
  if (level) {
    where.level = level;
  }

  const [courses, total] = await Promise.all([
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
        isPublished: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            enrollments: true,
            modules: true
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
      courses,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    }
  });
}));

// Toggle course published status
router.patch('/courses/:id/publish', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { isPublished } = req.body;

  const course = await prisma.learningTrack.update({
    where: { id },
    data: { isPublished },
    select: {
      id: true,
      title: true,
      isPublished: true
    }
  });

  logger.info(`Course publish status updated: ${course.title} -> ${isPublished ? 'published' : 'unpublished'} by ${req.user?.email}`);

  res.json({
    success: true,
    message: `Course ${isPublished ? 'published' : 'unpublished'} successfully`,
    data: { course }
  });
}));

// Get all projects
router.get('/projects', asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, search, difficulty, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

  const skip = (Number(page) - 1) * Number(limit);

  const where: any = {};
  
  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } }
    ];
  }
  
  if (difficulty) {
    where.difficulty = difficulty;
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
        isPublished: true,
        isFeatured: true,
        likes: true,
        views: true,
        rating: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true
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

// Toggle project featured status
router.patch('/projects/:id/feature', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { isFeatured } = req.body;

  const project = await prisma.project.update({
    where: { id },
    data: { isFeatured },
    select: {
      id: true,
      title: true,
      isFeatured: true
    }
  });

  logger.info(`Project featured status updated: ${project.title} -> ${isFeatured ? 'featured' : 'unfeatured'} by ${req.user?.email}`);

  res.json({
    success: true,
    message: `Project ${isFeatured ? 'featured' : 'unfeatured'} successfully`,
    data: { project }
  });
}));

// Get all forum posts
router.get('/posts', asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, search, category, solved, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

  const skip = (Number(page) - 1) * Number(limit);

  const where: any = {};
  
  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { content: { contains: search, mode: 'insensitive' } }
    ];
  }
  
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
        category: true,
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
            lastName: true
          }
        }
      },
      orderBy: { [sortBy as string]: sortOrder },
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

// Toggle post pinned status
router.patch('/posts/:id/pin', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { isPinned } = req.body;

  const post = await prisma.forumPost.update({
    where: { id },
    data: { isPinned },
    select: {
      id: true,
      title: true,
      isPinned: true
    }
  });

  logger.info(`Post pinned status updated: ${post.title} -> ${isPinned ? 'pinned' : 'unpinned'} by ${req.user?.email}`);

  res.json({
    success: true,
    message: `Post ${isPinned ? 'pinned' : 'unpinned'} successfully`,
    data: { post }
  });
}));

// Get analytics data
router.get('/analytics', asyncHandler(async (req, res) => {
  const { period = '30d' } = req.query;
  
  let startDate: Date;
  switch (period) {
    case '7d':
      startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      break;
    case '30d':
      startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      break;
    case '90d':
      startDate = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
      break;
    default:
      startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  }

  const [
    userRegistrations,
    courseEnrollments,
    projectSubmissions,
    forumPosts,
    userActivity
  ] = await Promise.all([
    // User registrations over time
    prisma.user.groupBy({
      by: ['createdAt'],
      _count: { id: true },
      where: {
        createdAt: { gte: startDate }
      },
      orderBy: { createdAt: 'asc' }
    }),
    
    // Course enrollments over time
    prisma.enrollment.groupBy({
      by: ['createdAt'],
      _count: { id: true },
      where: {
        createdAt: { gte: startDate }
      },
      orderBy: { createdAt: 'asc' }
    }),
    
    // Project submissions over time
    prisma.project.groupBy({
      by: ['createdAt'],
      _count: { id: true },
      where: {
        createdAt: { gte: startDate }
      },
      orderBy: { createdAt: 'asc' }
    }),
    
    // Forum posts over time
    prisma.forumPost.groupBy({
      by: ['createdAt'],
      _count: { id: true },
      where: {
        createdAt: { gte: startDate }
      },
      orderBy: { createdAt: 'asc' }
    }),
    
    // User activity (last 7 days)
    prisma.user.count({
      where: {
        lastActive: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        }
      }
    })
  ]);

  res.json({
    success: true,
    data: {
      period,
      userRegistrations,
      courseEnrollments,
      projectSubmissions,
      forumPosts,
      userActivity
    }
  });
}));

// Get system logs (mock data for now)
router.get('/logs', asyncHandler(async (req, res) => {
  const { page = 1, limit = 50, level = 'all' } = req.query;

  // This would typically come from a logging service
  const mockLogs = [
    {
      id: '1',
      timestamp: new Date().toISOString(),
      level: 'info',
      message: 'User registered successfully',
      userId: 'user123',
      ip: '192.168.1.1'
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 60000).toISOString(),
      level: 'warn',
      message: 'High memory usage detected',
      userId: null,
      ip: null
    },
    {
      id: '3',
      timestamp: new Date(Date.now() - 120000).toISOString(),
      level: 'error',
      message: 'Database connection failed',
      userId: null,
      ip: null
    }
  ];

  res.json({
    success: true,
    data: {
      logs: mockLogs,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: mockLogs.length,
        pages: 1
      }
    }
  });
}));

export default router;
