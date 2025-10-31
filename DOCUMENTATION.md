# 📚 EcoClean Documentation Index

Complete guide to all project documentation.

---

## 🎯 Start Here

### **New to the Project?**
1. **[README.md](./README.md)** - Complete project overview
2. **[QUICKSTART.md](./QUICKSTART.md)** - Get running in 5 minutes
3. **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System design and diagrams

---

## 📖 Documentation Structure

### **🚀 Getting Started**

| Document | Purpose | Audience |
|----------|---------|----------|
| **[README.md](./README.md)** | Full project documentation | Everyone |
| **[QUICKSTART.md](./QUICKSTART.md)** | Fast setup guide | Developers |
| **[LICENSE](./LICENSE)** | MIT License | Legal |

### **🏗️ Architecture & Design**

| Document | Purpose | Audience |
|----------|---------|----------|
| **[ARCHITECTURE.md](./ARCHITECTURE.md)** | System architecture diagrams | Developers, Architects |
| **[INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)** | Frontend-backend integration | Developers |
| **[BACKEND_COMPLETE.md](./BACKEND_COMPLETE.md)** | Backend implementation details | Backend Devs |

### **⚙️ Setup & Configuration**

| Document | Purpose | Audience |
|----------|---------|----------|
| **[backend/SETUP.md](./backend/SETUP.md)** | Detailed backend setup | Backend Devs |
| **[backend/README.md](./backend/README.md)** | Backend API documentation | API Users |
| **[.env.local.example](./.env.local.example)** | Frontend env template | Developers |
| **[backend/.env.example](./backend/.env.example)** | Backend env template | Developers |

### **🛠️ Scripts & Tools**

| File | Purpose | Usage |
|------|---------|-------|
| **[start-dev.sh](./start-dev.sh)** | Start both servers | `./start-dev.sh` |
| **[backend/start.sh](./backend/start.sh)** | Backend guided setup | `cd backend && ./start.sh` |
| **[backend/scripts/create-token.js](./backend/scripts/create-token.js)** | Create ECO token | `node create-token.js` |
| **[backend/scripts/test-connection.js](./backend/scripts/test-connection.js)** | Test Hedera | `node test-connection.js` |

---

## 📋 Documentation by Topic

### **For First-Time Setup**
1. [QUICKSTART.md](./QUICKSTART.md) - 5-minute setup
2. [backend/SETUP.md](./backend/SETUP.md) - Detailed backend config
3. [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) - Connect frontend/backend

### **For Understanding the System**
1. [README.md](./README.md) - Project overview
2. [ARCHITECTURE.md](./ARCHITECTURE.md) - System design
3. [BACKEND_COMPLETE.md](./BACKEND_COMPLETE.md) - Backend details

