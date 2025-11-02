# 👥 TÍNH NĂNG NGƯỜI DÙNG - Jewelry BTHN

Tài liệu này chi tiết tất cả các chức năng có sẵn cho người dùng thông thường (User) trong hệ thống Jewelry BTHN.

---

## 📋 MỤC LỤC

1. [Xác Thực & Tài Khoản](#-xác-thực--tài-khoản)
2. [Quản Lý Hồ Sơ](#-quản-lý-hồ-sơ)
3. [Duyệt & Tìm Kiếm Sản Phẩm](#-duyệt--tìm-kiếm-sản-phẩm)
4. [Giỏ Hàng](#-giỏ-hàng)
5. [Đặt Hàng](#-đặt-hàng)
6. [Danh Sách Yêu Thích (Wishlist)](#-danh-sách-yêu-thích-wishlist)
7. [Đánh Giá & Review](#-đánh-giá--review)
8. [Lịch Sử Mua Hàng](#-lịch-sử-mua-hàng)

---

## 🔐 XÁC THỰC & TÀI KHOẢN

### 1. Đăng Ký Tài Khoản

**Mục đích**: Tạo tài khoản mới để sử dụng dịch vụ

**Thông tin cần cung cấp**:

- Tên đầy đủ (Name)
- Email
- Mật khẩu (tối thiểu 6 ký tự)

**Endpoint**: `POST /api/auth/register`

**Request Body**:

```json
{
  "name": "Nguyễn Văn A",
  "email": "user@example.com",
  "password": "password123"
}
```

**Response**:

```json
{
  "message": "Registered",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Nguyễn Văn A",
    "email": "user@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Ghi chú**:

- Mật khẩu được mã hóa bằng bcrypt
- Email không được trùng lặp
- Token JWT tự động trả về để đăng nhập

---

### 2. Đăng Nhập

**Mục đích**: Truy cập vào tài khoản đã đăng ký

**Endpoint**: `POST /api/auth/login`

**Request Body**:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response**:

```json
{
  "message": "Login success",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Nguyễn Văn A",
    "email": "user@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Ghi chú**:

- Token JWT có hiệu lực 7 ngày
- Mỗi request cần kèm header: `Authorization: Bearer {token}`
- Token sẽ được lưu trữ trên phía client (localStorage/sessionStorage)

---

### 3. Quên Mật Khẩu

**Mục đích**: Reset mật khẩu khi quên

**Endpoint**: `POST /api/auth/forgot-password`

**Request Body**:

```json
{
  "email": "user@example.com"
}
```

**Response**:

```json
{
  "message": "Password reset link sent (simulate)"
}
```

**Ghi chú**:

- Hiện tại là chức năng mô phỏng
- Trong production sẽ gửi email xác nhận

---

## 👤 QUẢN LÝ HỒ SƠ

### 1. Xem Thông Tin Hồ Sơ

**Mục đích**: Xem thông tin tài khoản của mình

**Endpoint**: `GET /api/users/profile`

**Header**:

```
Authorization: Bearer {token}
```

**Response**:

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Nguyễn Văn A",
  "email": "user@example.com",
  "address": "123 Nguyễn Huệ, Q.1, TP.HCM",
  "addresses": [
    {
      "fullName": "Nguyễn Văn A",
      "phone": "0901234567",
      "street": "123 Nguyễn Huệ",
      "ward": "Bến Nghé",
      "district": "Quận 1",
      "city": "TP. Hồ Chí Minh"
    }
  ],
  "role": "user",
  "createdAt": "2025-01-15T10:30:00Z"
}
```

---

### 2. Cập Nhật Thông Tin Hồ Sơ

**Mục đích**: Thay đổi thông tin cá nhân (tên, địa chỉ, ...)

**Endpoint**: `PUT /api/users/profile`

**Request Body**:

```json
{
  "name": "Nguyễn Văn A",
  "address": "456 Trần Hưng Đạo, Q.1, TP.HCM"
}
```

**Response**:

```json
{
  "msg": "Profile updated"
}
```

---

### 3. Đổi Mật Khẩu

**Mục đích**: Thay đổi mật khẩu tài khoản

**Endpoint**: `POST /api/users/change-password`

**Request Body**:

```json
{
  "oldPassword": "password123",
  "newPassword": "newpassword456"
}
```

**Response**:

```json
{
  "msg": "Password changed"
}
```

**Ghi chú**:

- Phải nhập đúng mật khẩu cũ
- Mật khẩu mới sẽ được mã hóa

---

### 4. Quản Lý Địa Chỉ Giao Hàng

#### 4.1 Thêm Địa Chỉ Mới

**Endpoint**: `POST /api/users/addresses`

**Request Body**:

```json
{
  "fullName": "Nguyễn Văn A",
  "phone": "0901234567",
  "street": "123 Nguyễn Huệ",
  "ward": "Bến Nghé",
  "district": "Quận 1",
  "city": "TP. Hồ Chí Minh",
  "postalCode": "700000",
  "isDefault": true
}
```

**Response**:

```json
[
  {
    "fullName": "Nguyễn Văn A",
    "phone": "0901234567",
    "street": "123 Nguyễn Huệ",
    "ward": "Bến Nghé",
    "district": "Quận 1",
    "city": "TP. Hồ Chí Minh",
    "postalCode": "700000",
    "isDefault": true
  }
]
```

---

#### 4.2 Cập Nhật Địa Chỉ

**Endpoint**: `PUT /api/users/addresses/:index`

**Request Body**:

```json
{
  "fullName": "Nguyễn Văn B",
  "phone": "0909876543"
}
```

**Response**: Danh sách địa chỉ được cập nhật

---

#### 4.3 Xóa Địa Chỉ

**Endpoint**: `DELETE /api/users/addresses/:index`

**Response**: Danh sách địa chỉ sau khi xóa

**Ghi chú**:

- `:index` là vị trí của địa chỉ trong mảng (0, 1, 2, ...)

---

## 🏪 DUYỆT & TÌM KIẾM SẢN PHẨM

### 1. Danh Sách Sản Phẩm

**Mục đích**: Xem danh sách tất cả sản phẩm có sẵn

**Endpoint**: `GET /api/products`

**Query Parameters**:

- `page` - Trang hiện tại (mặc định: 1)
- `limit` - Số sản phẩm trên mỗi trang (mặc định: 12)
- `q` - Từ khóa tìm kiếm (search theo tên)

**Ví dụ**:

```
GET /api/products?page=1&limit=12&q=nhẫn
```

**Response**:

```json
{
  "products": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Nhẫn Vàng 24K",
      "description": "Nhẫn vàng nguyên chất cao cấp",
      "price": 5000000,
      "priceSale": 4500000,
      "images": [
        {
          "url": "https://images.unsplash.com/photo-...",
          "public_id": "jewelry/ring-1"
        }
      ],
      "category": "Nhẫn",
      "stock": 10,
      "ratingsAvg": 4.5,
      "ratingsCount": 12
    }
  ],
  "total": 45,
  "page": 1,
  "pages": 4
}
```

---

### 2. Chi Tiết Sản Phẩm

**Mục đích**: Xem thông tin chi tiết một sản phẩm

**Endpoint**: `GET /api/products/:id`

**Response**:

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Nhẫn Vàng 24K",
  "description": "Nhẫn vàng nguyên chất cao cấp, thiết kế tinh tế, màu sắc đẹp mắt",
  "price": 5000000,
  "priceSale": 4500000,
  "images": [
    {
      "url": "https://images.unsplash.com/photo-1...",
      "public_id": "jewelry/ring-1"
    },
    {
      "url": "https://images.unsplash.com/photo-2...",
      "public_id": "jewelry/ring-2"
    }
  ],
  "category": "Nhẫn",
  "material": "Vàng 24K",
  "weight": "3.5g",
  "stock": 10,
  "ratingsAvg": 4.5,
  "ratingsCount": 12,
  "createdAt": "2025-01-10T08:00:00Z"
}
```

---

### 3. Tìm Kiếm Sản Phẩm

**Mục đích**: Tìm kiếm sản phẩm theo từ khóa

**Endpoint**: `GET /api/products?q=từ_khóa`

**Ví dụ**:

```
GET /api/products?q=vàng&page=1&limit=20
```

**Ghi chú**:

- Tìm kiếm không phân biệt chữ hoa/thường
- Tìm kiếm theo tên sản phẩm

---

## 🛒 GIỎ HÀNG

### 1. Xem Giỏ Hàng

**Mục đích**: Xem các sản phẩm trong giỏ hàng của mình

**Endpoint**: `GET /api/cart`

**Header**:

```
Authorization: Bearer {token}
```

**Response**:

```json
{
  "_id": "507f1f77bcf86cd799439012",
  "user": "507f1f77bcf86cd799439011",
  "items": [
    {
      "product": {
        "_id": "507f1f77bcf86cd799439020",
        "name": "Nhẫn Vàng 24K",
        "price": 5000000,
        "priceSale": 4500000,
        "images": [{ "url": "..." }]
      },
      "qty": 2
    }
  ],
  "updatedAt": "2025-01-15T14:20:00Z"
}
```

---

### 2. Thêm Sản Phẩm Vào Giỏ

**Mục đích**: Thêm sản phẩm vào giỏ hàng

**Endpoint**: `POST /api/cart`

**Request Body**:

```json
{
  "productId": "507f1f77bcf86cd799439020",
  "qty": 1
}
```

**Response**: Thông tin giỏ hàng được cập nhật

**Ghi chú**:

- Nếu sản phẩm đã có trong giỏ, số lượng sẽ được cộng thêm
- Nếu giỏ không tồn tại, giỏ mới sẽ được tạo

---

### 3. Cập Nhật Số Lượng Sản Phẩm

**Mục đích**: Thay đổi số lượng sản phẩm trong giỏ

**Endpoint**: `PUT /api/cart`

**Request Body**:

```json
{
  "productId": "507f1f77bcf86cd799439020",
  "qty": 3
}
```

**Response**: Thông tin giỏ hàng được cập nhật

**Ghi chú**:

- Nếu `qty = 0`, sản phẩm sẽ bị xóa khỏi giỏ
- Nếu `qty < 0`, sẽ trả lỗi

---

### 4. Xóa Giỏ Hàng

**Mục đích**: Làm trống toàn bộ giỏ hàng

**Endpoint**: `DELETE /api/cart`

**Response**:

```json
{
  "msg": "Cleared"
}
```

---

## 🛍️ ĐẶT HÀNG

### 1. Tạo Đơn Hàng

**Mục đích**: Tạo đơn hàng từ sản phẩm trong giỏ hàng

**Endpoint**: `POST /api/orders`

**Request Body**:

```json
{
  "address": "123 Nguyễn Huệ, Q.1, TP.HCM",
  "useStripe": false
}
```

**Response**:

```json
{
  "_id": "607f1f77bcf86cd799439030",
  "user": "507f1f77bcf86cd799439011",
  "items": [
    {
      "product": "507f1f77bcf86cd799439020",
      "qty": 2,
      "price": 4500000
    }
  ],
  "total": 9000000,
  "address": "123 Nguyễn Huệ, Q.1, TP.HCM",
  "status": "pending",
  "payment": {
    "method": "cod",
    "status": "unpaid"
  },
  "createdAt": "2025-01-15T15:00:00Z"
}
```

**Ghi chú**:

- `useStripe: false` = Thanh toán COD (Cash on Delivery - trả khi nhận hàng)
- `useStripe: true` = Thanh toán qua Stripe (thẻ tín dụng)
- Giỏ hàng sẽ được làm trống sau khi tạo đơn
- Stock sản phẩm sẽ giảm (nếu không phải Stripe)

---

### 2. Xem Lịch Sử Đơn Hàng

**Mục đích**: Xem danh sách tất cả đơn hàng của mình

**Endpoint**: `GET /api/orders`

**Header**:

```
Authorization: Bearer {token}
```

**Response**:

```json
[
  {
    "_id": "607f1f77bcf86cd799439030",
    "user": "507f1f77bcf86cd799439011",
    "items": [...],
    "total": 9000000,
    "status": "shipped",
    "payment": { "method": "cod", "status": "unpaid" },
    "createdAt": "2025-01-15T15:00:00Z"
  },
  {
    "_id": "607f1f77bcf86cd799439031",
    "user": "507f1f77bcf86cd799439011",
    "items": [...],
    "total": 3500000,
    "status": "delivered",
    "payment": { "method": "stripe", "status": "paid" },
    "createdAt": "2025-01-14T10:30:00Z"
  }
]
```

---

### 3. Chi Tiết Đơn Hàng

**Mục đích**: Xem thông tin chi tiết một đơn hàng

**Endpoint**: `GET /api/orders/:id`

**Response**:

```json
{
  "_id": "607f1f77bcf86cd799439030",
  "user": "507f1f77bcf86cd799439011",
  "items": [
    {
      "_id": "507f1f77bcf86cd799439040",
      "product": {
        "_id": "507f1f77bcf86cd799439020",
        "name": "Nhẫn Vàng 24K",
        "images": [{ "url": "..." }]
      },
      "qty": 2,
      "price": 4500000
    }
  ],
  "total": 9000000,
  "address": "123 Nguyễn Huệ, Q.1, TP.HCM",
  "status": "shipped",
  "payment": {
    "method": "cod",
    "status": "unpaid",
    "transactionId": "TXN-2025-001"
  },
  "createdAt": "2025-01-15T15:00:00Z",
  "updatedAt": "2025-01-15T16:30:00Z"
}
```

---

### 4. Trạng Thái Đơn Hàng

**Các trạng thái có thể gặp**:

| Trạng Thái  | Ý Nghĩa                            |
| ----------- | ---------------------------------- |
| `pending`   | Chưa xác nhận - chờ xử lý từ Admin |
| `confirmed` | Đã xác nhận - đang chuẩn bị hàng   |
| `shipped`   | Đã gửi - đang vận chuyển           |
| `delivered` | Đã giao - giao hàng thành công     |
| `cancelled` | Đã hủy                             |

---

### 5. Thanh Toán Mock (COD Test)

**Mục đích**: Mô phỏng thanh toán khi nhận hàng (cho test)

**Endpoint**: `POST /api/orders/:id/pay`

**Response**:

```json
{
  "_id": "607f1f77bcf86cd799439030",
  "status": "paid",
  "payment": {
    "method": "mock",
    "status": "paid",
    "transactionId": "MOCK-1705334400000"
  }
}
```

---

## ❤️ DANH SÁCH YÊU THÍCH (WISHLIST)

### 1. Xem Danh Sách Yêu Thích

**Mục đích**: Xem các sản phẩm đã lưu yêu thích

**Endpoint**: `GET /api/users/wishlist`

**Header**:

```
Authorization: Bearer {token}
```

**Response**:

```json
{
  "wishlist": [
    {
      "product": {
        "_id": "507f1f77bcf86cd799439020",
        "name": "Nhẫn Vàng 24K",
        "price": 5000000,
        "priceSale": 4500000,
        "images": [{ "url": "..." }],
        "ratingsAvg": 4.5
      }
    },
    {
      "product": {
        "_id": "507f1f77bcf86cd799439021",
        "name": "Dây Chuyền Bạc",
        "price": 800000,
        "priceSale": 700000,
        "images": [{ "url": "..." }],
        "ratingsAvg": 4.2
      }
    }
  ]
}
```

---

### 2. Thêm Vào Danh Sách Yêu Thích

**Mục đích**: Lưu sản phẩm yêu thích

**Endpoint**: `POST /api/users/wishlist`

**Request Body**:

```json
{
  "productId": "507f1f77bcf86cd799439020"
}
```

**Response**:

```json
{
  "message": "Added to wishlist",
  "wishlist": ["507f1f77bcf86cd799439020", "507f1f77bcf86cd799439021"]
}
```

**Ghi chú**:

- Một sản phẩm không được thêm 2 lần
- Nếu sản phẩm đã có trong wishlist, sẽ trả lỗi

---

### 3. Xóa Khỏi Danh Sách Yêu Thích

**Mục đích**: Bỏ sản phẩm khỏi wishlist

**Endpoint**: `DELETE /api/users/wishlist/:productId`

**Response**:

```json
{
  "message": "Removed from wishlist",
  "wishlist": ["507f1f77bcf86cd799439021"]
}
```

---

## ⭐ ĐÁNH GIÁ & REVIEW

### 1. Xem Đánh Giá Sản Phẩm

**Mục đích**: Xem các review và rating của sản phẩm

**Endpoint**: `GET /api/products/:productId/reviews`

**Response**:

```json
[
  {
    "_id": "507f1f77bcf86cd799439050",
    "product": "507f1f77bcf86cd799439020",
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Nguyễn Văn A"
    },
    "rating": 5,
    "title": "Sản phẩm rất đẹp",
    "text": "Chất lượng vàng rất tốt, màu sắc đúng như mô tả, giao hàng nhanh",
    "createdAt": "2025-01-14T10:00:00Z"
  },
  {
    "_id": "507f1f77bcf86cd799439051",
    "product": "507f1f77bcf86cd799439020",
    "user": {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Trần Thị B"
    },
    "rating": 4,
    "title": "Tốt, nhưng có thể tốt hơn",
    "text": "Sản phẩm chất lượng nhưng giá hơi mắc",
    "createdAt": "2025-01-13T15:30:00Z"
  }
]
```

---

### 2. Viết Đánh Giá

**Mục đích**: Để lại đánh giá/review cho sản phẩm

**Endpoint**: `POST /api/products/:productId/reviews`

**Header**:

```
Authorization: Bearer {token}
```

**Request Body**:

```json
{
  "rating": 5,
  "title": "Sản phẩm tuyệt vời",
  "text": "Nhẫn vàng này rất đẹp, chất lượng tốt, dáng đẹp. Mình rất hài lòng với lựa chọn này. Sẽ quay lại mua thêm."
}
```

**Response**:

```json
{
  "_id": "507f1f77bcf86cd799439052",
  "product": "507f1f77bcf86cd799439020",
  "user": "507f1f77bcf86cd799439011",
  "rating": 5,
  "title": "Sản phẩm tuyệt vời",
  "text": "Nhẫn vàng này rất đẹp, chất lượng tốt, dáng đẹp...",
  "createdAt": "2025-01-15T16:45:00Z"
}
```

**Ghi chú**:

- Rating từ 1-5 sao
- Mỗi user chỉ có thể đánh giá một sản phẩm 1 lần
- Nếu đã review rồi, sẽ không thể review lại (phải xóa cũ trước)

---

### 3. Xóa Đánh Giá

**Mục đích**: Xóa bình luận/đánh giá của mình

**Endpoint**: `DELETE /api/products/:productId/reviews/:reviewId`

**Response**:

```json
{
  "msg": "Deleted"
}
```

**Ghi chú**:

- Chỉ có thể xóa review của mình hoặc Admin có thể xóa bất kỳ review nào

---

### 4. Cập Nhật Đánh Giá Sản Phẩm (Tự động)

**Ghi chú**: Sau mỗi lần đánh giá hoặc xóa đánh giá, hệ thống sẽ:

- Tính lại trung bình rating sản phẩm (`ratingsAvg`)
- Cập nhật số lượng đánh giá (`ratingsCount`)

**Ví dụ**:

```json
{
  "product": "507f1f77bcf86cd799439020",
  "ratingsAvg": 4.7, // Trung bình 5 đánh giá
  "ratingsCount": 5 // Tổng số đánh giá
}
```

---

## 📦 LỊCH SỬ MUA HÀNG

### 1. Xem Tất Cả Đơn Hàng

**Mục đích**: Xem lịch sử tất cả các đơn hàng đã đặt

**Endpoint**: `GET /api/orders`

**Sắp xếp**: Đơn hàng mới nhất hiển thị trước

---

### 2. Chi Tiết Đơn Hàng

**Mục đích**: Xem chi tiết từng đơn hàng

**Endpoint**: `GET /api/orders/:id`

**Thông tin bao gồm**:

- Danh sách sản phẩm trong đơn
- Tổng tiền
- Địa chỉ giao hàng
- Trạng thái đơn hàng
- Phương thức thanh toán
- Thời gian đặt hàng

---

### 3. Trạng Thái Thanh Toán

**Các trạng thái**:

| Phương Thức | Trạng Thái | Ý Nghĩa                        |
| ----------- | ---------- | ------------------------------ |
| COD         | unpaid     | Chưa thanh toán (trả khi nhận) |
| COD         | paid       | Đã thanh toán khi nhận         |
| Stripe      | paid       | Đã thanh toán qua thẻ          |

---

## 📊 TÓNG HỢP CHỨC NĂNG

### Bảng Tóm Tắt Endpoints

| Method | Endpoint                         | Mô Tả              | Auth |
| ------ | -------------------------------- | ------------------ | ---- |
| POST   | `/api/auth/register`             | Đăng ký            | ✗    |
| POST   | `/api/auth/login`                | Đăng nhập          | ✗    |
| POST   | `/api/auth/forgot-password`      | Quên mật khẩu      | ✗    |
| GET    | `/api/users/profile`             | Xem hồ sơ          | ✓    |
| PUT    | `/api/users/profile`             | Cập nhật hồ sơ     | ✓    |
| POST   | `/api/users/change-password`     | Đổi mật khẩu       | ✓    |
| POST   | `/api/users/addresses`           | Thêm địa chỉ       | ✓    |
| PUT    | `/api/users/addresses/:index`    | Cập nhật địa chỉ   | ✓    |
| DELETE | `/api/users/addresses/:index`    | Xóa địa chỉ        | ✓    |
| GET    | `/api/products`                  | Danh sách sản phẩm | ✗    |
| GET    | `/api/products/:id`              | Chi tiết sản phẩm  | ✗    |
| GET    | `/api/cart`                      | Xem giỏ hàng       | ✓    |
| POST   | `/api/cart`                      | Thêm vào giỏ       | ✓    |
| PUT    | `/api/cart`                      | Cập nhật số lượng  | ✓    |
| DELETE | `/api/cart`                      | Xóa giỏ hàng       | ✓    |
| POST   | `/api/orders`                    | Tạo đơn hàng       | ✓    |
| GET    | `/api/orders`                    | Xem lịch sử đơn    | ✓    |
| GET    | `/api/orders/:id`                | Chi tiết đơn hàng  | ✓    |
| POST   | `/api/orders/:id/pay`            | Thanh toán mock    | ✓    |
| GET    | `/api/users/wishlist`            | Xem wishlist       | ✓    |
| POST   | `/api/users/wishlist`            | Thêm vào wishlist  | ✓    |
| DELETE | `/api/users/wishlist/:productId` | Xóa khỏi wishlist  | ✓    |
| GET    | `/api/products/:id/reviews`      | Xem đánh giá       | ✗    |
| POST   | `/api/products/:id/reviews`      | Viết đánh giá      | ✓    |
| DELETE | `/api/products/:id/reviews/:id`  | Xóa đánh giá       | ✓    |

---

## 🔒 BẢO MẬT & YÊU CẦU

### 1. Authentication (Xác Thực)

- Tất cả request cần header: `Authorization: Bearer {token}`
- Token JWT có hiệu lực 7 ngày
- Mật khẩu được mã hóa bcrypt

### 2. Phân Quyền (Authorization)

- **User**: Chỉ có thể xem/sửa dữ liệu của mình
- **Admin**: Có quyền truy cập và quản lý tất cả

### 3. Validate Input

- Email phải đúng định dạng
- Mật khẩu tối thiểu 6 ký tự
- Số lượng sản phẩm phải > 0

---

## 📱 TRẢI NGHIỆM NGƯỜI DÙNG (UI/UX)

### Trang Chính

- Hiển thị danh sách sản phẩm
- Tìm kiếm & lọc theo danh mục
- Xem giỏ hàng nhanh

### Trang Sản Phẩm

- Hiển thị hình ảnh (multiple images)
- Xem chi tiết: giá, mô tả, rating
- Thêm vào giỏ/wishlist
- Xem reviews & đánh giá

### Giỏ Hàng

- Xem tất cả sản phẩm
- Chỉnh sửa số lượng
- Xóa sản phẩm
- Tính tổng tiền

### Đặt Hàng

- Chọn địa chỉ giao hàng
- Chọn phương thức thanh toán
- Xác nhận đặt hàng

### Hồ Sơ

- Xem/Sửa thông tin cá nhân
- Quản lý địa chỉ giao hàng
- Đổi mật khẩu
- Xem lịch sử đơn hàng

### Danh Sách Yêu Thích

- Xem các sản phẩm đã lưu
- Thêm/Xóa từ wishlist
- Thêm trực tiếp vào giỏ

---

## 💡 MẸO & LƯU Ý

1. **Giỏ Hàng**: Được lưu trữ trên server, không bị mất khi đóng trình duyệt
2. **Wishlist**: Lưu trữ trong hồ sơ user, có thể xem lại bất kỳ lúc nào
3. **Đơn Hàng**: Không thể sửa sau khi tạo, phải liên hệ Admin để hủy/sửa
4. **Review**: Mỗi sản phẩm mỗi user chỉ review 1 lần
5. **Token**: Lưu localStorage, sẽ mất nếu xóa cache

---

## 🎯 QUY TRÌNH MUA HÀNG HOÀN CHỈNH

```
1. Đăng ký/Đăng nhập
   ↓
2. Duyệt danh sách sản phẩm
   ↓
3. Xem chi tiết sản phẩm
   ↓
4. Thêm vào giỏ hàng (hoặc thêm wishlist)
   ↓
5. Xem giỏ hàng
   ↓
6. Chỉnh sửa số lượng/Xóa sản phẩm
   ↓
7. Thanh toán (tạo đơn hàng)
   ↓
8. Chọn địa chỉ giao hàng
   ↓
9. Chọn phương thức thanh toán (COD hoặc Stripe)
   ↓
10. Xác nhận & hoàn tất
    ↓
11. Theo dõi lịch sử đơn hàng
    ↓
12. Nhận hàng & thanh toán (nếu COD)
    ↓
13. Đánh giá/Review sản phẩm
```

---

## 📞 HỖ TRỢ & LIÊN HỆ

Nếu gặp vấn đề khi sử dụng các chức năng này, vui lòng:

- Liên hệ: 0389068652
- Email: support@jewelrybthn.com
- Chat: Trang web Zalo

---

**✨ Cảm ơn bạn đã sử dụng dịch vụ Jewelry BTHN ✨**
