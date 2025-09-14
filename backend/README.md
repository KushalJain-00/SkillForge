# SkillForge Backend API

A comprehensive backend API for the SkillForge Growth Hub learning platform, built with Node.js, Express, TypeScript, and PostgreSQL.

## 🚀 Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **User Management**: Complete user profiles, portfolios, and dashboard
- **Learning System**: Course tracks, modules, lessons, and progress tracking
- **Project Management**: Project creation, sharing, and community interaction
- **Community Forum**: Discussion posts, replies, and real-time communication
- **File Upload**: Image and document upload with Cloudinary integration
- **Real-time Features**: Socket.IO for live updates and notifications
- **Admin Dashboard**: Comprehensive analytics and management tools
- **API Documentation**: Well-documented RESTful API endpoints

## 🛠️ Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Cache**: Redis
- **File Storage**: Cloudinary
- **Real-time**: Socket.IO
- **Authentication**: JWT
- **Validation**: Joi
- **Logging**: Winston
- **Testing**: Jest
- **Containerization**: Docker

## 📋 Prerequisites

- Node.js 18 or higher
- PostgreSQL 13 or higher
- Redis 6 or higher
- Cloudinary account (for file uploads)

## 🚀 Quick Start

### 1. Clone and Install

```bash
cd backend
npm install
```

### 2. Environment Setup

```bash
cp env.example .env
```

Update the `.env` file with your configuration:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/skillforge_db"

# JWT
JWT_SECRET="your-super-secret-jwt-key-here"
JWT_EXPIRES_IN="7d"

# Server
PORT=3001
NODE_ENV="development"
FRONTEND_URL="http://localhost:5173"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Redis
REDIS_URL="redis://localhost:6379"
```

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) Seed the database
npx prisma db seed
```

### 4. Start Development Server

```bash
npm run dev
```

The API will be available at `http://localhost:3001`

## 🐳 Docker Deployment

### Using Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Using Docker

```bash
# Build image
docker build -t skillforge-backend .

# Run container
docker run -p 3001:3001 --env-file .env skillforge-backend
```

## 📚 API Documentation

### Base URL
```
http://localhost:3001/api
```

### Authentication
All protected routes require a Bearer token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### Main Endpoints

#### Authentication (`/api/auth`)
- `POST /register` - User registration
- `POST /login` - User login
- `POST /refresh` - Refresh access token
- `POST /logout` - User logout
- `GET /me` - Get current user
- `POST /forgot-password` - Request password reset
- `POST /reset-password` - Reset password

#### Users (`/api/users`)
- `GET /profile/:username` - Get user profile
- `PUT /profile` - Update user profile
- `GET /dashboard` - Get user dashboard data
- `GET /portfolio/:username` - Get user portfolio
- `GET /:username/projects` - Get user projects
- `GET /:username/badges` - Get user badges
- `GET /search` - Search users

#### Learning (`/api/learning`)
- `GET /tracks` - Get all learning tracks
- `GET /tracks/:id` - Get single learning track
- `POST /tracks/:id/enroll` - Enroll in track
- `GET /enrollments` - Get user enrollments
- `PATCH /enrollments/:id/progress` - Update progress
- `GET /modules/:id` - Get module content
- `PATCH /modules/:id/progress` - Update module progress
- `GET /search` - Search tracks

#### Projects (`/api/projects`)
- `GET /` - Get all projects
- `GET /:id` - Get single project
- `POST /` - Create project
- `PUT /:id` - Update project
- `DELETE /:id` - Delete project
- `POST /:id/like` - Like/unlike project
- `GET /:id/comments` - Get project comments
- `POST /:id/comments` - Add comment
- `GET /search` - Search projects
- `GET /featured` - Get featured projects

#### Community (`/api/community`)
- `GET /posts` - Get forum posts
- `GET /posts/:id` - Get single post
- `POST /posts` - Create post
- `PUT /posts/:id` - Update post
- `DELETE /posts/:id` - Delete post
- `PATCH /posts/:id/solve` - Mark as solved
- `POST /posts/:id/replies` - Add reply
- `PUT /replies/:id` - Update reply
- `DELETE /replies/:id` - Delete reply
- `GET /categories` - Get categories
- `GET /search` - Search posts
- `GET /trending` - Get trending posts

#### Admin (`/api/admin`)
- `GET /dashboard` - Admin dashboard stats
- `GET /users` - Get all users
- `PATCH /users/:id/role` - Update user role
- `PATCH /users/:id/status` - Toggle user status
- `GET /courses` - Get all courses
- `PATCH /courses/:id/publish` - Toggle course publish
- `GET /projects` - Get all projects
- `PATCH /projects/:id/feature` - Toggle project featured
- `GET /posts` - Get all forum posts
- `PATCH /posts/:id/pin` - Toggle post pinned
- `GET /analytics` - Get analytics data
- `GET /logs` - Get system logs

#### Upload (`/api/upload`)
- `POST /single` - Upload single file
- `POST /multiple` - Upload multiple files
- `DELETE /:publicId` - Delete file
- `GET /stats` - Get upload statistics

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm start           # Start production server

# Database
npm run migrate     # Run database migrations
npm run generate    # Generate Prisma client
npm run studio      # Open Prisma Studio

# Testing
npm test           # Run tests
npm run test:watch # Run tests in watch mode

# Linting
npm run lint       # Run ESLint
```

### Database Schema

The database schema is defined in `prisma/schema.prisma`. Key entities include:

- **Users**: User accounts with profiles and authentication
- **LearningTracks**: Course tracks with modules and lessons
- **Projects**: User-created projects with community features
- **ForumPosts**: Community discussion posts and replies
- **Badges**: Achievement system for user recognition
- **Enrollments**: User progress tracking for courses
- **Notifications**: Real-time user notifications

### Real-time Features

Socket.IO is used for real-time features:

- **Project Interactions**: Live likes, comments, and updates
- **Forum Discussions**: Real-time replies and notifications
- **User Status**: Online/offline status updates
- **Typing Indicators**: Live typing indicators in discussions
- **Notifications**: Real-time push notifications

## 🔒 Security

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with salt rounds
- **Rate Limiting**: API rate limiting to prevent abuse
- **Input Validation**: Comprehensive input validation with Joi
- **CORS**: Configurable CORS for cross-origin requests
- **Helmet**: Security headers for protection
- **SQL Injection**: Protected with Prisma ORM

## 📊 Monitoring & Logging

- **Winston Logger**: Structured logging with different levels
- **Health Checks**: Built-in health check endpoints
- **Error Handling**: Comprehensive error handling and reporting
- **Performance**: Request/response time monitoring

## 🚀 Deployment

### Environment Variables

Ensure all required environment variables are set:

```env
# Required
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Optional
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://your-frontend.com
REDIS_URL=redis://...
```

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use strong JWT secret
- [ ] Configure production database
- [ ] Set up Redis for caching
- [ ] Configure Cloudinary for file uploads
- [ ] Set up SSL certificates
- [ ] Configure reverse proxy (Nginx)
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Check the API documentation
- Review the logs for error details

## 🔄 Changelog

### v1.0.0
- Initial release
- Complete API implementation
- Authentication and authorization
- User management system
- Learning platform features
- Project management
- Community forum
- Admin dashboard
- Real-time features
- File upload system
