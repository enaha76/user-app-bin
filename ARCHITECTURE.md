# 🏗️ EcoClean Architecture

Complete system architecture and data flow documentation.

---

## 📊 System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                          │
│                    (React + TypeScript)                         │
│                                                                  │
│  ┌──────────┐  ┌──────────┐  ┌───────────┐  ┌──────────┐     │
│  │  Landing │  │  Report  │  │ Dashboard │  │ Rewards  │     │
│  │   Page   │  │  Waste   │  │           │  │          │     │
│  └──────────┘  └──────────┘  └───────────┘  └──────────┘     │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            │ HTTP/REST API
                            │
┌───────────────────────────▼─────────────────────────────────────┐
│                      BACKEND API SERVER                         │
│                    (Node.js + Express)                          │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │   Reports    │  │     Bins     │  │   Rewards    │        │
│  │  Controller  │  │  Controller  │  │  Controller  │        │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘        │
│         │                  │                  │                 │
│         └──────────────────┴──────────────────┘                 │
│                            │                                     │
│                    ┌───────▼────────┐                          │
│                    │  Hedera Service│                          │
│                    │ (Token Logic)  │                          │
│                    └───────┬────────┘                          │
└────────────────────────────┼──────────────────────────────────┘
                             │
                ┌────────────┴────────────┐
                │                         │
                ▼                         ▼
    ┌───────────────────┐    ┌────────────────────┐
    │     MongoDB       │    │  Hedera Hashgraph  │
    │   (Database)      │    │   (Blockchain)     │
    │                   │    │                    │
    │ - Reports         │    │ - ECO Tokens       │
    │ - Bins            │    │ - Transactions     │
    │ - User Data       │    │ - Smart Contracts  │
    └───────────────────┘    └────────────────────┘
```

---

## 🔄 Data Flow Diagram

### **Report Submission Flow**

```
┌──────────┐
│   USER   │
└────┬─────┘
     │ 1. Upload Image
     ▼
┌──────────────────┐
│   Frontend       │
│  ReportWaste.tsx │
└────┬─────────────┘
     │ 2. Send to AI
     ▼
┌─────────────────────┐
│   OpenRouter API    │
│  DeepSeek Model     │
│                     │
│ Input:  Image       │
│ Output: {           │
│   urgency: "high"   │
│   confidence: 89    │
│   wasteType: "..."  │
│ }                   │
└────┬────────────────┘
     │ 3. AI Response
     ▼
┌──────────────────┐
│   Frontend       │
│  (Store Result)  │
└────┬─────────────┘
     │ 4. Submit Report
     │ POST /api/reports
     ▼
┌────────────────────────┐
│   Backend API          │
│  reportController.js   │
└────┬───────────────────┘
     │ 5. Check First Reporter
     ▼
┌────────────────────┐
│    MongoDB         │
│  Query: Find       │
│  existing reports  │
│  for this bin      │
└────┬───────────────┘
     │ 6. Query Result
     ▼
┌────────────────────────┐
│   Backend              │
│  If First Reporter:    │
│   Calculate Reward     │
└────┬───────────────────┘
     │ 7. Transfer Tokens
     ▼
┌─────────────────────────┐
│  Hedera Service         │
│  hederaService.js       │
│                         │
│  1. Create Transaction  │
│  2. Sign with Treasury  │
│  3. Submit to Network   │
│  4. Get Receipt         │
└────┬────────────────────┘
     │ 8. Transaction ID
     ▼
┌──────────────────────┐
│   Hedera Network     │
│                      │
│  Transfer ECO Tokens:│
│  Treasury → User     │
│  Amount: 50 ECO      │
└────┬─────────────────┘
     │ 9. Confirmation
     ▼
┌────────────────────┐
│   Backend          │
│  Save to Database: │
│  - Report Details  │
│  - TX ID           │
│  - Reward Amount   │
└────┬───────────────┘
     │ 10. Success Response
     ▼
┌──────────────────┐
│   Frontend       │
│  Show Success:   │
│  "Earned 50 ECO!"│
│  TX: 0.0.12345@..│
└────┬─────────────┘
     │ 11. Redirect
     ▼
