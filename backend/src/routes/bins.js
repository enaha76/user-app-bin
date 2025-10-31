import express from 'express';
import { getBinStatus, getAllBins } from '../controllers/binController.js';

const router = express.Router();

// Get bin status
router.get('/:binId/status', getBinStatus);

// Get all bins
router.get('/', getAllBins);

export default router;
