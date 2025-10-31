import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database.js';
import { validateHederaConfig } from './config/hedera.js';
import reportRoutes from './routes/reports.js';
import binRoutes from './routes/bins.js';
import rewardRoutes from './routes/rewards.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'EcoClean Backend API',
    timestamp: new Date().toISOString(),
    hedera: {
      network: process.env.HEDERA_NETWORK || 'testnet',
      configured: !!process.env.HEDERA_OPERATOR_ID,
    },
  });
});

// API Routes
app.use('/api/reports', reportRoutes);
app.use('/api/bins', binRoutes);
app.use('/api/rewards', rewardRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.path,
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message,
  });
});

// Start server
async function startServer() {
  try {
    // Connect to database
    await connectDatabase();
    
    // Validate Hedera configuration
    try {
      validateHederaConfig();
      console.log('✅ Hedera configuration validated');
    } catch (error) {
      console.warn('⚠️  Hedera config incomplete:', error.message);
      console.warn('⚠️  Token distribution will not work without valid Hedera credentials');
    }
    
    // Start listening
    app.listen(PORT, () => {
      console.log(`🚀 EcoClean Backend API running on port ${PORT}`);
      console.log(`📡 Health check: http://localhost:${PORT}/health`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Handle shutdown gracefully
process.on('SIGINT', async () => {
  console.log('\nShutting down gracefully...');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\nShutting down gracefully...');
  process.exit(0);
});

// Start the server
startServer();
