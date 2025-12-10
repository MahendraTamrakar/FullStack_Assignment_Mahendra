// src/routes/admin.route.js
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
  updateContactStatus,
} from '../controllers/admin.controller.js';

import { uploadProjectImage, uploadClientImage } from '../middleware/upload.js';

const router = express.Router();

router.post('/projects', uploadProjectImage, addProject);
router.put('/projects/:id', uploadProjectImage, updateProject);
router.delete('/projects/:id', deleteProject);

router.post('/clients', uploadClientImage, addClient);
router.put('/clients/:id', uploadClientImage, updateClient);
router.delete('/clients/:id', deleteClient);

router.get('/contacts', getAllContactSubmissions);
router.patch('/contacts/:id', updateContactStatus);

router.get('/subscribers', getAllSubscribers);

export default router;
