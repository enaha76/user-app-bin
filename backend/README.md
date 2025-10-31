# EcoClean Backend

Backend API for EcoClean waste management platform with Hedera blockchain integration.

## Features

- 🔗 Hedera blockchain integration for token rewards
- 🤖 AI-powered waste image analysis
- 📊 Waste report management
- 💰 Automated ECO token distribution
- 🔐 Smart contract verification (first reporter wins)

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your Hedera credentials
   ```

3. **Get Hedera Testnet Account:**
   - Go to https://portal.hedera.com/
   - Create testnet account
   - Get Account ID and Private Key
   - Fund with test HBAR

4. **Create ECO Token:**
   ```bash
   node scripts/create-token.js
   ```

5. **Start server:**
   ```bash
   npm run dev
   ```

## API Endpoints

### Waste Reports

- `POST /api/reports` - Submit new waste report
- `GET /api/reports/:id` - Get report details
- `GET /api/reports/bin/:binId` - Get reports for a bin
- `PATCH /api/reports/:id/verify` - Verify and reward report

### Bins

- `GET /api/bins/:binId/status` - Get bin status
- `PATCH /api/bins/:binId/clean` - Mark bin as cleaned

### Rewards

- `GET /api/rewards/balance/:userId` - Get user token balance
- `GET /api/rewards/history/:userId` - Get reward history

### Health

- `GET /health` - API health check

## Environment Variables

See `.env.example` for required configuration.

## Tech Stack

- **Node.js + Express** - REST API
- **Hedera SDK** - Blockchain integration
- **MongoDB** - Database
- **Multer** - File uploads