┌──────────────────┐
│   Dashboard      │
│  Load Reports    │
│  Show Balance    │
└──────────────────┘
```

---

## 🗂️ Component Architecture

### **Frontend Components**

```
App.tsx (Root)
├── UserProvider (Context)
│   └── userId, userWalletId
├── QueryClientProvider (React Query)
├── BrowserRouter (Routing)
    ├── Navbar
    └── Routes
        ├── / → Index.tsx
        │   ├── Hero Section
        │   ├── Features
        │   ├── Stats
        │   └── CTA
        │
        ├── /report → ReportWaste.tsx
        │   ├── Step 1: Location
        │   │   ├── GPS Detection
        │   │   └── QR Scan
        │   ├── Step 2: Photo
        │   │   ├── Image Upload
        │   │   └── AI Analysis
        │   ├── Step 3: Details
        │   │   ├── Review
        │   │   └── Description
        │   └── Step 4: Submit
        │       └── API Call
        │
        ├── /dashboard → Dashboard.tsx
        │   ├── Stats Cards
        │   │   ├── Total Reports
        │   │   ├── ECO Earned
        │   │   └── Bins Cleaned
        │   └── Report List
        │       └── API: getUserReports()
        │
        └── /rewards → Rewards.tsx
            ├── Balance Display
            ├── Reward Tiers
            └── Marketplace
```

### **Backend Architecture**

```
index.js (Entry Point)
├── Database Connection (MongoDB)
├── Hedera Configuration
├── Express Middleware
│   ├── CORS
│   ├── JSON Parser
│   └── Logger
└── API Routes
    ├── /api/reports
    │   ├── POST /          → submitReport()
    │   ├── GET /:id        → getReport()
    │   ├── GET /user/:id   → getUserReports()
    │   └── GET /bin/:id    → getBinReports()
    │
    ├── /api/bins
    │   ├── GET /:id/status → getBinStatus()
    │   └── GET /           → getAllBins()
    │
    └── /api/rewards
        ├── GET /balance/:walletId → getUserBalance()
        └── GET /history/:userId   → getRewardHistory()
```

---

## 💾 Database Schema

### **Reports Collection**

```javascript
{
  _id: ObjectId,
  reportId: "REP_1698765432_BIN_042",
  binId: "BIN_042_CP",
  userId: "user_1698765432000",
  userWalletId: "0.0.12345",
  
  location: {
    address: "Central Park, Bin #42",
    coordinates: {
      lat: 40.7829,
      lng: -73.9654
    }
  },
  
  imageUrl: "data:image/jpeg;base64,...",
  imageHash: "QmXxxx...",
  
  aiAnalysis: {
    urgency: "high",
    confidence: 89,
    wasteType: "Mixed waste with recyclables",
    description: "Significant buildup detected"
  },
  
  description: "Overflowing near playground",
  status: "rewarded",
  isFirstReport: true,
  
  rewardAmount: 50,
  rewardTransactionId: "0.0.12345@1698765432.123456789",
  
  verifiedAt: ISODate("2024-01-15T10:30:00Z"),
  cleanedAt: null,
  
  createdAt: ISODate("2024-01-15T10:30:00Z"),
  updatedAt: ISODate("2024-01-15T10:30:00Z")
}
```

**Indexes:**
- `reportId` (unique)
- `binId` (for bin queries)
- `userId` (for user queries)
- `{ binId, status, createdAt }` (compound for first-reporter check)

### **Bins Collection**

```javascript
{
  _id: ObjectId,
  binId: "BIN_042_CP",
  
  location: {
    address: "Central Park, Main Path",
    coordinates: {
      lat: 40.7829,
      lng: -73.9654
    }
  },
  
  qrCode: "https://ecoclean.io/bin/BIN_042_CP",
  status: "dirty",
  currentUrgency: "high",
  
  lastReportId: "REP_1698765432_BIN_042",
  lastCleanedAt: ISODate("2024-01-10T08:00:00Z"),
  reportCount: 12,
  
  createdAt: ISODate("2024-01-01T00:00:00Z"),
  updatedAt: ISODate("2024-01-15T10:30:00Z")
}
```

**Indexes:**
- `binId` (unique)
- `status` (for filtering)

---

## 🔐 Security Architecture

### **Authentication Flow** (Future)

```
User Login
    ↓
