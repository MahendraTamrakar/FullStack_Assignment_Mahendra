import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create temp directory for uploads before sending to Cloudinary
const createUploadDirs = () => {
  const tempDir = path.join(__dirname, '../uploads/temp');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }
};

createUploadDirs();

// Use disk storage for temporary files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/temp'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `temp-${uniqueSuffix}${ext}`);
  }
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (JPEG, JPG, PNG, GIF, WEBP) are allowed'));
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  limits: { 
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5242880, // 5MB default
    files: 1
  },
  fileFilter
});

// Export middleware for different routes
export const uploadProjectImage = upload.single('image');
export const uploadClientImage = upload.single('image');

// Cleanup function to remove old temp files (optional, run periodically)
export const cleanupTempFiles = () => {
  const tempDir = path.join(__dirname, '../uploads/temp');
  if (fs.existsSync(tempDir)) {
    const files = fs.readdirSync(tempDir);
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;

    files.forEach(file => {
      const filePath = path.join(tempDir, file);
      const stats = fs.statSync(filePath);
      if (now - stats.mtimeMs > oneHour) {
        fs.unlinkSync(filePath);
      }
    });
  }
};