import express from 'express';
import {
  getUserBalance,
  getRewardHistory,
} from '../controllers/rewardController.js';

const router = express.Router();

// Get user token balance
router.get('/balance/:userWalletId', getUserBalance);

// Get user reward history
router.get('/history/:userId', getRewardHistory);

export default router;
