// src/middleware/upload.js
import multer from 'multer';

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // default 5MB
    files: 1,
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const ext = file.originalname.split('.').pop().toLowerCase();
    const allowed = allowedTypes.test(ext) && allowedTypes.test(file.mimetype);
    if (allowed) cb(null, true);
    else cb(new Error('Only image files (jpeg, jpg, png, gif, webp) are allowed'));
  },
});

export const uploadProjectImage = upload.single('image');
export const uploadClientImage = upload.single('image');
