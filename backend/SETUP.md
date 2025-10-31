# EcoClean Backend Setup Guide

Complete step-by-step guide to set up the Hedera-powered backend.

## Prerequisites

- Node.js 18+ installed
- MongoDB installed and running (or use MongoDB Atlas)
- Hedera testnet account

## Step 1: Get Hedera Testnet Account

1. **Create Account:**
   - Go to https://portal.hedera.com/
   - Sign up and create a testnet account
   - You'll receive:
     - Account ID (e.g., `0.0.12345`)
     - Private Key (e.g., `302e020100300506032b657004220420...`)

2. **Fund Your Account:**
   - Testnet accounts come with free test HBAR
   - If you need more, use the faucet: https://portal.hedera.com/faucet

## Step 2: Install Dependencies

```bash
cd backend
npm install
```

## Step 3: Configure Environment

```bash
# Copy example env file
cp .env.example .env

# Edit .env with your credentials
nano .env
```

**Required Configuration:**
```env
# Hedera Network
HEDERA_NETWORK=testnet
HEDERA_OPERATOR_ID=0.0.YOUR_ACCOUNT_ID
HEDERA_OPERATOR_KEY=YOUR_PRIVATE_KEY

# Treasury Account (can be same as operator for testing)
HEDERA_TREASURY_ID=0.0.YOUR_ACCOUNT_ID
HEDERA_TREASURY_KEY=YOUR_PRIVATE_KEY

# Server
PORT=3001

# Database (local or MongoDB Atlas)
MONGODB_URI=mongodb://localhost:27017/ecoclean

# Frontend
FRONTEND_URL=http://localhost:5173

# OpenRouter (for AI)
OPENROUTER_API_KEY=sk-or-v1-your-key
```

## Step 4: Start MongoDB

**Local MongoDB:**
```bash
# Start MongoDB service
sudo systemctl start mongodb
# Or on Mac:
brew services start mongodb-community
```

**MongoDB Atlas (Cloud):**
1. Create free cluster at https://www.mongodb.com/cloud/atlas
2. Get connection string
3. Update `MONGODB_URI` in `.env`

## Step 5: Test Hedera Connection

```bash
node scripts/test-connection.js
```

You should see:
```
✅ Connection successful!
Account ID: 0.0.xxxxx
HBAR Balance: 10000
Network: testnet
```

## Step 6: Create ECO Token

```bash
node scripts/create-token.js
```

This will:
- Create a new fungible token called "ECO"
- Mint 1,000,000 initial tokens
- Output the Token ID

**Copy the Token ID to your `.env`:**
```env
ECO_TOKEN_ID=0.0.xxxxx
```

## Step 7: Start Backend Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

You should see:
```
✅ MongoDB connected successfully
✅ Hedera configuration validated
🚀 EcoClean Backend API running on port 3001
📡 Health check: http://localhost:3001/health
```

## Step 8: Test API

```bash
# Health check
curl http://localhost:3001/health

# Should return:
{
  "status": "ok",
  "service": "EcoClean Backend API",
  "hedera": {
    "network": "testnet",
    "configured": true
  }
}
```

## Step 9: Update Frontend

Update frontend `.env`:
```bash
cd ..
echo "VITE_API_URL=http://localhost:3001/api" >> .env.local
```

## API Endpoints

### Reports
- `POST /api/reports` - Submit waste report
- `GET /api/reports/:id` - Get report details
- `GET /api/reports/user/:userId` - Get user's reports
- `GET /api/reports/bin/:binId` - Get bin's reports

### Bins
- `GET /api/bins/:binId/status` - Get bin status
- `GET /api/bins` - Get all bins

### Rewards
- `GET /api/rewards/balance/:walletId` - Get token balance
- `GET /api/rewards/history/:userId` - Get reward history

## Testing the Flow

1. **Submit a report:**
```bash
curl -X POST http://localhost:3001/api/reports \
  -H "Content-Type: application/json" \
  -d '{
    "binId": "BIN_001_TEST",
    "userId": "user123",
    "userWalletId": "0.0.YOUR_ACCOUNT",
    "location": {
      "address": "Test Location",
      "coordinates": {"lat": 40.7829, "lng": -73.9654}
    },
    "imageUrl": "data:image/jpeg;base64,/9j/4AAQ...",
    "aiAnalysis": {
      "urgency": "high",
      "confidence": 85,
      "wasteType": "Mixed waste"
    }
  }'
```

2. **Check if you received tokens:**
```bash
curl http://localhost:3001/api/rewards/balance/0.0.YOUR_ACCOUNT
```

## Troubleshooting

### MongoDB Connection Failed
- Check if MongoDB is running: `sudo systemctl status mongodb`
- Try connection string: `mongodb://127.0.0.1:27017/ecoclean`

### Hedera Errors
- Verify account ID format: `0.0.12345` (with dots, not spaces)
- Check private key is complete (starts with `302e020100`)
- Ensure account has HBAR balance (min 5 HBAR)

### Token Transfer Failed
- User must associate token before first transfer
- Check treasury has enough tokens
- Verify treasury key is correct

### Port Already in Use
```bash
# Find process using port 3001
lsof -i :3001
# Kill it
kill -9 <PID>
```

## Production Deployment

1. Use environment-specific `.env` files
2. Set `NODE_ENV=production`
3. Use process manager (PM2):
   ```bash
   npm install -g pm2
   pm2 start src/index.js --name ecoclean-api
   ```
4. Enable HTTPS
5. Use mainnet Hedera network
6. Secure API with authentication

## Next Steps

- [ ] Add authentication (JWT)
- [ ] Add rate limiting
- [ ] Deploy smart contract for verification
- [ ] Add image upload to IPFS
- [ ] Add webhook for municipality notifications
- [ ] Create admin dashboard
