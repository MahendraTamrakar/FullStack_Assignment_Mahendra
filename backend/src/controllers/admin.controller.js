// src/controllers/admin.controller.js
import Project from '../models/project.model.js';
import Client from '../models/client.model.js';
import ContactSubmission from '../models/contactSubmission.js';
import Subscriber from '../models/subscriber.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/cloudinaryUpload.js';

/**
 * Helper: safely uploads if req.file present.
 * Accepts multer file object (with .buffer) or a Buffer.
 * Returns { imageUrl, imagePublicId }
 */
const handleUploadIfPresent = async (file, folder) => {
  if (!file) return { imageUrl: '', imagePublicId: '' };

  // uploadToCloudinary accepts either file object or buffer
  const result = await uploadToCloudinary(file, folder);

  return {
    imageUrl: result?.secure_url || result?.url || '',
    imagePublicId: result?.public_id || '',
  };
};

/**
 * Add Project
 * Expects form-data: projectName (text), description (text), image (file)
 */
export const addProject = async (req, res, next) => {
  try {
    const { projectName, description } = req.body;
    let imageUrl = req.body.imageUrl || '';
    let imagePublicId = req.body.imagePublicId || '';

    // Upload to Cloudinary if file exists (multer memory storage provides req.file.buffer)
    if (req.file) {
      const uploadResult = await handleUploadIfPresent(req.file, 'projects');
      imageUrl = uploadResult.imageUrl;
      imagePublicId = uploadResult.imagePublicId;
    }

    // validation
    if (!projectName || !description || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields (projectName, description, image)'
      });
    }

    const project = await Project.create({
      projectName,
      description,
      imageUrl,
      imagePublicId,
    });

    return res.status(201).json({
      success: true,
      message: 'Project added successfully',
      data: project
    });
  } catch (error) {
    // handle mongoose validation errors specially
    if (error?.name === 'ValidationError') {
      const errors = Object.values(error.errors || {}).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors
      });
    }
    // pass to global error handler
    return next(error);
  }
};

/**
 * Add Client
 * Expects form-data: clientName, clientDescription, clientDesignation, image (file)
 */
export const addClient = async (req, res, next) => {
  try {
    const { clientName, clientDescription, clientDesignation } = req.body;
    let imageUrl = req.body.imageUrl || '';
    let imagePublicId = req.body.imagePublicId || '';

    if (req.file) {
      const uploadResult = await handleUploadIfPresent(req.file, 'clients');
      imageUrl = uploadResult.imageUrl;
      imagePublicId = uploadResult.imagePublicId;
    }

    if (!clientName || !clientDescription || !clientDesignation || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields (clientName, clientDescription, clientDesignation, image)'
      });
    }

    const client = await Client.create({
      imageUrl,
      imagePublicId,
      clientName,
      clientDescription,
      clientDesignation
    });

    return res.status(201).json({
      success: true,
      message: 'Client added successfully',
      data: client
    });
  } catch (error) {
    if (error?.name === 'ValidationError') {
      const errors = Object.values(error.errors || {}).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors
      });
    }
    return next(error);
  }
};

/**
 * Delete Project
 */
export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    // Prefer deleting via stored public id (reliable), fallback to URL heuristic
    if (project.imagePublicId) {
      await deleteFromCloudinary(project.imagePublicId);
    } else if (project.imageUrl && project.imageUrl.includes('cloudinary.com')) {
      await deleteFromCloudinary(project.imageUrl);
    }

    await Project.findByIdAndDelete(id);

    return res.status(200).json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    return next(error);
  }
};

/**
 * Delete Client
 */
export const deleteClient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({ success: false, message: 'Client not found' });
    }

    if (client.imagePublicId) {
      await deleteFromCloudinary(client.imagePublicId);
    } else if (client.imageUrl && client.imageUrl.includes('cloudinary.com')) {
      await deleteFromCloudinary(client.imageUrl);
    }

    await Client.findByIdAndDelete(id);

    return res.status(200).json({ success: true, message: 'Client deleted successfully' });
  } catch (error) {
    return next(error);
  }
};

/**
 * Update Project (including optional image replacement)
 * Accepts form-data: projectName (optional), description (optional), image (file optional)
 */
export const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { projectName, description } = req.body;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    let imageUrl = project.imageUrl;
    let imagePublicId = project.imagePublicId;

    if (req.file) {
      // delete existing image if present
      if (imagePublicId) {
        await deleteFromCloudinary(imagePublicId);
      } else if (imageUrl && imageUrl.includes('cloudinary.com')) {
        await deleteFromCloudinary(imageUrl);
      }

      const uploadResult = await handleUploadIfPresent(req.file, 'projects');
      imageUrl = uploadResult.imageUrl || imageUrl;
      imagePublicId = uploadResult.imagePublicId || imagePublicId;
    }

    const updated = await Project.findByIdAndUpdate(
      id,
      {
        ...(projectName && { projectName }),
        ...(description && { description }),
        imageUrl,
        imagePublicId,
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json({ success: true, message: 'Project updated successfully', data: updated });
  } catch (error) {
    return next(error);
  }
};

/**
 * Update Client (including optional image replacement)
 */
export const updateClient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { clientName, clientDescription, clientDesignation } = req.body;

    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({ success: false, message: 'Client not found' });
    }

    let imageUrl = client.imageUrl;
    let imagePublicId = client.imagePublicId;

    if (req.file) {
      if (imagePublicId) {
        await deleteFromCloudinary(imagePublicId);
      } else if (imageUrl && imageUrl.includes('cloudinary.com')) {
        await deleteFromCloudinary(imageUrl);
      }

      const uploadResult = await handleUploadIfPresent(req.file, 'clients');
      imageUrl = uploadResult.imageUrl || imageUrl;
      imagePublicId = uploadResult.imagePublicId || imagePublicId;
    }

    const updated = await Client.findByIdAndUpdate(
      id,
      {
        ...(clientName && { clientName }),
        ...(clientDescription && { clientDescription }),
        ...(clientDesignation && { clientDesignation }),
        imageUrl,
        imagePublicId,
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json({ success: true, message: 'Client updated successfully', data: updated });
  } catch (error) {
    return next(error);
  }
};

/**
 * Get contact submissions (with pagination + status filter)
 */
export const getAllContactSubmissions = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = {};
    if (status) query.status = status;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const contacts = await ContactSubmission.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip)
      .select('-__v');

    const total = await ContactSubmission.countDocuments(query);

    return res.status(200).json({
      success: true,
      count: contacts.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: contacts
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Get subscribers (with optional isActive filter + pagination)
 */
export const getAllSubscribers = async (req, res, next) => {
  try {
    const { isActive, page = 1, limit = 50 } = req.query;
    const query = {};
    if (isActive !== undefined) query.isActive = isActive === 'true';

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const subscribers = await Subscriber.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip)
      .select('-__v');

    const total = await Subscriber.countDocuments(query);

    return res.status(200).json({
      success: true,
      count: subscribers.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: subscribers
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Update contact status
 */
export const updateContactStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['new', 'read', 'responded'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value. Must be: new, read, or responded'
      });
    }

    const contact = await ContactSubmission.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Contact status updated successfully',
      data: contact
    });
  } catch (error) {
    return next(error);
  }
};
