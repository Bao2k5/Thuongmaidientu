# 🚀 Quick Setup Guide

## Prerequisites
- Node.js 16+ installed
- MongoDB running locally or MongoDB Atlas account
- Git installed

## 1. Clone & Install

```bash
# Clone repository
git clone https://github.com/Bao2k5/Thuongmaidientu.git
cd hoangmyjewelry

# Install backend dependencies
cd BE
npm install

# Install frontend dependencies
cd ../FE
npm install
```

## 2. Configure Environment Variables

### Backend (.env)

```bash
cd BE
cp .env.example .env
```

Edit `BE/.env` and fill in:
- `JWT_SECRET` - Generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- MongoDB connection string
- SMTP credentials (Gmail recommended)
- Cloudinary credentials
- Payment gateway keys (MoMo, VNPay)

### Frontend (.env)

```bash
cd FE
cp .env.example .env
```

Should contain:
```
VITE_API_URL=http://localhost:3000/api
```

## 3. Setup Database

```bash
cd BE

# Seed initial data
node scripts/seed.js
node scripts/seed_hoang_my_silver.js
node scripts/seed_hero_banner.js
node scripts/seed_collections.js

# Create admin account (optional)
node scripts/reset_admin.js
```

## 4. Run Development Servers

### Terminal 1 - Backend
```bash
cd BE
npm run dev
# Server runs on http://localhost:3000
```

### Terminal 2 - Frontend
```bash
cd FE
npm run dev
# App runs on http://localhost:5173
```

## 5. Access Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3000/api
- **Admin Panel:** http://localhost:5173/admin

### Default Admin Credentials
- Email: `admin@hoangmyjewelry.com`
- Password: `admin123`

## 6. Test Payment Gateways

### MoMo Test
1. Register sandbox account at https://developers.momo.vn
2. Get test credentials
3. Add to `BE/.env`
4. Test at checkout

### VNPay Test
1. Register sandbox at https://sandbox.vnpayment.vn
2. Get test credentials
3. Add to `BE/.env`
4. Use test cards from VNPay docs

## 7. Common Issues & Solutions

### Port Already in Use
```bash
# Find and kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or change port in BE/.env
PORT=3001
```

### MongoDB Connection Failed
```bash
# Check MongoDB is running
mongod --version

# Or use MongoDB Atlas
# Update MONGO_URI in .env with Atlas connection string
```

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### CORS Errors
- Check `FRONTEND_URL` in `BE/.env` matches your frontend URL
- Restart backend server after changing .env

## 8. Next Steps

- [ ] Configure SMTP for email notifications
- [ ] Setup Cloudinary for image uploads
- [ ] Get production payment gateway credentials
- [ ] Review DEPLOYMENT_CHECKLIST.md
- [ ] Test all features
- [ ] Deploy to production

## 📚 Additional Resources

- [Full Deployment Guide](./DEPLOYMENT_CHECKLIST.md)
- [Features Documentation](./SYSTEM_FEATURES.md)
- [User Guide](./USER_FEATURES.md)
- [API Documentation](./POSTMAN_TESTING_GUIDE.md)

## 🆘 Need Help?

- Check [Issues](https://github.com/Bao2k5/Thuongmaidientu/issues)
- Review existing documentation in repo
- Contact: support@hoangmyjewelry.com
