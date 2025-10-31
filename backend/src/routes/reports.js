import express from 'express';
import {
  submitReport,
  getReport,
  getBinReports,
  getUserReports,
  markBinCleaned,
} from '../controllers/reportController.js';

const router = express.Router();

// Submit new report
router.post('/', submitReport);

// Get specific report
router.get('/:id', getReport);

// Get all reports for a bin
router.get('/bin/:binId', getBinReports);

// Get user's reports
router.get('/user/:userId', getUserReports);

// Mark bin as cleaned (admin endpoint)
router.patch('/bin/:binId/clean', markBinCleaned);

export default router;
