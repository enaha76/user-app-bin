import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  reportId: {
    type: String,
    required: true,
    unique: true,
  },
  binId: {
    type: String,
    required: true,
    index: true,
  },
  userId: {
    type: String,
    required: true,
  },
  userWalletId: {
    type: String, // Hedera account ID
    required: true,
  },
  location: {
    address: String,
    coordinates: {
      lat: Number,
      lng: Number,
    },
  },
  imageUrl: {
    type: String,
    required: true,
  },
  imageHash: {
    type: String, // IPFS or file hash for verification
  },
  aiAnalysis: {
    urgency: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      required: true,
    },
    confidence: {
      type: Number,
      min: 0,
      max: 100,
    },
    wasteType: String,
    description: String,
  },
  description: String,
  status: {
    type: String,
    enum: ['pending', 'verified', 'rewarded', 'cleaned', 'rejected'],
    default: 'pending',
  },
  isFirstReport: {
    type: Boolean,
    default: false,
  },
  rewardAmount: {
    type: Number,
    default: 0,
  },
  rewardTransactionId: {
    type: String, // Hedera transaction ID
  },
  verifiedAt: Date,
  cleanedAt: Date,
}, {
  timestamps: true,
});

// Index for checking first reporter
reportSchema.index({ binId: 1, status: 1, createdAt: 1 });

const Report = mongoose.model('Report', reportSchema);

export default Report;
