import express from 'express';
import {
  getAllProjects,
  getAllClients,
  submitContactForm,
  subscribeNewsletter
} from '../controllers/public.controller.js';

const router = express.Router();

router.get('/projects', getAllProjects);
router.get('/clients', getAllClients);
router.post('/contact', submitContactForm);
router.post('/subscribe', subscribeNewsletter);

export default router;