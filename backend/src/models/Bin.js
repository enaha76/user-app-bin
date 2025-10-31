import mongoose from 'mongoose';

const binSchema = new mongoose.Schema({
  binId: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    address: String,
    coordinates: {
      lat: Number,
      lng: Number,
    },
  },
  qrCode: String,
  status: {
    type: String,
    enum: ['clean', 'dirty', 'overflowing', 'maintenance'],
    default: 'clean',
  },
  lastReportId: String,
  lastCleanedAt: Date,
  reportCount: {
    type: Number,
    default: 0,
  },
  currentUrgency: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
  },
}, {
  timestamps: true,
});

const Bin = mongoose.model('Bin', binSchema);

export default Bin;
