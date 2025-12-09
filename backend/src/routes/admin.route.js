import express from 'express';
import {
  addProject,
  addClient,
  getAllContactSubmissions,
  getAllSubscribers,
  updateContactStatus
} from '../controllers/admin.controller.js';
import { uploadProjectImage, uploadClientImage } from '../middleware/upload.js';

const router = express.Router();

router.post('/projects', uploadProjectImage, addProject);
router.post('/clients', uploadClientImage, addClient);
router.get('/contacts', getAllContactSubmissions);
router.patch('/contacts/:id', updateContactStatus);
router.get('/subscribers', getAllSubscribers);

export default router;
