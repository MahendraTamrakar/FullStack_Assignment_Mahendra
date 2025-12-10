import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();
import cloudinary from './cloudinary.js';
import fs from 'fs';

/**
 * Upload image to Cloudinary with transformations
 * @param {Object} file - Multer file object
 * @param {String} folder - Cloudinary folder name (e.g., 'projects', 'clients')
 * @returns {Promise<String>} - Cloudinary secure URL
 */
export const uploadToCloudinary = async (file, folder = 'general') => {
  try {
    if (!file || !file.path) {
      throw new Error('No file provided for upload');
    }

    const result = await cloudinary.uploader.upload(file.path, {
      folder: `portfolio/${folder}`,
      resource_type: 'image',
      transformation: [
        {
          width: parseInt(process.env.IMAGE_WIDTH) || 450,
          height: parseInt(process.env.IMAGE_HEIGHT) || 350,
          crop: 'fill',
          gravity: 'center',
          quality: parseInt(process.env.IMAGE_QUALITY) || 90,
          fetch_format: 'auto'
        }
      ],
      allowed_formats: ['jpg', 'png', 'jpeg', 'gif', 'webp']
    });

    // Delete local file after upload
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    return result.secure_url;
  } catch (error) {
    // Clean up local file if upload fails
    if (file && file.path && fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
};

/**
 * Delete image from Cloudinary
 * @param {String} imageUrl - Cloudinary image URL
 * @returns {Promise<Object>} - Deletion result
 */
export const deleteFromCloudinary = async (imageUrl) => {
  try {
    // Extract public_id from Cloudinary URL
    const urlParts = imageUrl.split('/');
    const fileName = urlParts[urlParts.length - 1];
    const folderPath = urlParts.slice(-3, -1).join('/'); // e.g., portfolio/projects
    const publicId = `${folderPath}/${fileName.split('.')[0]}`;

    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    throw new Error(`Failed to delete image: ${error.message}`);
  }
};

/**
 * Get optimized image URL with custom transformations
 * @param {String} publicId - Cloudinary public ID
 * @param {Object} options - Transformation options
 * @returns {String} - Transformed image URL
 */
export const getOptimizedImageUrl = (publicId, options = {}) => {
  const {
    width = 450,
    height = 350,
    quality = 90,
    format = 'auto'
  } = options;

  return cloudinary.url(publicId, {
    width,
    height,
    crop: 'fill',
    gravity: 'center',
    quality,
    fetch_format: format
  });
};