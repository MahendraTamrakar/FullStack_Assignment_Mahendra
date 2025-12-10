import express from 'express';
import {
  addProject,
  addClient,
  updateProject,
  updateClient,
  deleteProject,
  deleteClient,
  getAllContactSubmissions,
  getAllSubscribers,
  updateContactStatus
} from '../controllers/admin.controller.js';
import { uploadProjectImage, uploadClientImage } from '../middleware/upload.js';

const router = express.Router();

// Project Routes
router.post('/projects', uploadProjectImage, addProject);
router.put('/projects/:id', uploadProjectImage, updateProject);
router.delete('/projects/:id', deleteProject);

// Client Routes
router.post('/clients', uploadClientImage, addClient);
router.put('/clients/:id', uploadClientImage, updateClient);
router.delete('/clients/:id', deleteClient);

// Contact Submission Routes
router.get('/contacts', getAllContactSubmissions);
router.patch('/contacts/:id', updateContactStatus);

// Subscriber Routes
router.get('/subscribers', getAllSubscribers);

export default router;