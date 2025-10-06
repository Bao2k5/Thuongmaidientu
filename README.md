# 💎 JEWELRY BTHN - Hệ Thống Thương Mại Điện Tử Trang Sức

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-008CDD?style=for-the-badge&logo=stripe&logoColor=white)

### 🎓 ĐỒ ÁN CHUYÊN NGÀNH THƯƠNG MẠI ĐIỆN TỬ
**Nhóm 2 - Khoa Công Nghệ Thông Tin**

</div>

---

## 👥 THÀNH VIÊN NHÓM

| STT | Họ và Tên | Vai Trò | GitHub |
|-----|-----------|---------|--------|
| 1 | **Lê Dương Bảo** | 👑 Trưởng nhóm | [@Bao2k5](https://github.com/Bao2k5) |
| 2 | Nguyễn Lê Hưng | Thành viên | |
| 3 | Phạm Thanh Tùng | Thành viên | |
| 4 | Trần Gia Nghĩa | Thành viên | |

---

## 📝 GIỚI THIỆU DỰ ÁN

**Jewelry BTHN** là hệ thống thương mại điện tử chuyên về trang sức (nhẫn, dây chuyền, lắc tay, hoa tai) được xây dựng với kiến trúc RESTful API hiện đại. Dự án tập trung vào việc xây dựng backend hoàn chỉnh với đầy đủ tính năng của một website thương mại điện tử chuyên nghiệp.

### 🎯 Mục Tiêu Dự Án

- ✅ Xây dựng API backend hoàn chỉnh cho hệ thống thương mại điện tử
- ✅ Áp dụng các công nghệ và kiến trúc hiện đại
- ✅ Tích hợp thanh toán trực tuyến qua Stripe
- ✅ Quản lý sản phẩm, đơn hàng, người dùng một cách hiệu quả
- ✅ Bảo mật thông tin và xác thực người dùng

---

## ✨ TÍNH NĂNG CHÍNH

### 🔐 Xác Thực & Phân Quyền
- Đăng ký, đăng nhập người dùng
- Xác thực bằng JWT (JSON Web Token)
- Phân quyền User & Admin
- Quên mật khẩu và gửi email xác thực

### 🛍️ Quản Lý Sản Phẩm
- CRUD sản phẩm (Tạo, Đọc, Cập nhật, Xóa)
- Phân loại theo danh mục (Nhẫn, Dây chuyền, Lắc tay, Hoa tai)
- Upload hình ảnh sản phẩm (Cloudinary)
- Quản lý kho hàng (stock)
- Flash sale & giảm giá

### 🛒 Giỏ Hàng & Đơn Hàng
- Thêm, sửa, xóa sản phẩm trong giỏ hàng
- Tạo đơn hàng
- Theo dõi trạng thái đơn hàng
- Lịch sử mua hàng

### 💳 Thanh Toán
- Thanh toán online qua Stripe
- Thanh toán khi nhận hàng (COD)
- Webhook xử lý thanh toán tự động

### ⭐ Đánh Giá & Yêu Thích
- Đánh giá sản phẩm (rating 1-5 sao)
- Viết review chi tiết
- Danh sách sản phẩm yêu thích (Wishlist)

### 👑 Quản Trị Viên (Admin)
- Dashboard thống kê doanh thu, đơn hàng, người dùng
- Quản lý người dùng
- Quản lý đơn hàng (cập nhật trạng thái, shipping)
- Quản lý sản phẩm (CRUD, bulk update)
- Quản lý khuyến mãi (Promotions)
- Xem log hoạt động admin

### 📦 Khác
- Bộ sưu tập sản phẩm (Collections)
- Chương trình khuyến mãi (Promos)
- Gửi email thông báo
- API Documentation đầy đủ

---

## 🚀 CÔNG NGHỆ SỬ DỤNG

### Backend Framework & Runtime
- **Node.js** v18+ - JavaScript runtime
- **Express.js** v5.x - Web framework
- **Mongoose** v8.x - MongoDB ODM

### Database
- **MongoDB** - NoSQL database
- **MongoDB Atlas** - Cloud database (optional)

### Authentication & Security
- **JWT (jsonwebtoken)** - Token-based authentication
- **bcryptjs** - Password hashing
- **helmet** - HTTP headers security
- **express-rate-limit** - Rate limiting
- **express-mongo-sanitize** - NoSQL injection prevention
- **xss-clean** - XSS protection
- **hpp** - HTTP Parameter Pollution prevention

### Payment & Storage
- **Stripe** - Payment gateway
- **Cloudinary** - Image storage & CDN
- **Multer** - File upload handling

### Email
- **Nodemailer** - Email sending
- **Gmail SMTP** - Email service

### Development Tools
- **dotenv** - Environment variables
- **cors** - Cross-Origin Resource Sharing
- **morgan** - HTTP request logger
- **nodemon** - Auto-restart server (dev)

### Testing
- **Postman** - API testing
- **Jest** (optional) - Unit testing

---

## 📋 YÊU CẦU HỆ THỐNG

Trước khi bắt đầu, đảm bảo máy tính của bạn đã cài đặt:

- ✅ **Node.js** phiên bản 14.x trở lên → [Tải tại đây](https://nodejs.org/)
- ✅ **MongoDB** (có thể dùng local hoặc MongoDB Atlas) → [Hướng dẫn cài đặt](https://www.mongodb.com/try/download/community)
- ✅ **Git** → [Tải tại đây](https://git-scm.com/)
- ✅ **Postman** (để test API) → [Tải tại đây](https://www.postman.com/downloads/)
- ✅ Tài khoản **Cloudinary** (miễn phí) → [Đăng ký](https://cloudinary.com/users/register/free)
- ✅ Tài khoản **Stripe** (test mode) → [Đăng ký](https://stripe.com/)

---

## 🔧 HƯỚNG DẪN CÀI ĐẶT

### Bước 1: Clone Repository

```bash
# Clone dự án về máy
git clone https://github.com/Bao2k5/Thuongmaidientu.git

# Di chuyển vào thư mục dự án
cd Thuongmaidientu
```

### Bước 2: Cài Đặt Dependencies

```bash
# Cài đặt tất cả packages cần thiết
npm install
```

### Bước 3: Cấu Hình Biến Môi Trường

1. **Tạo file `.env`** trong thư mục gốc của dự án:

```bash
# Windows
copy .env.example .env

# Linux/Mac
cp .env.example .env
```

2. **Mở file `.env`** và điền thông tin:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/thuongmaidientu
# Hoặc dùng MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/thuongmaidientu

# JWT Secret (phải dài tối thiểu 32 ký tự)
JWT_SECRET=jewelry-bthn-secret-key-super-secure-2025-project
JWT_EXPIRES_IN=7d

# Cloudinary (lấy từ dashboard.cloudinary.com)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Stripe Payment (lấy từ dashboard.stripe.com/test/apikeys)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Email Configuration (Gmail App Password)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
```

### Bước 4: Khởi Tạo Dữ Liệu Mẫu

```bash
# Tạo admin account và dữ liệu mẫu
npm run seed
```

**Tài khoản Admin mặc định:**
- Email: `admin@example.com`
- Password: `admin123`

### Bước 5: Khởi Động Server

```bash
# Chạy server (production mode)
npm start

# Hoặc chạy với auto-reload (development mode)
npm run dev
```

Server sẽ chạy tại: **http://localhost:3000**

### Bước 6: Test API với Postman

1. Mở Postman
2. Import file `postman_collection.json` từ thư mục gốc
3. Đọc hướng dẫn chi tiết tại [POSTMAN_TESTING_GUIDE.md](./POSTMAN_TESTING_GUIDE.md)

---

## 📁 CẤU TRÚC THỦ MỤC

```
Thuongmaidientu/
│
├── BE/                          # Backend source code
│   ├── server.js               # Entry point - khởi động server
│   └── src/
│       ├── app.js              # Express app configuration
│       ├── config/
│       │   └── db.js           # MongoDB connection
│       ├── models/             # Mongoose models (8 models)
│       │   ├── user.model.js
│       │   ├── product.model.js
│       │   ├── cart.model.js
│       │   ├── order.model.js
│       │   ├── review.model.js
│       │   ├── collection.model.js
│       │   ├── promo.model.js
│       │   └── adminLog.model.js
│       ├── controllers/        # Business logic
│       │   ├── auth.controller.js
│       │   ├── product.controller.js
│       │   ├── cart.controller.js
│       │   ├── order.controller.js
│       │   ├── payment.controller.js
│       │   ├── review.controller.js
│       │   ├── user.controller.js
│       │   ├── wishlist.controller.js
│       │   ├── collection.controller.js
│       │   ├── promo.controller.js
│       │   └── admin.controller.js
│       ├── routes/             # API routes
│       │   ├── index.js        # Route aggregator
│       │   ├── auth.routes.js
│       │   ├── product.routes.js
│       │   ├── cart.routes.js
│       │   ├── order.routes.js
│       │   ├── review.routes.js
│       │   ├── user.routes.js
│       │   ├── collection.routes.js
│       │   ├── promo.routes.js
│       │   └── admin.routes.js
│       ├── middleware/         # Custom middleware
│       │   ├── auth.middleware.js      # JWT verification
│       │   ├── validate.middleware.js  # Input validation
│       │   └── security.middleware.js  # Security headers
│       └── utils/              # Helper functions
│           ├── cloudinary.js   # Image upload
│           ├── mailer.js       # Email sending
│           └── helpers.js      # Utility functions
│
├── scripts/                    # Utility scripts
│   ├── seed.js                # Database seeding
│   ├── check_admin.js         # Check admin account
│   ├── invoke_login_direct.js # Test login
│   └── smoke_test.js          # API smoke test
│
├── tests/                      # Test files
│   └── auth.test.js
│
├── .env.example               # Environment variables template
├── .gitignore                 # Git ignore rules
├── package.json               # NPM dependencies
├── postman_collection.json    # Postman API collection
├── README.md                  # Documentation (file này)
├── POSTMAN_TESTING_GUIDE.md   # Hướng dẫn test API
└── IMPROVEMENTS.md            # Lịch sử cập nhật

```

---

## 🎮 CÁC LỆNH HỮU ÍCH

```bash
# Khởi động server
npm start                    # Production mode
npm run dev                  # Development mode (auto-reload)

# Database
npm run seed                 # Tạo dữ liệu mẫu
npm run check-admin          # Kiểm tra tài khoản admin

# Testing
npm test                     # Chạy tests
npm run smoke-test           # Test API cơ bản

# Khác
npm run login-test           # Test đăng nhập
```

---

## 📚 TÀI LIỆU HƯỚNG DẪN

- 📖 **[POSTMAN_TESTING_GUIDE.md](./POSTMAN_TESTING_GUIDE.md)** - Hướng dẫn test API chi tiết
- 📖 **[IMPROVEMENTS.md](./IMPROVEMENTS.md)** - Lịch sử cập nhật và cải tiến
- 📖 **[API Endpoints](#-api-endpoints)** - Danh sách API endpoints

---

## 🔗 API ENDPOINTS

### 🔐 Authentication (`/api/auth`)
- `POST /api/auth/register` - Đăng ký tài khoản
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/forgot-password` - Quên mật khẩu

### 📦 Products (`/api/products`)
- `GET /api/products` - Lấy danh sách sản phẩm
- `GET /api/products/:id` - Chi tiết sản phẩm
- `GET /api/products/slug/:slug` - Lấy sản phẩm theo slug
- `POST /api/products` - Tạo sản phẩm (Admin)
- `PUT /api/products/:id` - Cập nhật sản phẩm (Admin)
- `DELETE /api/products/:id` - Xóa sản phẩm (Admin)

### 🛒 Cart (`/api/cart`)
- `GET /api/cart` - Xem giỏ hàng
- `POST /api/cart` - Thêm vào giỏ
- `PUT /api/cart` - Cập nhật số lượng
- `DELETE /api/cart` - Xóa giỏ hàng

### 🧾 Orders (`/api/orders`)
- `GET /api/orders` - Danh sách đơn hàng của tôi
- `GET /api/orders/:id` - Chi tiết đơn hàng
- `POST /api/orders` - Tạo đơn hàng
- `POST /api/orders/:id/pay` - Thanh toán COD
- `POST /api/orders/create-payment-intent` - Tạo thanh toán Stripe

### 👤 User (`/api/users`)
- `GET /api/users/profile` - Thông tin cá nhân
- `PUT /api/users/profile` - Cập nhật profile
- `GET /api/users/wishlist` - Danh sách yêu thích
- `POST /api/users/wishlist/:productId` - Thêm vào wishlist

### ⭐ Reviews (`/api/products/:id/reviews`)
- `GET /api/products/:id/reviews` - Xem đánh giá
- `POST /api/products/:id/reviews` - Viết đánh giá

### 👑 Admin (`/api/admin`)
- `GET /api/admin/stats` - Thống kê dashboard
- `GET /api/admin/users` - Danh sách user
- `GET /api/admin/orders` - Danh sách đơn hàng
- `PUT /api/admin/orders/:id/status` - Cập nhật trạng thái đơn
- `POST /api/admin/products/bulk-update` - Cập nhật nhiều sản phẩm

**Xem đầy đủ:** [POSTMAN_TESTING_GUIDE.md](./POSTMAN_TESTING_GUIDE.md)

---

## 🐛 GỠ LỖI (TROUBLESHOOTING)

### ❌ Lỗi kết nối MongoDB

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Giải pháp:**
1. Kiểm tra MongoDB đã chạy chưa:
   ```bash
   # Windows
   net start MongoDB
   
   # Linux/Mac
   sudo systemctl start mongod
   ```
2. Hoặc dùng MongoDB Atlas (cloud database)

### ❌ Lỗi JWT Secret

```
Error: JWT_SECRET must be at least 32 characters
```

**Giải pháp:** Đổi `JWT_SECRET` trong `.env` thành chuỗi dài hơn 32 ký tự

### ❌ Lỗi Cloudinary upload

```
Error: Invalid API key
```

**Giải pháp:** Kiểm tra lại thông tin Cloudinary trong `.env`

### ❌ Lỗi Stripe webhook

```
Error: No signatures found matching the expected signature
```

**Giải pháp:** 
1. Cài Stripe CLI
2. Chạy: `stripe listen --forward-to localhost:3000/api/orders/webhook`
3. Copy webhook secret vào `.env`

### ❌ Port 3000 đã được sử dụng

```
Error: listen EADDRINUSE: address already in use :::3000
```

**Giải pháp:** Đổi `PORT` trong `.env` thành port khác (ví dụ: 5000)

---

## 🤝 ĐÓNG GÓP

Dự án này được phát triển bởi **Nhóm 2** cho môn **Thương Mại Điện Tử**.

Nếu bạn muốn đóng góp:
1. Fork repository
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit thay đổi (`git commit -m 'Add some AmazingFeature'`)
4. Push lên branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

---

## 📞 LIÊN HỆ & HỖ TRỢ

- 📧 **Email nhóm:** bao2k5@example.com
- 🐙 **GitHub:** [https://github.com/Bao2k5/Thuongmaidientu](https://github.com/Bao2k5/Thuongmaidientu)
- 📝 **Issues:** [https://github.com/Bao2k5/Thuongmaidientu/issues](https://github.com/Bao2k5/Thuongmaidientu/issues)

---

## 📄 GIẤY PHÉP (LICENSE)

MIT License - Xem file [LICENSE](LICENSE) để biết thêm chi tiết.

---

## 🙏 LỜI CẢM ƠN

- Cảm ơn **thầy/cô giáo** đã hướng dẫn trong suốt quá trình thực hiện đồ án
- Cảm ơn các bạn trong nhóm đã cùng nhau hoàn thành dự án
- Cảm ơn các nguồn tài liệu và cộng đồng open source

---

<div align="center">

### ⭐ Nếu thấy dự án hữu ích, hãy cho chúng mình một ngôi sao nhé! ⭐

**Made with ❤️ by Nhóm 2 - Jewelry BTHN**

![Footer](https://img.shields.io/badge/Node.js-Backend-green?style=for-the-badge)
![Footer](https://img.shields.io/badge/MongoDB-Database-brightgreen?style=for-the-badge)
![Footer](https://img.shields.io/badge/Express-Framework-lightgrey?style=for-the-badge)

**© 2025 Jewelry BTHN - Đồ Án Thương Mại Điện Tử**

</div>
