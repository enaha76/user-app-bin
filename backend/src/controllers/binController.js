import Bin from '../models/Bin.js';
import Report from '../models/Report.js';

// Get bin status
export async function getBinStatus(req, res) {
  try {
    const { binId } = req.params;

    const bin = await Bin.findOne({ binId });

    if (!bin) {
      return res.json({
        binId,
        status: 'clean',
        message: 'Bin not found in system, assuming clean',
      });
    }

    // Get latest report
    const latestReport = await Report.findOne({
      binId,
      status: { $in: ['verified', 'rewarded'] },
    }).sort({ createdAt: -1 });

    res.json({
      bin: {
        binId: bin.binId,
        status: bin.status,
        currentUrgency: bin.currentUrgency,
        location: bin.location,
        lastCleanedAt: bin.lastCleanedAt,
        reportCount: bin.reportCount,
      },
      latestReport: latestReport
        ? {
            reportId: latestReport.reportId,
            urgency: latestReport.aiAnalysis.urgency,
            timestamp: latestReport.createdAt,
          }
        : null,
      canReport: bin.status === 'clean',
    });
  } catch (error) {
    console.error('Error fetching bin status:', error);
    res.status(500).json({ error: 'Failed to fetch bin status' });
  }
}

// Get all bins
export async function getAllBins(req, res) {
  try {
    const bins = await Bin.find().sort({ reportCount: -1 });

    res.json({
      count: bins.length,
      bins,
    });
  } catch (error) {
    console.error('Error fetching bins:', error);
    res.status(500).json({ error: 'Failed to fetch bins' });
  }
}
