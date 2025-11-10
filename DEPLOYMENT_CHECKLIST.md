# 🚀 Deployment & Production Checklist

## ✅ Đã hoàn thành
- [x] Tích hợp MoMo payment gateway (sandbox)
- [x] Tích hợp VNPay payment gateway (sandbox)
- [x] Payment result pages (Success/Cancel)
- [x] Admin product management với primary image
- [x] Flash Sale ưu tiên category "Vòng Tay"
- [x] Cart synchronization (server + client)
- [x] Checkout flow cơ bản
- [x] Auth JWT với refresh token
- [x] Admin layout và dashboard
- [x] Hero banner động
- [x] Collection management

---

## 🔴 QUAN TRỌNG - Cần làm ngay

### A. Cấu hình Environment Variables

#### Backend (.env)
```env
# Server
PORT=3000
BACKEND_URL=http://localhost:3000
NODE_ENV=development

# Database
MONGO_URI=mongodb://127.0.0.1:27017/thuongmaidientu

# JWT
JWT_SECRET=<chuoi_dai_kho_doan_sinh_random>
JWT_EXPIRES_IN=7d

# SMTP (Production Email)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM="HoangMy Jewelry <no-reply@yourdomain.com>"
FRONTEND_URL=http://localhost:5173

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Stripe
STRIPE_SECRET=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# MoMo (thay test keys bằng keys thật)
MOMO_PARTNER_CODE=your-partner-code
MOMO_ACCESS_KEY=your-access-key
MOMO_SECRET_KEY=your-secret-key
MOMO_ENDPOINT=https://test-payment.momo.vn/v2/gateway/api/create
MOMO_REDIRECT_URL=http://localhost:5173/payment/momo/callback
MOMO_IPN_URL=http://localhost:3000/api/payment/momo/ipn

# VNPay (thay test keys bằng keys thật)
VNPAY_TMN_CODE=your-tmn-code
VNPAY_HASH_SECRET=your-hash-secret
VNPAY_URL=https://sandbox.vnpayment.vn/paymentv2/vpcpay.html
VNPAY_API_URL=https://sandbox.vnpayment.vn/merchant_webapi/api/transaction
VNPAY_RETURN_URL=http://localhost:5173/payment/vnpay/callback
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000/api
```

**🔧 Action Items:**
1. Copy `.env.example` → `.env` (cả BE và FE)
2. Điền tất cả các keys thật (MoMo, VNPay, Stripe, Cloudinary, SMTP)
3. Test từng service một (email, upload ảnh, thanh toán)

---

### B. Stripe Webhook Setup

**Vấn đề hiện tại:**
- Code webhook đã có trong `payment.controller.js`
- Nhưng route cần đặt TRƯỚC `express.json()` để nhận raw body

**Fix cần làm:**

File: `BE/src/app.js`
```javascript
const express = require('express');
const app = express();

// Import payment controller
const paymentController = require('./controllers/payment.controller');

// ⚠️ QUAN TRỌNG: Route webhook phải ĐẶT TRƯỚC express.json()
app.post('/api/orders/webhook', 
  express.raw({ type: 'application/json' }), 
  paymentController.webhook
);

// SAU ĐÓ mới parse JSON cho các route khác
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ... các route khác
```

**Cấu hình Stripe Dashboard:**
1. Vào https://dashboard.stripe.com/webhooks
2. Add endpoint: `http://localhost:3000/api/orders/webhook` (dev) hoặc `https://yourdomain.com/api/orders/webhook` (production)
3. Chọn events: `payment_intent.succeeded`, `payment_intent.payment_failed`
4. Copy `Signing secret` (whsec_...) → `.env` → `STRIPE_WEBHOOK_SECRET`

---

### C. Chuẩn hóa Checkout Flow

**Cần làm:**
1. **UI chọn payment gateway** trong `Checkout.jsx`:
   - Radio buttons: Stripe / MoMo / VNPay / COD
   - Hiển thị logo và mô tả ngắn

2. **Logic xử lý từng gateway:**
   ```javascript
   // Stripe: dùng @stripe/react-stripe-js
   if (paymentMethod === 'stripe') {
     const { clientSecret } = await orderService.createPaymentIntent(orderData);
     // confirmPayment với Stripe Elements
   }
   
   // MoMo/VNPay: redirect
   if (paymentMethod === 'momo') {
     const { payUrl } = await paymentService.createMomoPayment(orderData);
     window.location.href = payUrl;
   }
   ```

3. **Xử lý callback** trong `PaymentSuccess.jsx` / `PaymentCancel.jsx`:
   - Đọc query params (`orderId`, `resultCode`, `vnp_ResponseCode`)
   - Gọi API verify/query để confirm
   - Hiển thị thông tin đơn hàng
   - Update order status

**Files cần chỉnh:**
- `FE/src/pages/Checkout.jsx`
- `FE/src/pages/PaymentSuccess.jsx`
- `FE/src/pages/PaymentCancel.jsx`

---

### D. Email Production

**Hiện trạng:**
- Code email đã có trong `BE/src/utils/mailer.js`
- Dev mode: trả token trong response thay vì gửi email
- Production: cần SMTP thật

