# Hướng dẫn Test Backend trên Postman

## 🔧 Chuẩn bị

### 1. Import Collection

- Mở Postman
- File → Import → Chọn `postman_collection.json`
- Collection "Thuongmaidientu API" sẽ xuất hiện

### 2. Cấu hình Variables

- Click vào Collection → Tab "Variables"
- Đảm bảo có 3 biến:
  - `baseUrl`: `http://localhost:3000`
  - `adminToken`: (để trống, sẽ điền sau khi login)
  - `userToken`: (để trống, sẽ điền sau khi login user)

### 3. Khởi động Server

```powershell
# Nếu chưa seed data
npm run seed

# Chạy server
npm run dev
```

Chờ thấy message: "🚀 Server chạy tại http://localhost:3000"

---

## 📋 Test theo thứ tự

### ✅ 1. AUTHENTICATION (Auth)

#### 1.1. Register User Mới

**Endpoint:** `POST {{baseUrl}}/api/auth/register`

**Headers:**

```
Content-Type: application/json
```

**Body (raw JSON):**

```json
{
  "name": "Nguyen Van A",
  "email": "user1@example.com",
  "password": "user123456"
}
```

**Kết quả mong đợi:**

- Status: `201 Created`
- Response chứa `token` và thông tin `user`
- **Quan trọng:** Copy giá trị `token` → Paste vào biến `{{userToken}}`

---

#### 1.2. Login Admin

**Endpoint:** `POST {{baseUrl}}/api/auth/login`

**Body:**

