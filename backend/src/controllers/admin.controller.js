import Project from '../models/project.model.js';
import Client from '../models/client.model.js';
import ContactSubmission from '../models/contactSubmission.js';
import Subscriber from '../models/subscriber.js';
import { processUploadedImage } from '../utils/imageProcessor.js';

export const addProject = async (req, res, next) => {
  try {
    const { projectName, description } = req.body;
    let imageUrl = req.body.imageUrl || '';

    if (req.file) {
      imageUrl = await processUploadedImage(req.file, 'project');
    }

    if (!projectName || !description || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
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

    if (req.file) {
      imageUrl = await processUploadedImage(req.file, 'client');
    }

    if (!clientName || !clientDescription || !clientDesignation || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
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
        message: 'Invalid status value'
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
