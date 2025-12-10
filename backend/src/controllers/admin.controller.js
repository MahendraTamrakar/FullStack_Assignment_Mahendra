import Project from '../models/project.model.js';
import Client from '../models/client.model.js';
import ContactSubmission from '../models/contactSubmission.js';
import Subscriber from '../models/subscriber.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/cloudinaryUpload.js';

export const addProject = async (req, res, next) => {
  try {
    const { projectName, description } = req.body;
    let imageUrl = req.body.imageUrl || '';

    // Upload to Cloudinary if file exists
    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file, 'projects');
    }

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
    });

    res.status(201).json({
      success: true,
      message: 'Project added successfully',
      data: project
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors
      });
    }
    next(error);
  }
};

export const addClient = async (req, res, next) => {
  try {
    const { clientName, clientDescription, clientDesignation } = req.body;
    let imageUrl = req.body.imageUrl || '';

    // Upload to Cloudinary if file exists
    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file, 'clients');
    }

    if (!clientName || !clientDescription || !clientDesignation || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields (clientName, clientDescription, clientDesignation, image)'
      });
    }

    const client = await Client.create({
      imageUrl,
      clientName,
      clientDescription,
      clientDesignation
    });

    res.status(201).json({
      success: true,
      message: 'Client added successfully',
      data: client
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors
      });
    }
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Delete image from Cloudinary
    if (project.imageUrl && project.imageUrl.includes('cloudinary.com')) {
      await deleteFromCloudinary(project.imageUrl);
    }

    await Project.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const deleteClient = async (req, res, next) => {
  try {
    const { id } = req.params;

    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found'
      });
    }

    // Delete image from Cloudinary
    if (client.imageUrl && client.imageUrl.includes('cloudinary.com')) {
      await deleteFromCloudinary(client.imageUrl);
    }

    await Client.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Client deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { projectName, description } = req.body;
    
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    let imageUrl = project.imageUrl;

    // If new image uploaded, delete old one and upload new
    if (req.file) {
      if (project.imageUrl && project.imageUrl.includes('cloudinary.com')) {
        await deleteFromCloudinary(project.imageUrl);
      }
      imageUrl = await uploadToCloudinary(req.file, 'projects');
    }

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { 
        ...(projectName && { projectName }),
        ...(description && { description }),
        imageUrl
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: updatedProject
    });
  } catch (error) {
    next(error);
  }
};

export const updateClient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { clientName, clientDescription, clientDesignation } = req.body;
    
    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found'
      });
    }

    let imageUrl = client.imageUrl;

    // If new image uploaded, delete old one and upload new
    if (req.file) {
      if (client.imageUrl && client.imageUrl.includes('cloudinary.com')) {
        await deleteFromCloudinary(client.imageUrl);
      }
      imageUrl = await uploadToCloudinary(req.file, 'clients');
    }

    const updatedClient = await Client.findByIdAndUpdate(
      id,
      { 
        ...(clientName && { clientName }),
        ...(clientDescription && { clientDescription }),
        ...(clientDesignation && { clientDesignation }),
        imageUrl
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Client updated successfully',
      data: updatedClient
    });
  } catch (error) {
    next(error);
  }
};

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

    res.status(200).json({
      success: true,
      count: contacts.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: contacts
    });
  } catch (error) {
    next(error);
  }
};

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

    res.status(200).json({
      success: true,
      count: subscribers.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: subscribers
    });
  } catch (error) {
    next(error);
  }
};

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

    res.status(200).json({
      success: true,
      message: 'Contact status updated successfully',
      data: contact
    });
  } catch (error) {
    next(error);
  }
};