import Joi from 'joi';

// User validation schemas
export const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required'
  }),
  username: Joi.string().alphanum().min(3).max(30).required().messages({
    'string.alphanum': 'Username must contain only alphanumeric characters',
    'string.min': 'Username must be at least 3 characters long',
    'string.max': 'Username must not exceed 30 characters',
    'any.required': 'Username is required'
  }),
  firstName: Joi.string().min(2).max(50).required().messages({
    'string.min': 'First name must be at least 2 characters long',
    'string.max': 'First name must not exceed 50 characters',
    'any.required': 'First name is required'
  }),
  lastName: Joi.string().min(2).max(50).required().messages({
    'string.min': 'Last name must be at least 2 characters long',
    'string.max': 'Last name must not exceed 50 characters',
    'any.required': 'Last name is required'
  }),
  password: Joi.string().min(8).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]')).required().messages({
    'string.min': 'Password must be at least 8 characters long',
    'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    'any.required': 'Password is required'
  })
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required'
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required'
  })
});

export const updateProfileSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).optional(),
  lastName: Joi.string().min(2).max(50).optional(),
  bio: Joi.string().max(500).optional().allow(''),
  location: Joi.string().max(100).optional().allow(''),
  website: Joi.string().uri().optional().allow(''),
  githubUrl: Joi.string().uri().optional().allow(''),
  linkedinUrl: Joi.string().uri().optional().allow('')
});

// Learning track validation schemas
export const createLearningTrackSchema = Joi.object({
  title: Joi.string().min(5).max(100).required().messages({
    'string.min': 'Title must be at least 5 characters long',
    'string.max': 'Title must not exceed 100 characters',
    'any.required': 'Title is required'
  }),
  description: Joi.string().min(10).max(1000).required().messages({
    'string.min': 'Description must be at least 10 characters long',
    'string.max': 'Description must not exceed 1000 characters',
    'any.required': 'Description is required'
  }),
  level: Joi.string().valid('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT').required(),
  duration: Joi.string().required(),
  thumbnail: Joi.string().uri().optional()
});

export const createModuleSchema = Joi.object({
  title: Joi.string().min(5).max(100).required(),
  description: Joi.string().min(10).max(500).required(),
  order: Joi.number().integer().min(1).required(),
  duration: Joi.number().integer().min(1).required(),
  content: Joi.string().optional().allow(''),
  videoUrl: Joi.string().uri().optional().allow(''),
  resources: Joi.array().items(Joi.object({
    title: Joi.string().required(),
    url: Joi.string().uri().required(),
    type: Joi.string().valid('video', 'article', 'document', 'code').required()
  })).optional()
});

// Project validation schemas
export const createProjectSchema = Joi.object({
  title: Joi.string().min(5).max(100).required().messages({
    'string.min': 'Title must be at least 5 characters long',
    'string.max': 'Title must not exceed 100 characters',
    'any.required': 'Title is required'
  }),
  description: Joi.string().min(10).max(1000).required().messages({
    'string.min': 'Description must be at least 10 characters long',
    'string.max': 'Description must not exceed 1000 characters',
    'any.required': 'Description is required'
  }),
  content: Joi.string().optional().allow(''),
  difficulty: Joi.string().valid('BEGINNER', 'INTERMEDIATE', 'ADVANCED').required(),
  technology: Joi.array().items(Joi.string().min(1).max(50)).min(1).required().messages({
    'array.min': 'At least one technology must be specified',
    'any.required': 'Technologies are required'
  }),
  tags: Joi.array().items(Joi.string().min(1).max(30)).optional(),
  githubUrl: Joi.string().uri().optional().allow(''),
  liveUrl: Joi.string().uri().optional().allow(''),
  thumbnail: Joi.string().uri().optional().allow('')
});

// Forum validation schemas
export const createForumPostSchema = Joi.object({
  title: Joi.string().min(5).max(200).required().messages({
    'string.min': 'Title must be at least 5 characters long',
    'string.max': 'Title must not exceed 200 characters',
    'any.required': 'Title is required'
  }),
  content: Joi.string().min(10).max(5000).required().messages({
    'string.min': 'Content must be at least 10 characters long',
    'string.max': 'Content must not exceed 5000 characters',
    'any.required': 'Content is required'
  }),
  category: Joi.string().min(1).max(50).required(),
  tags: Joi.array().items(Joi.string().min(1).max(30)).optional()
});

export const createForumReplySchema = Joi.object({
  content: Joi.string().min(1).max(2000).required().messages({
    'string.min': 'Reply cannot be empty',
    'string.max': 'Reply must not exceed 2000 characters',
    'any.required': 'Reply content is required'
  }),
  parentId: Joi.string().optional()
});

// Query validation schemas
export const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  sortBy: Joi.string().optional(),
  sortOrder: Joi.string().valid('asc', 'desc').default('desc')
});

export const searchSchema = Joi.object({
  q: Joi.string().min(1).max(100).required(),
  type: Joi.string().valid('projects', 'users', 'posts', 'tracks').optional(),
  category: Joi.string().optional(),
  difficulty: Joi.string().valid('BEGINNER', 'INTERMEDIATE', 'ADVANCED').optional(),
  level: Joi.string().valid('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT').optional()
});

// File upload validation
export const fileUploadSchema = Joi.object({
  fieldname: Joi.string().required(),
  originalname: Joi.string().required(),
  mimetype: Joi.string().valid(
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf'
  ).required(),
  size: Joi.number().max(parseInt(process.env.MAX_FILE_SIZE || '10485760')).required()
});

export const validate = (schema: Joi.ObjectSchema, data: any) => {
  const { error, value } = schema.validate(data, { abortEarly: false });
  if (error) {
    const errorMessages = error.details.map(detail => detail.message);
    throw new Error(errorMessages.join(', '));
  }
  return value;
};
