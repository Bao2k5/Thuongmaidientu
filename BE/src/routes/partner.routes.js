import express from 'express';
import {
  getPartners,
  getAllPartners,
  createPartner,
  updatePartner,
  deletePartner,
  bulkUpdatePosition,
} from '../controllers/partner.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public routes
router.get('/', getPartners);

// Admin routes
router.get('/admin/all', protect, admin, getAllPartners);
router.post('/admin/create', protect, admin, createPartner);
router.put('/admin/update/:id', protect, admin, updatePartner);
router.delete('/admin/delete/:id', protect, admin, deletePartner);
router.put('/admin/bulk-position', protect, admin, bulkUpdatePosition);

export default router;
