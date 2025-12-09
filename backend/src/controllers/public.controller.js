import Project from '../models/project.model.js';
import Client from '../models/client.model.js';
import ContactSubmission from '../models/contactSubmission.js';
import Subscriber from '../models/subscriber.js';

export const getAllProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 }).select('-__v');
    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    next(error);
  }
};

export const getAllClients = async (req, res, next) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 }).select('-__v');
    res.status(200).json({
      success: true,
      count: clients.length,
      data: clients
    });
  } catch (error) {
    next(error);
  }
};

export const submitContactForm = async (req, res, next) => {
  try {
    const { fullName, email, mobileNumber, city } = req.body;

    if (!fullName || !email || !mobileNumber || !city) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    const contactSubmission = await ContactSubmission.create({
      fullName,
      email,
      mobileNumber,
      city
    });

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: contactSubmission
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

export const subscribeNewsletter = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    const existingSubscriber = await Subscriber.findOne({ email });

    if (existingSubscriber) {
      if (existingSubscriber.isActive) {
        return res.status(400).json({
          success: false,
          message: 'This email is already subscribed'
        });
      } else {
        existingSubscriber.isActive = true;
        existingSubscriber.subscribedAt = Date.now();
        await existingSubscriber.save();

        return res.status(200).json({
          success: true,
          message: 'Subscription reactivated successfully',
          data: existingSubscriber
        });
      }
    }

    const subscriber = await Subscriber.create({ email });

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to newsletter',
      data: subscriber
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
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'This email is already subscribed'
      });
    }
    next(error);
  }
};