# CÁC CHỨC NĂNG CỦA HỆ THỐNG BTHN JEWELRY

## 📋 MỤC LỤC

1. [Chức năng người dùng](#chức-năng-người-dùng)
2. [Chức năng admin](#chức-năng-admin)
3. [Chức năng chung](#chức-năng-chung)
4. [API Endpoints](#api-endpoints)

---

## 👤 CHỨC NĂNG NGƯỜI DÙNG

### 1. Xác thực & Tài khoản

- ✅ **Đăng ký tài khoản mới**
  - Nhập thông tin: Họ tên, Email, Mật khẩu
  - Xác thực email tự động
  - Mã hóa mật khẩu bằng bcrypt
- ✅ **Đăng nhập**
  - Đăng nhập bằng Email và Mật khẩu
  - Hệ thống JWT token authentication
  - Tự động redirect theo role (User → Trang chủ, Admin → Dashboard)
  - Ghi nhớ đăng nhập (localStorage)
- ✅ **Quản lý tài khoản**
  - Xem thông tin cá nhân
  - Cập nhật thông tin: Tên, Email, Số điện thoại, Địa chỉ
  - Đổi mật khẩu
  - Quên mật khẩu (reset qua email)

### 2. Quản lý sản phẩm & Mua sắm

- ✅ **Xem danh sách sản phẩm**
  - Hiển thị tất cả sản phẩm với hình ảnh, giá, mô tả
  - Phân trang sản phẩm
  - Sắp xếp theo: Giá, Tên, Mới nhất
  - Lọc theo: Danh mục, Chất liệu, Khoảng giá
- ✅ **Chi tiết sản phẩm**
  - Xem thông tin chi tiết: Mô tả, Giá, Chất liệu, Thông số kỹ thuật
  - Xem hình ảnh sản phẩm (gallery)
  - Xem đánh giá và nhận xét
  - Quick view (xem nhanh) không cần chuyển trang
- ✅ **Giỏ hàng (Cart)**
  - Thêm sản phẩm vào giỏ hàng
  - Xóa sản phẩm khỏi giỏ hàng
  - Cập nhật số lượng sản phẩm
  - Tính tổng tiền tự động
  - Lưu giỏ hàng vào database (đăng nhập) hoặc localStorage (chưa đăng nhập)
- ✅ **Danh sách yêu thích (Wishlist)**
  - Thêm sản phẩm vào danh sách yêu thích
  - Xóa sản phẩm khỏi danh sách yêu thích
  - Toggle wishlist bằng nút tim trên product card
  - Xem tất cả sản phẩm yêu thích
  - Chuyển nhanh từ wishlist sang giỏ hàng

### 3. Đặt hàng & Thanh toán

- ✅ **Đặt hàng (Checkout)**
  - Nhập thông tin giao hàng: Họ tên, Địa chỉ, SĐT
  - Chọn phương thức thanh toán:
    - COD (Thanh toán khi nhận hàng)
    - Online Banking (Chuyển khoản)
    - Credit Card (Thẻ tín dụng - Stripe)
  - Xem lại đơn hàng trước khi đặt
  - Áp dụng mã giảm giá (promo code)
- ✅ **Quản lý đơn hàng**
  - Xem lịch sử đơn hàng
  - Xem chi tiết từng đơn hàng
  - Theo dõi trạng thái đơn hàng:
    - Pending (Chờ xử lý)
    - Processing (Đang xử lý)
    - Shipping (Đang giao)
    - Completed (Hoàn thành)
    - Cancelled (Đã hủy)
  - Hủy đơn hàng (nếu còn ở trạng thái Pending)

### 4. Đánh giá & Nhận xét

- ✅ **Đánh giá sản phẩm**
  - Viết đánh giá cho sản phẩm đã mua
  - Chọn số sao (1-5 sao)
  - Viết nhận xét chi tiết
  - Xem đánh giá của người dùng khác

### 5. Bộ sưu tập (Collections)

- ✅ **Xem bộ sưu tập**
  - Duyệt các bộ sưu tập trang sức
  - Xem sản phẩm theo từng bộ sưu tập
  - Filter sản phẩm trong bộ sưu tập

### 6. Liên hệ

- ✅ **Form liên hệ**
  - Gửi tin nhắn đến admin
  - Nhập: Họ tên, Email, Tiêu đề, Nội dung
  - Nhận email xác nhận sau khi gửi

---

## 👨‍💼 CHỨC NĂNG ADMIN

### 1. Dashboard (Tổng quan)

- ✅ **Thống kê tổng quan**
  - Tổng doanh thu
  - Tổng số đơn hàng
  - Tổng số sản phẩm
  - Tổng số người dùng
- ✅ **Biểu đồ & Báo cáo**
  - Danh sách đơn hàng gần đây
  - Top sản phẩm bán chạy
  - Thống kê theo thời gian

### 2. Quản lý sản phẩm

- ✅ **Xem danh sách sản phẩm**
  - Hiển thị tất cả sản phẩm trong table
  - Tìm kiếm sản phẩm
  - Phân trang
- ✅ **Thêm sản phẩm mới**
  - Nhập thông tin: Tên, Slug, Giá, Giá sale, Danh mục
  - Upload hình ảnh (Cloudinary)
  - Nhập mô tả chi tiết
  - Chọn chất liệu (Vàng, Bạc, Kim cương, v.v.)
  - Nhập số lượng tồn kho
  - Thông số kỹ thuật (specifications)
- ✅ **Chỉnh sửa sản phẩm**
  - Cập nhật thông tin sản phẩm
  - Thay đổi hình ảnh
  - Cập nhật giá và tồn kho
- ✅ **Xóa sản phẩm**
  - Xóa sản phẩm khỏi hệ thống
  - Xác nhận trước khi xóa

### 3. Quản lý đơn hàng

- ✅ **Xem danh sách đơn hàng**
  - Hiển thị tất cả đơn hàng
  - Filter theo trạng thái
  - Tìm kiếm đơn hàng
  - Phân trang
- ✅ **Xem chi tiết đơn hàng**
  - Thông tin khách hàng
  - Danh sách sản phẩm trong đơn
  - Địa chỉ giao hàng
  - Phương thức thanh toán
  - Tổng tiền
- ✅ **Cập nhật trạng thái đơn hàng**
  - Chuyển trạng thái: Pending → Processing → Shipping → Completed
  - Hủy đơn hàng (Cancelled)
  - Gửi email thông báo tự động khi đổi trạng thái

### 4. Quản lý người dùng

- ✅ **Xem danh sách người dùng**
  - Hiển thị tất cả user
  - Thông tin: Tên, Email, Role, Ngày tạo
  - Trạng thái xác thực email
- ✅ **Quản lý phân quyền**
  - Thay đổi role: User → Admin → Seller
  - Khóa/Mở khóa tài khoản
- ✅ **Xem hoạt động người dùng**
  - Lịch sử đơn hàng của user
  - Số lượng đơn hàng
  - Tổng chi tiêu

### 5. Quản lý mã giảm giá (Promo Codes)

- ✅ **Tạo mã giảm giá**
  - Nhập code (mã)
  - Chọn loại giảm giá: Percentage (%) hoặc Fixed (VNĐ)
  - Nhập giá trị giảm
  - Đặt ngày bắt đầu và kết thúc
  - Giới hạn số lần sử dụng
- ✅ **Quản lý mã giảm giá**
  - Xem danh sách mã
  - Sửa mã
  - Xóa mã
  - Vô hiệu hóa mã

### 6. Quản lý bộ sưu tập

- ✅ **Tạo bộ sưu tập**
  - Tên bộ sưu tập
  - Slug
  - Mô tả
  - Hình ảnh đại diện
- ✅ **Quản lý bộ sưu tập**
  - Sửa thông tin
  - Xóa bộ sưu tập
  - Gán sản phẩm vào bộ sưu tập

### 7. Admin Logs (Nhật ký hoạt động)

- ✅ **Ghi log tự động**
  - Ghi lại mọi thao tác của admin
  - Thời gian thực hiện
  - IP address
  - Action type (Create, Update, Delete)
- ✅ **Xem lịch sử log**
  - Filter theo admin
  - Filter theo thời gian
  - Filter theo action type

---

## ⚙️ CHỨC NĂNG CHUNG

### 1. Security (Bảo mật)

- ✅ **JWT Authentication**
  - Token-based authentication
  - Refresh token
  - Token expiration
- ✅ **Password Encryption**
  - Mã hóa mật khẩu bằng bcrypt
  - Salt rounds: 10
- ✅ **Rate Limiting**
  - Giới hạn số request/IP
  - Ngăn chặn brute force attack
- ✅ **CORS Protection**
  - Chỉ cho phép domain được cấu hình
- ✅ **Helmet Security Headers**
  - XSS Protection
  - Content Security Policy
  - HSTS

### 2. Email Service

- ✅ **Gửi email tự động**
  - Email xác nhận đăng ký
  - Email reset mật khẩu
  - Email xác nhận đơn hàng
  - Email cập nhật trạng thái đơn hàng
  - Email liên hệ

### 3. File Upload

- ✅ **Upload hình ảnh**
  - Upload lên Cloudinary
  - Tự động resize và optimize
  - Generate thumbnail
  - Xóa ảnh cũ khi update

### 4. Search & Filter

- ✅ **Tìm kiếm**
  - Tìm kiếm sản phẩm theo tên
  - Tìm kiếm trong mô tả
  - Tìm kiếm đơn hàng
- ✅ **Filter & Sort**
  - Filter theo nhiều tiêu chí
  - Sort theo giá, tên, ngày
  - Pagination

### 5. Responsive Design

- ✅ **Mobile Friendly**
  - Responsive trên mọi thiết bị
  - Touch-friendly interface
  - Mobile menu
- ✅ **Desktop Optimized**
  - Layout tối ưu cho desktop
  - Sidebar navigation cho admin
  - Quick actions

### 6. UI/UX Features

- ✅ **Loading States**
  - Skeleton loading
  - Spinner loading
  - Progress bars
- ✅ **Error Handling**
  - User-friendly error messages
  - Validation messages
  - Toast notifications
- ✅ **Modals & Popups**
  - Confirmation dialogs
  - Quick view modals
  - Form modals

### 7. Chat Support

- ✅ **Zalo Chat Integration**
  - Widget chat Zalo
  - Hỗ trợ trực tuyến
  - Nút chat cố định

---

## 🔌 API ENDPOINTS

### Authentication

```
POST   /api/auth/register          - Đăng ký tài khoản
POST   /api/auth/login             - Đăng nhập
POST   /api/auth/forgot-password   - Quên mật khẩu
POST   /api/auth/reset-password    - Reset mật khẩu
GET    /api/auth/me                - Lấy thông tin user hiện tại
```

### Products

```
GET    /api/products               - Lấy danh sách sản phẩm
GET    /api/products/:id           - Lấy chi tiết sản phẩm
POST   /api/products               - Tạo sản phẩm mới (Admin)
PUT    /api/products/:id           - Cập nhật sản phẩm (Admin)
DELETE /api/products/:id           - Xóa sản phẩm (Admin)
```

### Cart

```
GET    /api/cart                   - Lấy giỏ hàng
POST   /api/cart                   - Thêm vào giỏ hàng
PUT    /api/cart/:itemId           - Cập nhật số lượng
DELETE /api/cart/:itemId           - Xóa khỏi giỏ hàng
DELETE /api/cart                   - Xóa toàn bộ giỏ hàng
```

### Wishlist

```
GET    /api/users/wishlist         - Lấy danh sách yêu thích
POST   /api/users/wishlist         - Thêm vào wishlist
DELETE /api/users/wishlist/:id     - Xóa khỏi wishlist
```

### Orders

```
GET    /api/orders                 - Lấy đơn hàng của user
GET    /api/orders/:id             - Chi tiết đơn hàng
POST   /api/orders                 - Tạo đơn hàng mới
PUT    /api/orders/:id/cancel      - Hủy đơn hàng
```

### Admin

```
GET    /api/admin/stats            - Thống kê tổng quan
GET    /api/admin/orders           - Quản lý đơn hàng
PUT    /api/admin/orders/:id       - Cập nhật trạng thái đơn
GET    /api/admin/users            - Quản lý người dùng
PUT    /api/admin/users/:id        - Cập nhật user
```

### Reviews

```
GET    /api/reviews/product/:id    - Lấy đánh giá sản phẩm
POST   /api/reviews                - Tạo đánh giá
PUT    /api/reviews/:id            - Sửa đánh giá
DELETE /api/reviews/:id            - Xóa đánh giá
```

### Collections

```
GET    /api/collections            - Lấy danh sách bộ sưu tập
GET    /api/collections/:slug      - Chi tiết bộ sưu tập
POST   /api/collections            - Tạo bộ sưu tập (Admin)
PUT    /api/collections/:id        - Cập nhật (Admin)
DELETE /api/collections/:id        - Xóa (Admin)
```

### Promo Codes

```
GET    /api/promo                  - Lấy danh sách mã
POST   /api/promo/validate         - Validate mã giảm giá
POST   /api/promo                  - Tạo mã (Admin)
PUT    /api/promo/:id              - Cập nhật mã (Admin)
DELETE /api/promo/:id              - Xóa mã (Admin)
```

### Payments

```
POST   /api/payment/stripe         - Thanh toán qua Stripe
POST   /api/payment/webhook        - Webhook từ payment gateway
```

---

## 📊 THỐNG KÊ HỆ THỐNG

### Frontend

- **Framework**: React 18.3.1 + Vite 5.4.20
- **Styling**: TailwindCSS 3.4.1
- **State Management**: Zustand
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Total Pages**: 15+ pages
- **Total Components**: 30+ components

### Backend

- **Runtime**: Node.js v22.13.1
- **Framework**: Express.js v5.1.0
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + bcryptjs
- **File Upload**: Cloudinary
- **Email**: Nodemailer
- **Payment**: Stripe
- **Total Routes**: 50+ endpoints
- **Total Models**: 8 models

### Security

- ✅ JWT Authentication
- ✅ Password Hashing (bcrypt)
- ✅ Rate Limiting
- ✅ CORS Protection
- ✅ Helmet Security Headers
- ✅ Input Validation
- ✅ XSS Protection
- ✅ SQL Injection Protection

---

## 🚀 TÍNH NĂNG NỔI BẬT

1. **Admin Dashboard hoàn chỉnh** với quản lý sản phẩm, đơn hàng, user
2. **Wishlist system** với tích hợp heart button trên product cards
3. **Real-time cart updates** với Zustand state management
4. **Responsive design** tương thích mọi thiết bị
5. **Email notifications** tự động cho mọi hành động quan trọng
6. **Security-first approach** với nhiều lớp bảo mật
7. **RESTful API** với đầy đủ CRUD operations
8. **Image optimization** tự động với Cloudinary
9. **Payment integration** với Stripe và COD
10. **Promo code system** linh hoạt và dễ quản lý

---

## 📝 GHI CHÚ

- Tất cả API đều có error handling và validation
- Database có indexes tối ưu cho performance
- Frontend có loading states và error handling
- Admin panel có role-based access control
- Hệ thống có logging cho debugging và audit

**Thông tin đăng nhập Admin:**

- Email: `admin@example.com`
- Password: `admin123`

**Backend URL:** http://localhost:3000
**Frontend URL:** http://localhost:5174

---

_Tài liệu này được cập nhật lần cuối: 10/10/2025_
