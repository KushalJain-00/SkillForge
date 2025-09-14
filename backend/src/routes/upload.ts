import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import { v2 as cloudinary } from 'cloudinary';
import { authenticate } from '../middleware/auth';
import { asyncHandler, createError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760') // 10MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = (process.env.ALLOWED_FILE_TYPES || 'image/jpeg,image/png,image/gif,image/webp,application/pdf').split(',');
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  }
});

// Upload single file
router.post('/single', authenticate, upload.single('file'), asyncHandler(async (req, res) => {
  if (!req.file) {
    throw createError('No file uploaded', 400);
  }

  const { type = 'general' } = req.body; // avatar, project, course, general

  try {
    let processedFile = req.file.buffer;
    let publicId = `skillforge/${type}/${Date.now()}-${Math.random().toString(36).substring(7)}`;

    // Process image files
    if (req.file.mimetype.startsWith('image/')) {
      // Resize and optimize images
      const width = type === 'avatar' ? 400 : type === 'project' ? 800 : 600;
      const height = type === 'avatar' ? 400 : type === 'project' ? 600 : 400;

      processedFile = await sharp(req.file.buffer)
        .resize(width, height, {
          fit: 'cover',
          position: 'center'
        })
        .jpeg({ quality: 85 })
        .toBuffer();

      // Update file extension
      publicId += '.jpg';
    }

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          public_id: publicId,
          resource_type: 'auto',
          folder: `skillforge/${type}`,
          transformation: type === 'avatar' ? [
            { width: 400, height: 400, crop: 'fill', gravity: 'face' }
          ] : type === 'project' ? [
            { width: 800, height: 600, crop: 'fill' }
          ] : []
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(processedFile);
    });

    logger.info(`File uploaded: ${publicId} by ${req.user?.email}`);

    res.json({
      success: true,
      message: 'File uploaded successfully',
      data: {
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
        size: result.bytes
      }
    });
  } catch (error) {
    logger.error('File upload error:', error);
    throw createError('Failed to upload file', 500);
  }
}));

// Upload multiple files
router.post('/multiple', authenticate, upload.array('files', 5), asyncHandler(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    throw createError('No files uploaded', 400);
  }

  const { type = 'general' } = req.body;
  const files = req.files as Express.Multer.File[];

  try {
    const uploadPromises = files.map(async (file) => {
      let processedFile = file.buffer;
      let publicId = `skillforge/${type}/${Date.now()}-${Math.random().toString(36).substring(7)}`;

      // Process image files
      if (file.mimetype.startsWith('image/')) {
        const width = type === 'project' ? 800 : 600;
        const height = type === 'project' ? 600 : 400;

        processedFile = await sharp(file.buffer)
          .resize(width, height, {
            fit: 'cover',
            position: 'center'
          })
          .jpeg({ quality: 85 })
          .toBuffer();

        publicId += '.jpg';
      }

      // Upload to Cloudinary
      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            public_id: publicId,
            resource_type: 'auto',
            folder: `skillforge/${type}`
          },
          (error, result) => {
            if (error) reject(error);
            else resolve({
              url: result.secure_url,
              publicId: result.public_id,
              width: result.width,
              height: result.height,
              format: result.format,
              size: result.bytes
            });
          }
        ).end(processedFile);
      });
    });

    const results = await Promise.all(uploadPromises);

    logger.info(`${files.length} files uploaded by ${req.user?.email}`);

    res.json({
      success: true,
      message: 'Files uploaded successfully',
      data: { files: results }
    });
  } catch (error) {
    logger.error('Multiple file upload error:', error);
    throw createError('Failed to upload files', 500);
  }
}));

// Delete file
router.delete('/:publicId', authenticate, asyncHandler(async (req, res) => {
  const { publicId } = req.params;

  try {
    const result = await cloudinary.uploader.destroy(publicId);
    
    if (result.result === 'ok') {
      logger.info(`File deleted: ${publicId} by ${req.user?.email}`);
      
      res.json({
        success: true,
        message: 'File deleted successfully'
      });
    } else {
      throw createError('Failed to delete file', 500);
    }
  } catch (error) {
    logger.error('File deletion error:', error);
    throw createError('Failed to delete file', 500);
  }
}));

// Get upload statistics
router.get('/stats', authenticate, asyncHandler(async (req, res) => {
  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'skillforge/',
      max_results: 500
    });

    const stats = {
      totalFiles: result.resources.length,
      totalSize: result.resources.reduce((sum, file) => sum + file.bytes, 0),
      formats: result.resources.reduce((acc, file) => {
        acc[file.format] = (acc[file.format] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      folders: result.resources.reduce((acc, file) => {
        const folder = file.public_id.split('/')[1];
        acc[folder] = (acc[folder] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    };

    res.json({
      success: true,
      data: { stats }
    });
  } catch (error) {
    logger.error('Upload stats error:', error);
    throw createError('Failed to get upload statistics', 500);
  }
}));

export default router;