Frontend: Auth0/Firebase
    ↓
JWT Token Generated
    ↓
Store in localStorage
    ↓
Include in API Headers:
Authorization: Bearer <token>
    ↓
Backend: Verify Token
    ↓
Extract userId
    ↓
Process Request
```

### **Wallet Integration** (Future)

```
User Connects Wallet
    ↓
HashPack Browser Extension
    ↓
Request Account ID
    ↓
User Approves
    ↓
Store: userWalletId
    ↓
Sign Transaction
    ↓
Submit to Backend
    ↓
Backend Verifies Signature
    ↓
Process Transaction
```

---

## 🚀 Deployment Architecture

### **Production Setup**

```
┌──────────────────────────────────────────┐
│          CDN (Cloudflare)                │
│        Static Assets Cache               │
└─────────────┬────────────────────────────┘
              │
┌─────────────▼────────────────────────────┐
│      Frontend (Vercel/Netlify)           │
│      React Build (Static)                │
│      - index.html                        │
│      - assets/                           │
└─────────────┬────────────────────────────┘
              │ HTTPS API Calls
┌─────────────▼────────────────────────────┐
│   Load Balancer (Nginx/AWS ALB)         │
└─────────────┬────────────────────────────┘
              │
    ┌─────────┴─────────┐
    │                   │
┌───▼────────┐   ┌─────▼─────┐
│ Backend 1  │   │ Backend 2 │
│ (Node.js)  │   │ (Node.js) │
└───┬────────┘   └─────┬─────┘
    │                  │
    └─────────┬────────┘
              │
    ┌─────────┴─────────┐
    │                   │
┌───▼──────────┐  ┌────▼──────────┐
│   MongoDB    │  │    Hedera     │
│   Cluster    │  │   Mainnet     │
│  (Replica    │  │               │
│    Set)      │  │               │
└──────────────┘  └───────────────┘
```

---

## 📊 Performance Optimization

### **Frontend**
- Code splitting (Vite)
- Lazy loading routes
- Image optimization
- TanStack Query caching
- Service Worker (PWA)

### **Backend**
- MongoDB connection pooling
- Response caching (Redis)
- Rate limiting
- Compression (gzip)
- Clustering (PM2)

### **Database**
- Indexed queries
- Aggregation pipelines
- Query optimization
- Connection pooling

---

## 🔄 CI/CD Pipeline

```
Developer Push
    ↓
GitHub Actions
    ↓
┌───────────────────┐
│ 1. Run Tests      │
│    - Unit Tests   │
│    - Integration  │
│    - E2E          │
└────────┬──────────┘
         │ ✅ Pass
         ▼
┌───────────────────┐
│ 2. Build          │
│    - Frontend     │
│    - Backend      │
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│ 3. Deploy         │
│    - Frontend →   │
│      Vercel       │
│    - Backend →    │
│      Railway      │
└───────────────────┘
```

---

## 📈 Monitoring & Logging

```
Application
    ↓
Logs → CloudWatch/LogDNA
    ↓
Metrics → Prometheus
    ↓
Visualization → Grafana
    ↓
Alerts → PagerDuty
```

---

## 🧩 Technology Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 18 | UI Framework |
| | TypeScript | Type Safety |
| | TailwindCSS | Styling |
| | shadcn/ui | Components |
| | TanStack Query | State Management |
| | Vite | Build Tool |
| **Backend** | Node.js 18 | Runtime |
| | Express.js | Web Framework |
| | MongoDB | Database |
| | Mongoose | ODM |
| **Blockchain** | Hedera SDK | Token Operations |
| | HTS | Token Standard |
| **AI** | DeepSeek v3.1 | Vision Model |
| | OpenRouter | API Gateway |
| **DevOps** | Docker | Containerization |
| | GitHub Actions | CI/CD |
| **Monitoring** | PM2 | Process Manager |

---

This architecture is designed for scalability, security, and performance while maintaining simplicity for hackathon rapid development.

**Last Updated**: October 2025
