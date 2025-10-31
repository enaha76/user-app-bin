import Report from '../models/Report.js';
import Bin from '../models/Bin.js';
import { transferEcoTokens, calculateReward } from '../services/hederaService.js';

// Submit new waste report
export async function submitReport(req, res) {
  try {
    const {
      binId,
      userId,
      userWalletId,
      location,
      imageUrl,
      aiAnalysis,
      description,
    } = req.body;

    // Validate required fields
    if (!binId || !userId || !userWalletId || !imageUrl || !aiAnalysis) {
      return res.status(400).json({
        error: 'Missing required fields',
      });
    }

    // Check if bin is already reported as dirty
    const existingReport = await Report.findOne({
      binId,
      status: { $in: ['pending', 'verified', 'rewarded'] },
    }).sort({ createdAt: -1 });

    const isFirstReport = !existingReport;

    // Generate unique report ID
    const reportId = `REP_${Date.now()}_${binId}`;

    // Create report
    const report = new Report({
      reportId,
      binId,
      userId,
      userWalletId,
      location,
      imageUrl,
      aiAnalysis,
      description,
      status: 'verified',
      isFirstReport,
    });

    await report.save();

    // Update or create bin record
    let bin = await Bin.findOne({ binId });
    if (!bin) {
      bin = new Bin({
        binId,
        location,
        status: 'dirty',
        currentUrgency: aiAnalysis.urgency,
      });
    } else {
      bin.status = 'dirty';
      bin.currentUrgency = aiAnalysis.urgency;
    }
    bin.lastReportId = reportId;
    bin.reportCount += 1;
    await bin.save();

    // If first report, distribute tokens
    let rewardResult = null;
    if (isFirstReport) {
      try {
        const rewardAmount = calculateReward(aiAnalysis.urgency);
        rewardResult = await transferEcoTokens(userWalletId, rewardAmount);

        // Update report with reward info
        report.status = 'rewarded';
        report.rewardAmount = rewardAmount;
        report.rewardTransactionId = rewardResult.transactionId;
        report.verifiedAt = new Date();
        await report.save();
      } catch (error) {
        console.error('Reward distribution failed:', error);
        // Report still saved, but reward failed
      }
    }

    res.status(201).json({
      success: true,
      report: {
        reportId: report.reportId,
        binId: report.binId,
        status: report.status,
        isFirstReport: report.isFirstReport,
        reward: rewardResult
          ? {
              amount: rewardResult.amount,
              transactionId: rewardResult.transactionId,
            }
          : null,
        aiAnalysis: report.aiAnalysis,
      },
      message: isFirstReport
        ? `Report submitted! You earned ${rewardResult?.amount || 0} ECO tokens!`
        : 'Report submitted, but bin already reported. No reward.',
    });
  } catch (error) {
    console.error('Error submitting report:', error);
    res.status(500).json({
      error: 'Failed to submit report',
      details: error.message,
    });
  }
}

// Get report by ID
export async function getReport(req, res) {
  try {
    const { id } = req.params;

    const report = await Report.findOne({ reportId: id });

    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }

    res.json({ report });
  } catch (error) {
    console.error('Error fetching report:', error);
    res.status(500).json({ error: 'Failed to fetch report' });
  }
}

// Get all reports for a bin
export async function getBinReports(req, res) {
  try {
    const { binId } = req.params;

    const reports = await Report.find({ binId })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({
      binId,
      reportCount: reports.length,
      reports,
    });
  } catch (error) {
    console.error('Error fetching bin reports:', error);
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
}

// Get user's reports
export async function getUserReports(req, res) {
  try {
    const { userId } = req.params;

    const reports = await Report.find({ userId })
      .sort({ createdAt: -1 })
      .limit(100);

    const totalRewards = reports.reduce(
      (sum, report) => sum + (report.rewardAmount || 0),
      0
    );

    res.json({
      userId,
      reportCount: reports.length,
      totalRewards,
      reports,
    });
  } catch (error) {
    console.error('Error fetching user reports:', error);
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
}

// Mark bin as cleaned (admin/municipality endpoint)
export async function markBinCleaned(req, res) {
  try {
    const { binId } = req.params;

    // Update all pending reports for this bin
    await Report.updateMany(
      { binId, status: { $in: ['pending', 'verified', 'rewarded'] } },
      { status: 'cleaned', cleanedAt: new Date() }
    );

    // Update bin status
    const bin = await Bin.findOneAndUpdate(
      { binId },
      {
        status: 'clean',
        currentUrgency: null,
        lastCleanedAt: new Date(),
      },
      { new: true }
    );

    res.json({
      success: true,
      message: 'Bin marked as cleaned',
      bin,
    });
  } catch (error) {
    console.error('Error marking bin cleaned:', error);
    res.status(500).json({ error: 'Failed to update bin status' });
  }
}
