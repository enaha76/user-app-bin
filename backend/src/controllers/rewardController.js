import Report from '../models/Report.js';
import { getTokenBalance } from '../services/hederaService.js';

// Get user's token balance
export async function getUserBalance(req, res) {
  try {
    const { userWalletId } = req.params;

    if (!userWalletId) {
      return res.status(400).json({ error: 'User wallet ID required' });
    }

    const balance = await getTokenBalance(userWalletId);

    res.json(balance);
  } catch (error) {
    console.error('Error fetching balance:', error);
    res.status(500).json({
      error: 'Failed to fetch balance',
      details: error.message,
    });
  }
}

// Get user's reward history
export async function getRewardHistory(req, res) {
  try {
    const { userId } = req.params;

    const rewards = await Report.find({
      userId,
      status: 'rewarded',
      rewardAmount: { $gt: 0 },
    })
      .select('reportId binId rewardAmount rewardTransactionId verifiedAt aiAnalysis')
      .sort({ verifiedAt: -1 });

    const totalEarned = rewards.reduce(
      (sum, r) => sum + (r.rewardAmount || 0),
      0
    );

    res.json({
      userId,
      totalEarned,
      rewardCount: rewards.length,
      rewards: rewards.map((r) => ({
        reportId: r.reportId,
        binId: r.binId,
        amount: r.rewardAmount,
        urgency: r.aiAnalysis.urgency,
        transactionId: r.rewardTransactionId,
        date: r.verifiedAt,
      })),
    });
  } catch (error) {
    console.error('Error fetching reward history:', error);
    res.status(500).json({ error: 'Failed to fetch reward history' });
  }
}