### **For API Integration**
1. [backend/README.md](./backend/README.md) - API endpoints
2. [README.md#api-documentation](./README.md#-api-documentation) - API examples

### **For Deployment**
1. [README.md#-deployment](./README.md#-deployment) - Deploy guide
2. [backend/Dockerfile](./backend/Dockerfile) - Docker config
3. [backend/docker-compose.yml](./backend/docker-compose.yml) - Docker Compose

### **For Troubleshooting**
1. [QUICKSTART.md#-quick-troubleshooting](./QUICKSTART.md#-quick-troubleshooting) - Common issues
2. [backend/SETUP.md#troubleshooting](./backend/SETUP.md#troubleshooting) - Detailed fixes
3. [INTEGRATION_GUIDE.md#-common-issues](./INTEGRATION_GUIDE.md#-common-issues) - Integration problems

---

## 🎓 Learning Paths

### **Path 1: Quick Demo** (15 min)
```
QUICKSTART.md
    ↓
Run ./start-dev.sh
    ↓
Test the app
    ↓
Read README.md
```

### **Path 2: Full Setup** (1 hour)
```
README.md
    ↓
backend/SETUP.md
    ↓
INTEGRATION_GUIDE.md
    ↓
ARCHITECTURE.md
```

### **Path 3: API Development** (30 min)
```
backend/README.md
    ↓
Test API endpoints
    ↓
Read backend/src/controllers/
    ↓
BACKEND_COMPLETE.md
```

### **Path 4: Contributing** (45 min)
```
README.md
    ↓
ARCHITECTURE.md
    ↓
Clone & setup
    ↓
Make changes
    ↓
Test
    ↓
Submit PR
```

---

## 📊 Code Documentation

### **Frontend**

#### **Core Files**
- `src/App.tsx` - Application root with routing
- `src/main.tsx` - Entry point
- `src/pages/` - Page components
- `src/components/` - Reusable UI components
- `src/lib/api.ts` - Backend API client
- `src/lib/openrouter.ts` - AI integration
- `src/contexts/UserContext.tsx` - User state

#### **Key Features**
- **Report Submission**: `src/pages/ReportWaste.tsx`
- **Dashboard**: `src/pages/Dashboard.tsx`
- **Landing Page**: `src/pages/Index.tsx`
- **Rewards**: `src/pages/Rewards.tsx`

### **Backend**

#### **Core Files**
- `src/index.js` - Express server
- `src/config/hedera.js` - Hedera configuration
- `src/config/database.js` - MongoDB connection
- `src/models/` - Database schemas
- `src/services/hederaService.js` - Token logic
- `src/controllers/` - Request handlers
- `src/routes/` - API endpoints

#### **Key Features**
- **Report Processing**: `src/controllers/reportController.js`
- **Token Distribution**: `src/services/hederaService.js`
- **Bin Management**: `src/controllers/binController.js`
- **Rewards**: `src/controllers/rewardController.js`

---

## 🔍 Quick Reference

### **Environment Variables**

#### Frontend (`.env.local`)
```env
VITE_API_URL=http://localhost:3001/api
VITE_OPENROUTER_API_KEY=sk-or-v1-xxx
```

#### Backend (`backend/.env`)
```env
HEDERA_NETWORK=testnet
HEDERA_OPERATOR_ID=0.0.xxxxx
HEDERA_OPERATOR_KEY=302e020100...
ECO_TOKEN_ID=0.0.xxxxx
MONGODB_URI=mongodb://localhost:27017/ecoclean
PORT=3001
```

### **Important URLs**

| Service | URL |
|---------|-----|
| Frontend Dev | http://localhost:5173 |
| Backend Dev | http://localhost:3001 |
| API Health | http://localhost:3001/health |
| MongoDB | mongodb://localhost:27017 |
| Hedera Portal | https://portal.hedera.com |
| OpenRouter | https://openrouter.ai |

### **Common Commands**

```bash
# Start development
./start-dev.sh

# Install dependencies
npm install
cd backend && npm install

# Run tests
npm test
cd backend && npm test

# Type check
npm run typecheck

# Build production
npm run build

# Start backend
cd backend && npm run dev

# Create token
cd backend && node scripts/create-token.js

# Test Hedera
cd backend && node scripts/test-connection.js
```

---

## 📱 Mobile/Responsive Documentation

Currently in desktop-first design. Mobile optimization planned for Phase 2.

**Current Support:**
- ✅ Desktop (1920x1080+)
- ✅ Tablet (768px+)
- ⚠️ Mobile (< 768px) - Basic support

---

## 🤝 Contributing

See [README.md#-contributing](./README.md#-contributing) for contribution guidelines.

---

## 🆘 Getting Help

### **Documentation Issues**
- Missing info? Open an issue
- Found error? Submit PR
- Need clarification? Ask in discussions

### **Technical Support**
- Check troubleshooting guides
- Review backend logs
- Test API endpoints manually

### **Resources**
- **Hedera Docs**: https://docs.hedera.com
- **React Docs**: https://react.dev
- **Express Docs**: https://expressjs.com
- **MongoDB Docs**: https://docs.mongodb.com

---

## 📝 Documentation Updates

**Last Updated**: October 2025  
**Version**: 1.0.0  
**Status**: ✅ Complete

### **Changelog**
- **v1.0.0** (Oct 2025): Initial complete documentation
  - All core docs created
  - Setup guides complete
  - Architecture documented
  - API fully documented

---

## 🎯 Next Documentation Priorities

- [ ] Video walkthrough
- [ ] API Postman collection
- [ ] Component storybook
- [ ] E2E test documentation
- [ ] Performance benchmarks
- [ ] Security audit results

---

<div align="center">

**Made with 📝 for developers**

Need help? Check the docs above or [open an issue](issues)!

</div>
