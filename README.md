# 🌍 EcoClean - Blockchain-Powered Waste Management Platform

![Version](https://img.shields.io/badge/version-1.0.0-green)
![License](https://img.shields.io/badge/license-MIT-blue)
![Hedera](https://img.shields.io/badge/blockchain-Hedera-purple)
![React](https://img.shields.io/badge/frontend-React-blue)
![Node.js](https://img.shields.io/badge/backend-Node.js-green)

**EcoClean** is a revolutionary civic engagement platform that incentivizes citizens to report overflowing or dirty waste bins using **blockchain rewards**. Users earn **ECO tokens** (powered by Hedera blockchain) for verified reports, helping municipalities maintain cleaner cities.

---

## 🎯 Problem Statement

Cities struggle with inefficient waste management due to:
- Delayed awareness of overflowing bins
- Lack of citizen engagement
- No incentive system for reporting issues
- Reactive rather than proactive maintenance

---

## 💡 Solution

EcoClean gamifies waste management by:
1. **AI-Powered Detection** - Automatically analyzes waste urgency from photos
2. **Blockchain Rewards** - Instant crypto payments for verified reports
3. **Smart Verification** - Only first reporter gets rewarded (prevents spam)
4. **Real-Time Tracking** - Municipalities see reports instantly
5. **Community Impact** - Users track their environmental contribution

---

## ✨ Key Features

### 🤖 **AI Image Analysis**
- **DeepSeek AI** integration via OpenRouter
- Automatic urgency detection (low, medium, high, critical)
- Waste type classification
- Confidence scoring (0-100%)

### 💰 **Blockchain Rewards**
- **Hedera Hashgraph** integration
- ECO token distribution
- Dynamic rewards based on urgency:
  - Low: 10 ECO
  - Medium: 25 ECO
  - High: 50 ECO
  - Critical: 75 ECO

### 🔐 **Smart Contract Logic**
- First-reporter verification
- Duplicate report prevention
- Automatic token distribution
- Transaction tracking

### 📊 **User Dashboard**
- Real-time report tracking
- Token balance display
- Impact metrics
- Report history

### 📍 **Location Services**
- GPS-based bin detection
- QR code scanning support
- Geolocation tagging

---

## 🏗️ Architecture

### **Tech Stack**

#### **Frontend**
- **Framework**: React 18 + TypeScript
- **Routing**: React Router 6
- **Styling**: TailwindCSS 3
- **UI Components**: shadcn/ui + Radix UI
- **State Management**: TanStack Query + Context API
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **Build Tool**: Vite

#### **Backend**
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB
- **Blockchain**: Hedera SDK
- **API**: RESTful JSON API

#### **AI/ML**
- **Model**: DeepSeek Chat v3.1
- **Provider**: OpenRouter API
- **Task**: Vision analysis for waste detection

#### **Blockchain**
- **Network**: Hedera Hashgraph (Testnet/Mainnet)
- **Token**: ECO (HTS - Hedera Token Service)
- **Transactions**: Native token transfers

---

## 📁 Project Structure

```
ecoclean/
├── frontend/                     # React Frontend Application
│   ├── src/
│   │   ├── components/          # UI Components
│   │   │   ├── ui/             # shadcn/ui components (50+ components)
│   │   │   └── Navbar.tsx      # Main navigation
│   │   ├── contexts/            # React Context Providers
│   │   │   └── UserContext.tsx # User state management
│   │   ├── lib/                 # Utilities & Services
│   │   │   ├── api.ts          # Backend API client
│   │   │   ├── openrouter.ts   # AI image analysis
│   │   │   └── utils.ts        # Helper functions
│   │   ├── pages/               # Route Components
│   │   │   ├── Index.tsx       # Landing page
│   │   │   ├── ReportWaste.tsx # Report submission
│   │   │   ├── Dashboard.tsx   # User dashboard
│   │   │   ├── Rewards.tsx     # Token marketplace
│   │   │   └── NotFound.tsx    # 404 page
│   │   ├── hooks/               # Custom React hooks
│   │   ├── App.tsx              # Root component
│   │   └── main.tsx             # Entry point
│   ├── public/                  # Static assets
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.ts
│
├── backend/                      # Node.js Backend API
│   ├── src/
│   │   ├── config/              # Configuration
│   │   │   ├── hedera.js       # Hedera client setup
│   │   │   └── database.js     # MongoDB connection
│   │   ├── models/              # Database Schemas
│   │   │   ├── Report.js       # Waste report model
│   │   │   └── Bin.js          # Waste bin model
│   │   ├── services/            # Business Logic
│   │   │   └── hederaService.js # Token operations
│   │   ├── controllers/         # Request Handlers
│   │   │   ├── reportController.js
│   │   │   ├── binController.js
│   │   │   └── rewardController.js
│   │   ├── routes/              # API Routes
│   │   │   ├── reports.js
│   │   │   ├── bins.js
│   │   │   └── rewards.js
│   │   └── index.js             # Server entry point
│   ├── scripts/                 # Utility Scripts
│   │   ├── create-token.js     # Create ECO token
│   │   └── test-connection.js  # Test Hedera
│   ├── package.json
│   └── Dockerfile
│
├── docs/                         # Documentation
│   ├── BACKEND_COMPLETE.md
│   ├── INTEGRATION_GUIDE.md
│   └── API.md
│
├── .env.local.example           # Frontend env template
├── start-dev.sh                 # Quick start script
└── README.md                    # This file
```

---

## 🚀 Quick Start

### **Prerequisites**

- Node.js 18+ installed
- MongoDB installed or MongoDB Atlas account
- Hedera testnet account ([Get one here](https://portal.hedera.com/))

### **1. Clone Repository**

```bash
git clone <repository-url>
cd user-app-bin
```

### **2. Setup Backend**

```bash
cd backend
npm install

# Configure environment
cp .env.example .env
nano .env  # Add your Hedera credentials
```

**Backend `.env` configuration:**
```env
# Hedera Configuration
HEDERA_NETWORK=testnet
HEDERA_OPERATOR_ID=0.0.YOUR_ACCOUNT_ID
HEDERA_OPERATOR_KEY=YOUR_PRIVATE_KEY
HEDERA_TREASURY_ID=0.0.YOUR_ACCOUNT_ID
HEDERA_TREASURY_KEY=YOUR_PRIVATE_KEY

# Database
MONGODB_URI=mongodb://localhost:27017/ecoclean

# Server
PORT=3001
FRONTEND_URL=http://localhost:5173

# AI
OPENROUTER_API_KEY=sk-or-v1-your-key
```

**Test Hedera connection:**
```bash
node scripts/test-connection.js
```

**Create ECO Token:**
```bash
node scripts/create-token.js
# Copy the Token ID and add to .env as ECO_TOKEN_ID
```

**Start backend:**
```bash
npm run dev
# Backend runs on http://localhost:3001
```

### **3. Setup Frontend**

```bash
cd ..
npm install

# Configure environment
cp .env.local.example .env.local
```

**Frontend `.env.local`:**
```env
VITE_API_URL=http://localhost:3001/api
VITE_OPENROUTER_API_KEY=sk-or-v1-your-openrouter-key
```

**Start frontend:**
```bash
npm run dev
# Frontend runs on http://localhost:5173
```

### **4. Quick Start (Both Servers)**

```bash
./start-dev.sh
```

---

## 🔧 Configuration

### **Hedera Setup**

1. **Create Account**: https://portal.hedera.com/
2. **Get Testnet Credentials**:
   - Account ID: `0.0.xxxxx`
   - Private Key: `302e020100300506032b657004220420...`
3. **Fund Account**: Use testnet faucet (free test HBAR)
4. **Create Token**: Run `node scripts/create-token.js`

### **MongoDB Setup**

**Local:**
```bash
# Ubuntu/Debian
sudo apt install mongodb
sudo systemctl start mongodb

# macOS
brew install mongodb-community
brew services start mongodb-community
```

**Cloud (MongoDB Atlas):**
1. Create free cluster at https://www.mongodb.com/cloud/atlas
2. Get connection string
3. Update `MONGODB_URI` in `.env`

---

## 📡 API Documentation

### **Base URL**
```
http://localhost:3001/api
```

### **Endpoints**

#### **Reports**

**Submit Waste Report**
```http
POST /api/reports
Content-Type: application/json

{
  "binId": "BIN_042_CP",
  "userId": "user_1698765432000",
  "userWalletId": "0.0.12345",
  "location": {
    "address": "Central Park, Bin #42",
    "coordinates": { "lat": 40.7829, "lng": -73.9654 }
  },
  "imageUrl": "data:image/jpeg;base64,...",
  "aiAnalysis": {
    "urgency": "high",
    "confidence": 89,
    "wasteType": "Mixed waste with recyclables"
  },
  "description": "Overflowing bin near playground"
}

Response: 201 Created
{
  "success": true,
  "report": {
    "reportId": "REP_1698765432_BIN_042",
    "binId": "BIN_042_CP",
    "status": "rewarded",
    "isFirstReport": true,
    "reward": {
      "amount": 50,
      "transactionId": "0.0.12345@1698765432.123456789"
    }
  },
  "message": "Report submitted! You earned 50 ECO tokens!"
}
```

**Get Report by ID**
```http
GET /api/reports/:reportId

Response: 200 OK
{
  "report": { ... }
}
```

**Get User Reports**
```http
GET /api/reports/user/:userId

Response: 200 OK
{
  "userId": "user_1698765432000",
  "reportCount": 5,
  "totalRewards": 150,
  "reports": [...]
}
```

**Get Bin Reports**
```http
GET /api/reports/bin/:binId

Response: 200 OK
{
  "binId": "BIN_042_CP",
  "reportCount": 3,
  "reports": [...]
}
```

#### **Bins**

**Get Bin Status**
```http
GET /api/bins/:binId/status

Response: 200 OK
{
  "bin": {
    "binId": "BIN_042_CP",
    "status": "dirty",
    "currentUrgency": "high",
    "reportCount": 3
  },
  "canReport": false
}
```

**Mark Bin as Cleaned** (Admin)
```http
PATCH /api/reports/bin/:binId/clean

Response: 200 OK
{
  "success": true,
  "message": "Bin marked as cleaned"
}
```

#### **Rewards**

**Get Token Balance**
```http
GET /api/rewards/balance/:userWalletId

Response: 200 OK
{
  "accountId": "0.0.12345",
  "tokenId": "0.0.67890",
  "balance": 150
}
```

**Get Reward History**
```http
GET /api/rewards/history/:userId

Response: 200 OK
{
  "userId": "user_1698765432000",
  "totalEarned": 150,
  "rewardCount": 3,
  "rewards": [...]
}
```

---

## 🎨 Frontend Features

### **Pages**

#### **1. Landing Page** (`/`)
- Hero section with value proposition
- Feature showcase
- How it works section
- Statistics display
- Call-to-action

#### **2. Report Waste** (`/report`)
- Multi-step form wizard
- GPS location detection
- QR code scanning (simulated)
- Image upload
- Real-time AI analysis
- Progress indicator
- Success feedback with transaction ID

#### **3. Dashboard** (`/dashboard`)
- User statistics cards
- Report history list
- Status indicators
- Token earnings display
- Empty states for new users

#### **4. Rewards** (`/rewards`)
- Token balance
- Reward tiers (Bronze, Silver, Gold, Platinum)
- Marketplace for spending tokens
- Available rewards catalog

---

## 🔄 User Flow

### **Report Submission Flow**

```
1. User navigates to /report
2. Selects location method (GPS or QR)
3. Location detected → Proceed to photo
4. User uploads waste bin photo
5. AI analyzes image (DeepSeek API)
   ├─ Determines urgency level
   ├─ Identifies waste type
   └─ Calculates confidence score
6. User reviews AI analysis
7. User adds optional description
8. Frontend checks bin status (API)
9. User submits report
10. Backend processes:
    ├─ Checks if first reporter
    ├─ Calculates reward amount
    ├─ Transfers ECO tokens (Hedera)
    └─ Saves to database
11. User receives success notification
    ├─ Shows ECO tokens earned
    └─ Displays transaction ID
12. Dashboard updates automatically
```

---

## 🧪 Testing

### **Frontend Tests**
```bash
npm run test
```

### **Backend Tests**
```bash
cd backend
npm test
```

### **API Testing with cURL**

```bash
# Health check
curl http://localhost:3001/health

# Submit report
curl -X POST http://localhost:3001/api/reports \
  -H "Content-Type: application/json" \
  -d @test-report.json

# Get user reports
curl http://localhost:3001/api/reports/user/user_123

# Check bin status
curl http://localhost:3001/api/bins/BIN_042_CP/status
```

---

## 🐳 Docker Deployment

### **Using Docker Compose**

```bash
cd backend
docker-compose up -d
```

This starts:
- MongoDB container
- Backend API container

### **Build Docker Image**

```bash
cd backend
docker build -t ecoclean-backend .
docker run -p 3001:3001 --env-file .env ecoclean-backend
```

---

## 🔐 Security Considerations

### **Current Implementation** (Development)
- API keys in environment variables
- No authentication (demo user IDs)
- CORS enabled for localhost
- HTTP (not HTTPS)

### **Production Recommendations**
- ✅ Implement JWT authentication
- ✅ Add rate limiting
- ✅ Use HTTPS/TLS
- ✅ Wallet signature verification
- ✅ Input validation and sanitization
- ✅ API key rotation
- ✅ Database encryption
- ✅ Secrets management (AWS Secrets Manager, Vault)

---

## 🌐 Deployment

### **Frontend Deployment** (Vercel/Netlify)

```bash
npm run build
# Upload dist/ folder
```

**Environment Variables:**
```
VITE_API_URL=https://api.ecoclean.io
VITE_OPENROUTER_API_KEY=your-key
```

### **Backend Deployment** (AWS/Heroku/Railway)

```bash
cd backend
npm install --production
npm start
```

**Environment Variables:**
- Set all variables from `.env.example`
- Use production Hedera mainnet credentials
- Point to production MongoDB

---

## 📊 Database Schema

### **Report Model**
```javascript
{
  reportId: String (unique),
  binId: String (indexed),
  userId: String,
  userWalletId: String,
  location: {
    address: String,
    coordinates: { lat: Number, lng: Number }
  },
  imageUrl: String,
  aiAnalysis: {
    urgency: String (low/medium/high/critical),
    confidence: Number (0-100),
    wasteType: String
  },
  status: String (pending/verified/rewarded/cleaned),
  isFirstReport: Boolean,
  rewardAmount: Number,
  rewardTransactionId: String,
  createdAt: Date,
  updatedAt: Date
}
```

### **Bin Model**
```javascript
{
  binId: String (unique),
  location: {
    address: String,
    coordinates: { lat: Number, lng: Number }
  },
  status: String (clean/dirty/overflowing),
  currentUrgency: String,
  lastCleanedAt: Date,
  reportCount: Number,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🎯 Roadmap

### **Phase 1: MVP** ✅
- [x] Frontend UI/UX
- [x] AI image analysis integration
- [x] Backend API
- [x] Hedera blockchain integration
- [x] Basic reward system

### **Phase 2: Enhancement** 🚧
- [ ] User authentication (Firebase/Auth0)
- [ ] Real wallet integration (HashPack, Blade)
- [ ] QR code generation for bins
- [ ] Municipality admin dashboard
- [ ] Email/SMS notifications

### **Phase 3: Scale** 📋
- [ ] Mobile app (React Native)
- [ ] Real-time map view
- [ ] Advanced analytics
- [ ] Smart contract deployment
- [ ] IPFS image storage
- [ ] Multi-city support
- [ ] Gamification leaderboard

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

**Project Type**: Hackathon Project  
**Built With**: ❤️ for the environment

---

## 📞 Support

- **Documentation**: See `/docs` folder
- **Backend Setup**: `backend/SETUP.md`
- **Integration Guide**: `INTEGRATION_GUIDE.md`
- **API Docs**: `docs/API.md`

---

## 🙏 Acknowledgments

- **Hedera Hashgraph** - Blockchain infrastructure
- **OpenRouter** - AI API gateway
- **DeepSeek** - Vision AI model
- **shadcn/ui** - UI components
- **TailwindCSS** - Styling framework

---

## 📈 Project Status

🟢 **Active Development** - Ready for hackathon demo

**Version**: 1.0.0  
**Last Updated**: October 2025

---

<div align="center">

### Made with 🌱 for a cleaner planet

**[Demo](http://localhost:5173)** • **[Docs](./docs)** • **[Report Bug](issues)** • **[Request Feature](issues)**

</div>