```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

**Kết quả:**

- Status: `200 OK`
- Response có `token` và `user.role = "admin"`
- **Copy `token`** → Paste vào biến `{{adminToken}}`

---

#### 1.3. Login User

**Endpoint:** `POST {{baseUrl}}/api/auth/login`

**Body:**

```json
{
  "email": "user1@example.com",
  "password": "user123456"
}
```

**Kết quả:**

- Status: `200 OK`
- **Copy `token`** → Paste vào biến `{{userToken}}`

---

#### 1.4. Forgot Password

**Endpoint:** `POST {{baseUrl}}/api/auth/forgot-password`

**Body:**

```json
{
  "email": "user1@example.com"
}
```

**Kết quả:**

- Nếu SMTP chưa cấu hình → Response có `resetToken`
- Nếu SMTP đã cấu hình → Email được gửi

---

#### 1.5. Reset Password

**Endpoint:** `POST {{baseUrl}}/api/auth/reset-password`

**Body:**

```json
{
  "email": "user1@example.com",
  "token": "TOKEN_TỪ_BƯỚC_TRƯỚC",
  "newPassword": "newpass123456"
}
```

---

### ✅ 2. PRODUCTS (Sản phẩm)

#### 2.1. Lấy danh sách sản phẩm (Public)

**Endpoint:** `GET {{baseUrl}}/api/products`

**Query params (optional):**

- `page=1`
- `limit=12`
- `q=ring` (tìm kiếm)
- `minPrice=500000`
- `maxPrice=2000000`
- `flash=true` (chỉ flash sale)

**Kết quả:**

- Status: `200 OK`
- Array `products`, `total`, `pages`

---

#### 2.2. Lấy chi tiết sản phẩm

**Endpoint:** `GET {{baseUrl}}/api/products/slug/sample-ring`

**Kết quả:**

- Thông tin đầy đủ 1 sản phẩm

---

#### 2.3. Tạo sản phẩm mới (Admin only)

**Endpoint:** `POST {{baseUrl}}/api/products`

**Headers:**

```
Content-Type: application/json
Authorization: Bearer {{adminToken}}
```

**Body:**

```json
{
  "name": "Diamond Ring Premium",
  "slug": "diamond-ring-premium",
  "description": "Nhẫn kim cương cao cấp",
  "price": 5000000,
  "stock": 10,
  "category": "Rings",
  "tags": ["luxury", "diamond"]
}
```

**Kết quả:**

- Status: `201 Created`
- **Copy `_id`** của sản phẩm vừa tạo (dùng cho các bước sau)

---

#### 2.4. Cập nhật sản phẩm (Admin)

**Endpoint:** `PUT {{baseUrl}}/api/products/PRODUCT_ID`

**Headers:**

```
Authorization: Bearer {{adminToken}}
```

**Body:**

```json
{
  "price": 4500000,
  "priceSale": 3900000,
  "isFlashSale": true
}
```

---

#### 2.5. Xóa sản phẩm (Admin)

**Endpoint:** `DELETE {{baseUrl}}/api/products/PRODUCT_ID`

**Headers:**

```
Authorization: Bearer {{adminToken}}
```

---

### ✅ 3. CART (Giỏ hàng)

#### 3.1. Xem giỏ hàng

**Endpoint:** `GET {{baseUrl}}/api/cart`

**Headers:**

```
Authorization: Bearer {{userToken}}
```

**Kết quả:**

- Giỏ hàng hiện tại (ban đầu rỗng)

---

#### 3.2. Thêm sản phẩm vào giỏ

**Endpoint:** `POST {{baseUrl}}/api/cart`

**Headers:**

```
Authorization: Bearer {{userToken}}
```

**Body:**

```json
{
  "productId": "PRODUCT_ID_TỪ_BƯỚC_2.3",
  "qty": 2
}
```

**Kết quả:**

- Giỏ hàng có thêm sản phẩm

---

#### 3.3. Cập nhật số lượng

**Endpoint:** `PUT {{baseUrl}}/api/cart`

**Headers:**

```
Authorization: Bearer {{userToken}}
```

**Body:**

```json
{
  "productId": "PRODUCT_ID",
  "qty": 3
}
```

---

#### 3.4. Xóa giỏ hàng

**Endpoint:** `DELETE {{baseUrl}}/api/cart`

**Headers:**

```
Authorization: Bearer {{userToken}}
```

---

### ✅ 4. ORDERS (Đơn hàng)

#### 4.1. Tạo đơn hàng từ giỏ (Mock payment)

**Endpoint:** `POST {{baseUrl}}/api/orders`

**Headers:**

```
Authorization: Bearer {{userToken}}
```

**Body:**

```json
{
  "address": "123 Nguyen Trai, Q1, TPHCM"
}
```

**Kết quả:**

- Đơn hàng được tạo
- **Copy `_id`** của order

---

#### 4.2. Lấy danh sách đơn hàng của mình

**Endpoint:** `GET {{baseUrl}}/api/orders`

**Headers:**

```
Authorization: Bearer {{userToken}}
```

---

#### 4.3. Xem chi tiết đơn hàng

**Endpoint:** `GET {{baseUrl}}/api/orders/ORDER_ID`

**Headers:**

```
Authorization: Bearer {{userToken}}
```

---

#### 4.4. Mock thanh toán (Test)

**Endpoint:** `POST {{baseUrl}}/api/orders/ORDER_ID/pay`

**Headers:**

```
Authorization: Bearer {{userToken}}
```

**Kết quả:**

- Order status → `paid`

---

#### 4.5. Tạo Payment Intent (Stripe - nếu có STRIPE_SECRET)

**Endpoint:** `POST {{baseUrl}}/api/orders/create-payment-intent`

**Headers:**

```
Authorization: Bearer {{userToken}}
```

**Body:**

```json
{
  "address": "456 Le Loi, Q1, TPHCM"
}
```

**Kết quả:**

- `clientSecret` (dùng cho Stripe frontend)
- `orderId`

---

### ✅ 5. REVIEWS (Đánh giá)

#### 5.1. Xem đánh giá của sản phẩm

**Endpoint:** `GET {{baseUrl}}/api/products/PRODUCT_ID/reviews`

---

#### 5.2. Tạo đánh giá

**Endpoint:** `POST {{baseUrl}}/api/products/PRODUCT_ID/reviews`

**Headers:**

```
Authorization: Bearer {{userToken}}
```

**Body:**

```json
{
  "rating": 5,
  "title": "Sản phẩm tuyệt vời",
  "text": "Chất lượng rất tốt, giao hàng nhanh"
}
```

---

#### 5.3. Xóa đánh giá

**Endpoint:** `DELETE {{baseUrl}}/api/products/PRODUCT_ID/reviews/REVIEW_ID`

**Headers:**

```
Authorization: Bearer {{userToken}}
```

---

### ✅ 6. USER PROFILE

#### 6.1. Xem profile

**Endpoint:** `GET {{baseUrl}}/api/users/profile`

**Headers:**

```
Authorization: Bearer {{userToken}}
```

---

#### 6.2. Cập nhật profile

**Endpoint:** `PUT {{baseUrl}}/api/users/profile`

**Headers:**

```
Authorization: Bearer {{userToken}}
```

**Body:**

```json
{
  "name": "Nguyen Van A Updated",
  "address": "789 Tran Hung Dao, Q5, TPHCM"
}
```

---

#### 6.3. Đổi mật khẩu

**Endpoint:** `POST {{baseUrl}}/api/users/change-password`

**Headers:**

```
Authorization: Bearer {{userToken}}
```

**Body:**

```json
{
  "oldPassword": "user123456",
  "newPassword": "newpassword123"
}
```

---

#### 6.4. Thêm địa chỉ

**Endpoint:** `POST {{baseUrl}}/api/users/addresses`

**Headers:**

```
Authorization: Bearer {{userToken}}
```

**Body:**

```json
{
  "label": "Nhà riêng",
  "name": "Nguyen Van A",
  "phone": "0901234567",
  "line1": "123 Nguyen Trai",
  "city": "Ho Chi Minh",
  "province": "TPHCM",
  "postalCode": "700000"
}
```

---

### ✅ 7. WISHLIST (Yêu thích)

#### 7.1. Xem wishlist

**Endpoint:** `GET {{baseUrl}}/api/users/wishlist`

**Headers:**

```
Authorization: Bearer {{userToken}}
```

---

#### 7.2. Thêm vào wishlist

**Endpoint:** `POST {{baseUrl}}/api/users/wishlist/PRODUCT_ID`

**Headers:**

```
Authorization: Bearer {{userToken}}
```

---

#### 7.3. Xóa khỏi wishlist

**Endpoint:** `DELETE {{baseUrl}}/api/users/wishlist/PRODUCT_ID`

**Headers:**

```
Authorization: Bearer {{userToken}}
```

---

### ✅ 8. COLLECTIONS (Bộ sưu tập)

#### 8.1. Danh sách collections

**Endpoint:** `GET {{baseUrl}}/api/collections`

---

#### 8.2. Chi tiết collection + products

**Endpoint:** `GET {{baseUrl}}/api/collections/default`

**Query params:**

- `page=1`
- `limit=12`

---

### ✅ 9. PROMOTIONS (Khuyến mãi)

#### 9.1. Danh sách promo đang active

**Endpoint:** `GET {{baseUrl}}/api/promos/active`

---

#### 9.2. Tạo promo (Admin)

**Endpoint:** `POST {{baseUrl}}/api/promos`

**Headers:**

```
Authorization: Bearer {{adminToken}}
```

**Body:**

```json
{
  "title": "Flash Sale 50%",
  "type": "product",
  "product": "PRODUCT_ID",
  "discountPercent": 50,
  "startAt": "2025-10-06T00:00:00Z",
  "endAt": "2025-10-10T23:59:59Z",
  "active": true
}
```

---

### ✅ 10. ADMIN ENDPOINTS

#### 10.1. Quản lý Users

**Danh sách users:**

```
GET {{baseUrl}}/api/admin/users?page=1&limit=20
Authorization: Bearer {{adminToken}}
```

**Chi tiết user:**

```
GET {{baseUrl}}/api/admin/users/USER_ID
Authorization: Bearer {{adminToken}}
```

**Cập nhật user (role, verify):**

```
PUT {{baseUrl}}/api/admin/users/USER_ID
Authorization: Bearer {{adminToken}}

