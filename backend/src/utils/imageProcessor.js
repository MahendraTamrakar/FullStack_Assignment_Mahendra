import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

export const cropAndResizeImage = async (inputPath, outputPath, width = 450, height = 350) => {
  try {
    await sharp(inputPath)
      .resize(width, height, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ quality: parseInt(process.env.IMAGE_QUALITY) || 90 })
      .toFile(outputPath);
    return outputPath;
  } catch (error) {
    throw new Error(`Image processing failed: ${error.message}`);
  }
};

export const processUploadedImage = async (file, type = 'project') => {
  try {
    const inputPath = file.path;
    const filename = `processed-${file.filename}`;
    const outputPath = path.join(path.dirname(inputPath), filename);

    const width = parseInt(process.env.IMAGE_WIDTH) || 450;
    const height = parseInt(process.env.IMAGE_HEIGHT) || 350;

    await cropAndResizeImage(inputPath, outputPath, width, height);
    fs.unlinkSync(inputPath);

    return `/uploads/${type}s/${filename}`;
  } catch (error) {
    throw new Error(`Failed to process image: ${error.message}`);
  }
};