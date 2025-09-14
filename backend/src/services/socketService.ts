import { Server, Socket } from 'socket.io';
import { verifyToken } from '../utils/jwt';
import { prisma } from '../utils/database';
import { logger } from '../utils/logger';

interface AuthenticatedSocket extends Socket {
  userId?: string;
  user?: {
    id: string;
    email: string;
    username: string;
    role: string;
  };
}

export const initializeSocket = (io: Server) => {
  // Authentication middleware for Socket.IO
  io.use(async (socket: AuthenticatedSocket, next) => {
    try {
      const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.replace('Bearer ', '');
      
      if (!token) {
        return next(new Error('Authentication error: No token provided'));
      }

      const decoded = verifyToken(token);
      
      // Get user from database
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          email: true,
          username: true,
          role: true,
          isActive: true
        }
      });

      if (!user || !user.isActive) {
        return next(new Error('Authentication error: User not found or inactive'));
      }

      socket.userId = user.id;
      socket.user = user;
      next();
    } catch (error) {
      logger.error('Socket authentication error:', error);
      next(new Error('Authentication error: Invalid token'));
    }
  });

  io.on('connection', (socket: AuthenticatedSocket) => {
    logger.info(`User connected: ${socket.user?.email} (${socket.id})`);

    // Join user to their personal room
    socket.join(`user:${socket.userId}`);

    // Join user to general rooms
    socket.join('general');
    socket.join('notifications');

    // Handle joining specific rooms
    socket.on('join:room', (room: string) => {
      socket.join(room);
      logger.info(`User ${socket.user?.email} joined room: ${room}`);
    });

    socket.on('leave:room', (room: string) => {
      socket.leave(room);
      logger.info(`User ${socket.user?.email} left room: ${room}`);
    });

    // Handle project likes
    socket.on('project:like', async (data: { projectId: string }) => {
      try {
        const { projectId } = data;
        
        // Check if project exists
        const project = await prisma.project.findUnique({
          where: { id: projectId },
          select: { id: true, title: true, authorId: true }
        });

        if (!project) {
          socket.emit('error', { message: 'Project not found' });
          return;
        }

        // Check if user already liked
        const existingLike = await prisma.projectLike.findUnique({
          where: {
            userId_projectId: {
              userId: socket.userId!,
              projectId
            }
          }
        });

        if (existingLike) {
          // Unlike
          await prisma.projectLike.delete({
            where: { id: existingLike.id }
          });

          await prisma.project.update({
            where: { id: projectId },
            data: { likes: { decrement: 1 } }
          });

          // Notify project author
          if (project.authorId !== socket.userId) {
            io.to(`user:${project.authorId}`).emit('project:unliked', {
              projectId,
              projectTitle: project.title,
              user: socket.user
            });
          }
        } else {
          // Like
          await prisma.projectLike.create({
            data: {
              userId: socket.userId!,
              projectId
            }
          });

          await prisma.project.update({
            where: { id: projectId },
            data: { likes: { increment: 1 } }
          });

          // Notify project author
          if (project.authorId !== socket.userId) {
            io.to(`user:${project.authorId}`).emit('project:liked', {
              projectId,
              projectTitle: project.title,
              user: socket.user
            });
          }
        }

        // Broadcast to all users in the project room
        io.to(`project:${projectId}`).emit('project:like:update', {
          projectId,
          liked: !existingLike
        });

      } catch (error) {
        logger.error('Project like error:', error);
        socket.emit('error', { message: 'Failed to like project' });
      }
    });

    // Handle project comments
    socket.on('project:comment', async (data: { projectId: string; content: string }) => {
      try {
        const { projectId, content } = data;

        if (!content || content.trim().length === 0) {
          socket.emit('error', { message: 'Comment content is required' });
          return;
        }

        // Check if project exists
        const project = await prisma.project.findUnique({
          where: { id: projectId },
          select: { id: true, title: true, authorId: true }
        });

        if (!project) {
          socket.emit('error', { message: 'Project not found' });
          return;
        }

        // Create comment
        const comment = await prisma.projectComment.create({
          data: {
            content: content.trim(),
            userId: socket.userId!,
            projectId
          },
          include: {
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

        // Update comment count
        await prisma.project.update({
          where: { id: projectId },
          data: { comments: { increment: 1 } }
        });

        // Notify project author
        if (project.authorId !== socket.userId) {
          io.to(`user:${project.authorId}`).emit('project:commented', {
            projectId,
            projectTitle: project.title,
            comment: {
              id: comment.id,
              content: comment.content,
              user: socket.user
            }
          });
        }

        // Broadcast to all users in the project room
        io.to(`project:${projectId}`).emit('project:comment:new', comment);

      } catch (error) {
        logger.error('Project comment error:', error);
        socket.emit('error', { message: 'Failed to add comment' });
      }
    });

    // Handle forum post replies
    socket.on('forum:reply', async (data: { postId: string; content: string; parentId?: string }) => {
      try {
        const { postId, content, parentId } = data;

        if (!content || content.trim().length === 0) {
          socket.emit('error', { message: 'Reply content is required' });
          return;
        }

        // Check if post exists
        const post = await prisma.forumPost.findUnique({
          where: { id: postId },
          select: { id: true, title: true, authorId: true }
        });

        if (!post) {
          socket.emit('error', { message: 'Forum post not found' });
          return;
        }

        // Create reply
        const reply = await prisma.forumReply.create({
          data: {
            content: content.trim(),
            userId: socket.userId!,
            postId,
            parentId
          },
          include: {
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
          where: { id: postId },
          data: { replies: { increment: 1 } }
        });

        // Notify post author
        if (post.authorId !== socket.userId) {
          io.to(`user:${post.authorId}`).emit('forum:replied', {
            postId,
            postTitle: post.title,
            reply: {
              id: reply.id,
              content: reply.content,
              user: socket.user
            }
          });
        }

        // Broadcast to all users in the forum room
        io.to(`forum:${postId}`).emit('forum:reply:new', reply);

      } catch (error) {
        logger.error('Forum reply error:', error);
        socket.emit('error', { message: 'Failed to add reply' });
      }
    });

    // Handle typing indicators
    socket.on('typing:start', (data: { type: string; id: string }) => {
      socket.to(`room:${data.type}:${data.id}`).emit('typing:start', {
        user: socket.user,
        type: data.type,
        id: data.id
      });
    });

    socket.on('typing:stop', (data: { type: string; id: string }) => {
      socket.to(`room:${data.type}:${data.id}`).emit('typing:stop', {
        user: socket.user,
        type: data.type,
        id: data.id
      });
    });

    // Handle user status updates
    socket.on('status:update', (data: { status: string }) => {
      socket.broadcast.emit('user:status', {
        userId: socket.userId,
        status: data.status,
        user: socket.user
      });
    });

    // Handle disconnect
    socket.on('disconnect', (reason) => {
      logger.info(`User disconnected: ${socket.user?.email} (${socket.id}) - ${reason}`);
      
      // Broadcast user offline status
      socket.broadcast.emit('user:offline', {
        userId: socket.userId,
        user: socket.user
      });
    });

    // Handle errors
    socket.on('error', (error) => {
      logger.error(`Socket error for user ${socket.user?.email}:`, error);
    });
  });

  // Handle connection errors
  io.engine.on('connection_error', (err) => {
    logger.error('Socket connection error:', err);
  });

  logger.info('Socket.IO server initialized');
};