Body:
{
  "role": "admin",
  "emailVerified": true
}
```

**Soft delete user:**

```
DELETE {{baseUrl}}/api/admin/users/USER_ID
Authorization: Bearer {{adminToken}}
```

---

#### 10.2. Quản lý Orders

**Danh sách tất cả orders:**

```
GET {{baseUrl}}/api/admin/orders
Authorization: Bearer {{adminToken}}
```

**Chi tiết order:**

```
GET {{baseUrl}}/api/admin/orders/ORDER_ID
Authorization: Bearer {{adminToken}}
```

**Cập nhật trạng thái:**

```
PUT {{baseUrl}}/api/admin/orders/ORDER_ID/status
Authorization: Bearer {{adminToken}}

Body:
{
  "status": "shipped"
}
```

**Cập nhật shipping info:**

```
PUT {{baseUrl}}/api/admin/orders/ORDER_ID/ship
Authorization: Bearer {{adminToken}}

Body:
{
  "carrier": "Viettel Post",
  "trackingNumber": "VTP123456789",
  "cost": 30000
}
```

---

#### 10.3. Upload Product Images (Cần Cloudinary)

**Thêm ảnh:**

```
POST {{baseUrl}}/api/admin/products/PRODUCT_ID/images
Authorization: Bearer {{adminToken}}
Content-Type: multipart/form-data

