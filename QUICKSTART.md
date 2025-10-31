# ⚡ EcoClean Quick Start Guide

Get up and running in 5 minutes!

---

## 🚀 One-Command Start (After Setup)

```bash
./start-dev.sh
```

---

## 📋 First-Time Setup Checklist

### ✅ Step 1: Prerequisites (5 min)
- [ ] Node.js 18+ installed
- [ ] MongoDB running
- [ ] Hedera testnet account created

### ✅ Step 2: Backend Setup (3 min)
```bash
cd backend
npm install
cp .env.example .env
```

**Edit `backend/.env` with:**
```env
HEDERA_OPERATOR_ID=0.0.YOUR_ID
HEDERA_OPERATOR_KEY=YOUR_KEY
```

**Create ECO Token:**
```bash
node scripts/create-token.js
# Add Token ID to .env
```

### ✅ Step 3: Frontend Setup (2 min)
```bash
cd ..
npm install
cp .env.local.example .env.local
```

### ✅ Step 4: Start (1 min)
```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2  
npm run dev
```

---

## 🎯 Test Your Setup

1. Open http://localhost:5173
2. Go to `/report`
3. Upload image
4. Submit report
5. Check dashboard

**Expected Result**: Report shows, tokens earned ✅

---

## 🔗 Important URLs

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3001
- **API Health**: http://localhost:3001/health
- **Hedera Portal**: https://portal.hedera.com

---

## 🆘 Quick Troubleshooting

### Backend won't start
```bash
# Check MongoDB
sudo systemctl status mongodb

# Check port
lsof -i :3001
```

### Frontend can't connect
```bash
# Verify API URL
echo $VITE_API_URL

# Should be: http://localhost:3001/api
```

### No tokens received
```bash
# Check Hedera config
node backend/scripts/test-connection.js

# Check backend logs
```

---

## 📚 Full Documentation

- **Complete Guide**: `README.md`
- **Backend Setup**: `backend/SETUP.md`
- **Integration**: `INTEGRATION_GUIDE.md`

---

**Happy coding! 🌱**
