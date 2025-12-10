// src/utils/cloudinaryUpload.js
import cloudinary from './cloudinary.js';
import streamifier from 'streamifier';

/**
 * Uploads a buffer to Cloudinary (used with multer.memoryStorage)
 * @param {Buffer|Object} fileOrBuffer - req.file.buffer or multer file object
 * @param {String} folder - destination folder inside your Cloudinary account
 * @returns {Promise<Object>} result - Cloudinary upload result (secure_url, public_id, etc.)
 */
export const uploadToCloudinary = (fileOrBuffer, folder = 'portfolio') => {
  const buffer = fileOrBuffer?.buffer ?? (fileOrBuffer && fileOrBuffer.path ? null : null);

  return new Promise((resolve, reject) => {
    // if buffer isn't available, reject
    if (!buffer) {
      return reject(new Error('No file buffer provided for Cloudinary upload'));
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: 'image',
        transformation: [
          {
            width: parseInt(process.env.IMAGE_WIDTH) || 450,
            height: parseInt(process.env.IMAGE_HEIGHT) || 350,
            crop: 'fill',
            gravity: 'center',
            quality: parseInt(process.env.IMAGE_QUALITY) || 90,
            fetch_format: 'auto',
          },
        ],
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

/**
 * Delete image from Cloudinary.
 * Accepts either a Cloudinary public_id or a Cloudinary URL.
 * @param {String} publicIdOrUrl
 * @returns {Promise<Object>}
 */
export const deleteFromCloudinary = async (publicIdOrUrl) => {
  try {
    if (!publicIdOrUrl) throw new Error('No public id or url provided');

    // If a full Cloudinary URL was passed, try to extract public_id
    let publicId = publicIdOrUrl;
    if (publicIdOrUrl.includes('res.cloudinary.com') || publicIdOrUrl.includes('cloudinary.com')) {
      // attempt to extract public id: split and strip extension
      const parts = publicIdOrUrl.split('/');
      const fileWithExt = parts[parts.length - 1]; // e.g. my-image.jpg
      const fileName = fileWithExt.split('.')[0]; // e.g. my-image
      // try to find folder path in url (common layout: /<cloud>/image/upload/v1234/folder/file.jpg)
      // this is heuristic — it will work if URLs contain the folder name
      const uploadIndex = parts.findIndex(p => p === 'upload');
      if (uploadIndex !== -1 && parts.length > uploadIndex + 1) {
        const folderParts = parts.slice(uploadIndex + 2, parts.length - 1); // skip version like v1234
        publicId = folderParts.concat(fileName).join('/');
      } else {
        publicId = fileName;
      }
    }

    const result = await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
    return result;
  } catch (err) {
    throw new Error(`Cloudinary delete failed: ${err.message}`);
  }
};