Form Data:
- file: [chọn file ảnh]
```

**Xóa ảnh:**

```
DELETE {{baseUrl}}/api/admin/products/PRODUCT_ID/images
Authorization: Bearer {{adminToken}}

Body:
{
  "publicId": "products/abc123"
}
```

---

#### 10.4. Bulk Update Products

```
POST {{baseUrl}}/api/admin/products/bulk-update
Authorization: Bearer {{adminToken}}

Body:
{
  "list": [
    {
      "id": "PRODUCT_ID_1",
      "updates": {
        "price": 1200000,
        "stock": 50
      }
    },
    {
      "id": "PRODUCT_ID_2",
      "updates": {
        "isFlashSale": true,
        "priceSale": 900000
      }
    }
  ]
}
```

---

#### 10.5. Admin Stats

```
GET {{baseUrl}}/api/admin/stats
Authorization: Bearer {{adminToken}}
```

**Kết quả:**

- `totalUsers`
- `totalOrders`
- `revenue`
- `topProducts`

---

#### 10.6. Admin Logs

```
GET {{baseUrl}}/api/admin/logs?page=1&limit=50
Authorization: Bearer {{adminToken}}
```

---

#### 10.7. Send Test Email

```
POST {{baseUrl}}/api/admin/send-test-email
Authorization: Bearer {{adminToken}}

Body:
{
  "to": "test@example.com",
  "subject": "Test Email",
  "text": "This is a test email"
}
```

---

## 🧪 Test Scenarios (Kịch bản test đầy đủ)

### Scenario 1: User mua hàng hoàn chỉnh

1. ✅ Register user mới
2. ✅ Login user → lấy token
3. ✅ Xem danh sách sản phẩm
4. ✅ Xem chi tiết 1 sản phẩm
5. ✅ Thêm 2-3 sản phẩm vào giỏ
6. ✅ Xem giỏ hàng
7. ✅ Cập nhật số lượng
8. ✅ Tạo đơn hàng
9. ✅ Mock thanh toán
10. ✅ Xem đơn hàng đã tạo
11. ✅ Viết review cho sản phẩm

### Scenario 2: Admin quản lý

1. ✅ Login admin
2. ✅ Xem danh sách users
3. ✅ Tạo sản phẩm mới
4. ✅ Tạo promo cho sản phẩm
5. ✅ Xem danh sách orders
6. ✅ Cập nhật status order → shipped
7. ✅ Xem stats dashboard
8. ✅ Xem logs

---

## ❌ Lỗi thường gặp

### 1. 401 Unauthorized

**Nguyên nhân:** Token hết hạn hoặc chưa set
**Giải pháp:** Login lại và copy token mới vào biến

### 2. 400 Bad Request - Validation error

**Nguyên nhân:** Body thiếu field bắt buộc
**Giải pháp:** Kiểm tra lại body theo mẫu

### 3. 404 Not Found

**Nguyên nhân:** ID không tồn tại
**Giải pháp:** Dùng ID thực từ response trước

### 4. 429 Too Many Requests

**Nguyên nhân:** Rate limit
**Giải pháp:** Đợi 15 phút hoặc set `NODE_ENV=development` trong `.env`

### 5. 500 Server Error

**Nguyên nhân:** Lỗi server
**Giải pháp:** Xem logs trong terminal nơi server chạy

---

## 💡 Tips

1. **Save responses:** Click "Save Response" để lưu ví dụ
2. **Environment:** Tạo 2 environments (Dev, Production) với baseUrl khác nhau
3. **Tests tab:** Thêm script tự động lưu token:
   ```javascript
   pm.test("Login successful", function () {
     var jsonData = pm.response.json();
     pm.environment.set("userToken", jsonData.token);
   });
   ```
4. **Collection Runner:** Chạy toàn bộ collection tự động

---

Chúc bạn test thành công! 🎉
