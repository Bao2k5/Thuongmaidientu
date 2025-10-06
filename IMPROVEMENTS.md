# Tóm tắt các cải tiến đã thực hiện

## ✅ Đã sửa

### 1. **Cấu hình cơ bản**
- ✅ MONGO_URI: Thêm database name `/thuongmaidientu`
- ✅ Postman baseUrl: Đổi từ 5000 → 3000
- ✅ JWT_SECRET: Đổi sang secret mạnh hơn (32+ ký tự)

### 2. **Models & Schema**
- ✅ Product.images: Sửa schema khớp với controller (object có `url` và `public_id`)
- ✅ Collection schema: Thêm `suppressReservedKeysWarning: true` để tắt warning

### 3. **Stripe Webhook Integration**
- ✅ Di chuyển webhook route lên trước `express.json()` trong `app.js`
- ✅ Stripe có thể verify signature với raw body
- ✅ Comment route webhook trong `order.routes.js` (đã di chuyển)

### 4. **Stock Management**
- ✅ Tránh giảm stock 2 lần:
  - `createOrder`: Chỉ giảm stock khi `!req.body.useStripe`
  - `webhook`: Giảm stock khi Stripe payment thành công
  - Dùng flag `order.stockAdjusted` để đảm bảo chỉ giảm 1 lần

### 5. **Error Handling**
- ✅ AdminLog.create: Thêm `.catch()` để không block request nếu log fail
- ✅ user.addresses update: Kiểm tra index hợp lệ trước khi update
- ✅ Dùng `Object.assign()` thay vì spread operator với `_doc`

### 6. **Security & Performance**
- ✅ Rate limiter: Flexible cho dev/prod (`isDev ? 1000 : 200`)
- ✅ Env validation: Check `MONGO_URI` và `JWT_SECRET` length khi khởi động

### 7. **Cleanup Warnings**
- ✅ Xóa deprecated MongoDB options (`useNewUrlParser`, `useUnifiedTopology`)
- ✅ Không còn warning khi khởi động server

---

## 🎯 Cách chạy và kiểm tra

### 1. Khởi động server
```powershell
# Cài dependencies (lần đầu)
npm install

# Seed dữ liệu demo (admin@example.com / admin123)
npm run seed

# Chạy server
npm run dev
```

### 2. Test bằng Postman
- Import `postman_collection.json`
- Collection variables đã set đúng: `baseUrl = http://localhost:3000`
- Login admin: POST `/api/auth/login`
  ```json
  {
    "email": "admin@example.com",
    "password": "admin123"
  }
  ```
- Copy token từ response → Set vào biến `{{adminToken}}`

### 3. Test Stripe flow (nếu có STRIPE_SECRET)
1. Thêm sản phẩm vào cart: POST `/api/cart`
2. Tạo PaymentIntent: POST `/api/orders/create-payment-intent`
3. Webhook sẽ tự động mark order paid khi payment thành công

---

## 📝 Các file đã chỉnh sửa

1. `.env` - Sửa MONGO_URI, JWT_SECRET
2. `postman_collection.json` - Sửa baseUrl
3. `BE/src/models/product.model.js` - Sửa images schema
4. `BE/src/models/collection.model.js` - Thêm suppressReservedKeysWarning
5. `BE/src/app.js` - Di chuyển webhook route
6. `BE/src/routes/order.routes.js` - Comment webhook route
7. `BE/src/controllers/order.controller.js` - Fix stock duplicate
8. `BE/src/controllers/user.controller.js` - Fix addresses update
9. `BE/src/controllers/admin.controller.js` - Add catch cho AdminLog
10. `BE/src/config/db.js` - Xóa deprecated options, thêm validation
11. `BE/src/middleware/security.middleware.js` - Rate limiter flexible

---

## 🚀 Tính năng đầy đủ

- ✅ Authentication (register, login, forgot password, verify email)
- ✅ Products (CRUD, images upload via Cloudinary, flash sale)
- ✅ Collections & Categories
- ✅ Shopping Cart
- ✅ Orders & Payment (Stripe integration)
- ✅ Reviews & Ratings
- ✅ Wishlist
- ✅ Promotions
- ✅ Admin Dashboard (users, orders, stats, logs)
- ✅ Security (helmet, rate-limit, sanitize, xss-clean)
- ✅ Email (nodemailer with fallback)

---

## ⚠️ Lưu ý khi deploy production

1. **Environment variables bắt buộc:**
   - `MONGO_URI` - MongoDB connection string
   - `JWT_SECRET` - Ít nhất 32 ký tự random
   - `NODE_ENV=production` - Để bật rate limiting nghiêm ngặt

2. **Optional nhưng khuyến nghị:**
   - `SMTP_*` - Để gửi email thật (reset password, verify)
   - `CLOUDINARY_*` - Để upload ảnh sản phẩm
   - `STRIPE_*` - Để nhận thanh toán thật

3. **Security checklist:**
   - [ ] Đổi JWT_SECRET thành random string dài
   - [ ] Set NODE_ENV=production
   - [ ] Cấu hình CORS_ORIGIN cho domain của bạn
   - [ ] Setup HTTPS/TLS
   - [ ] Backup database định kỳ

---

## 🐛 Debug tips

- **500 error khi login:** Kiểm tra JWT_SECRET có trong `.env`
- **Connection refused:** Đảm bảo MongoDB đang chạy và MONGO_URI đúng
- **Rate limit error:** Set `NODE_ENV=development` hoặc đợi 15 phút
- **Stripe webhook fail:** Kiểm tra webhook endpoint nhận raw body (đã fix)

Chúc may mắn! 🎉