**Setup SMTP Gmail:**
1. Bật 2-Step Verification trong Google Account
2. Tạo App Password tại https://myaccount.google.com/apppasswords
3. Thêm vào `.env`:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password-16-chars
   ```

**Test:**
```bash
# Trong BE, test gửi email
node -e "require('./src/utils/mailer').sendEmail('test@example.com', 'Test', '<p>Hello</p>')"
```

---

### E. Cloudinary Setup

**Cần làm:**
1. Đăng ký Cloudinary (free tier): https://cloudinary.com/users/register_free
2. Copy credentials vào `.env`
3. Test upload trong Admin Products
4. Chạy script kiểm tra ảnh:
   ```bash
   node check_images.js
   ```
5. Fix ảnh theo hướng dẫn trong `FIX_COLLECTION_IMAGES.md`

---

### F. Security & RBAC

**Hardening cần làm:**

1. **Rà soát admin routes:**
   ```javascript
   // Đảm bảo TẤT CẢ admin routes có middleware
   router.put('/orders/:id/status', authMiddleware, isAdmin, ...);
   router.post('/products', authMiddleware, isAdmin, ...);
   ```

2. **Rate limiting:**
   ```javascript
   // Đã có trong app.js, nhưng cần điều chỉnh limits
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100, // limit each IP to 100 requests per windowMs
   });
   ```

3. **CORS production:**
   ```javascript
   // app.js - chỉ cho phép domain thật
   const corsOptions = {
     origin: process.env.FRONTEND_URL || 'http://localhost:5173',
     credentials: true,
   };
   app.use(cors(corsOptions));
   ```

4. **Helmet configuration:**
   - Đã có trong code
   - Kiểm tra CSP directives phù hợp với Cloudinary/Stripe

---

### G. Testing

**Test Coverage cần bổ sung:**

1. **Auth Tests** (`tests/auth.test.js` - đã có, cần mở rộng):
   - Register validation
   - Login với sai password
   - JWT expiration
   - Refresh token flow

2. **Product Tests** (tạo mới `tests/product.test.js`):
   - List products với filter
   - Create product (admin only)
   - Update product
   - Upload images

3. **Cart & Order Tests** (`tests/order.test.js`):
   - Add to cart
   - Create order
   - Payment intent
   - Webhook handling (mock Stripe)

4. **Payment Tests** (`tests/payment.test.js`):
   - MoMo signature validation
   - VNPay hash validation
   - Mock callback responses

**Chạy tests:**
```bash
npm test
npm run test:coverage
```

---

## 🟡 TRUNG BÌNH - Cải thiện UX/UI

Theo `IMPROVEMENTS_UI.md`:

- [ ] Quick View Modal cho products
- [ ] Advanced filters (price range, materials)
- [ ] Product comparison
- [ ] Wishlist sync với server
- [ ] Loading skeletons
- [ ] Toast notifications (react-hot-toast)
- [ ] Image zoom on hover
- [ ] Related products section
- [ ] Recently viewed products

---

## 🟢 TỐT NÊN CÓ - Features nâng cao

- [ ] Review & Rating system (đã có model, cần UI)
- [ ] Promo codes (đã có model, cần UI apply)
- [ ] Inventory alerts (low stock)
- [ ] Analytics dashboard cho admin
- [ ] Export orders to CSV/Excel
- [ ] Multi-language support
- [ ] PWA configuration
- [ ] SEO optimization (meta tags, sitemap)

---

## 📋 Checklist Deploy Production

### Pre-deployment:
- [ ] Tất cả ENV vars đã điền đủ (production keys)
- [ ] SMTP hoạt động (test gửi email)
- [ ] Cloudinary upload hoạt động
- [ ] Database backup script
- [ ] SSL certificate ready (HTTPS)
- [ ] Domain DNS configured
- [ ] Stripe webhook endpoint public
- [ ] MoMo/VNPay IPN endpoint public

### Code:
- [ ] Remove console.logs
- [ ] Set NODE_ENV=production
- [ ] Build FE: `npm run build`
- [ ] Test production build locally
- [ ] Git tag version: `git tag v1.0.0`

### Monitoring:
- [ ] Error tracking (Sentry/LogRocket)
- [ ] Uptime monitoring (UptimeRobot)
- [ ] Performance monitoring (New Relic/PM2)
- [ ] Database backup automation

---

## 🚀 Deployment Options

### Option 1: VPS (Recommended)
**Backend:**
- Deploy: Ubuntu VPS (DigitalOcean, Vultr, etc.)
- Process manager: PM2
- Reverse proxy: Nginx
- Database: MongoDB Atlas hoặc local MongoDB

**Frontend:**
- Build: `npm run build`
- Serve: Nginx static files
- CDN: Cloudflare (optional)

### Option 2: Platform-as-a-Service
**Backend:**
- Render.com (free tier)
- Railway.app
- Heroku (paid)

**Frontend:**
- Vercel (recommended)
- Netlify
- Cloudflare Pages

### Option 3: Docker
- Containerize BE + FE
- Docker Compose setup
- Deploy to any cloud provider

---

## 📞 Support & Resources

**MoMo:**
- Docs: https://developers.momo.vn
- Register: https://business.momo.vn

**VNPay:**
- Docs: https://sandbox.vnpayment.vn/apis/docs
- Register: https://vnpay.vn/dang-ky-merchant

**Stripe:**
- Docs: https://stripe.com/docs
- Dashboard: https://dashboard.stripe.com

**Cloudinary:**
- Docs: https://cloudinary.com/documentation
- Dashboard: https://console.cloudinary.com

---

## 📝 Notes

- **Priority 1 (CRITICAL):** A, B, C - Phải làm trước khi deploy
- **Priority 2 (HIGH):** D, E, F - Cần cho production ổn định
- **Priority 3 (MEDIUM):** G, UI improvements - Nâng cao chất lượng
- **Priority 4 (LOW):** Advanced features - Sau khi ổn định

**Estimated timeline:**
- Priority 1: 2-3 days
- Priority 2: 3-4 days
- Priority 3: 1 week
- Priority 4: Ongoing

---

**Last updated:** November 10, 2025
**Version:** 1.0.0
**Status:** In Development
