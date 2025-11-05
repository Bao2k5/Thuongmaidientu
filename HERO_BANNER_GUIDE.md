# Hướng Dẫn Quản Lý Hero Banner

## Tổng Quan

Hệ thống Hero Banner cho phép admin quản lý banner lớn (hình ảnh đầu trang chủ) một cách linh hoạt, dễ dàng thay đổi theo từng sự kiện, chương trình khuyến mãi mà không cần code.

## Tính Năng

### 1. **Quản Lý Banner Đa Dạng**

- Tạo nhiều banner khác nhau cho các sự kiện khác nhau
- Mỗi banner có thể bao gồm:
  - **Tiêu đề** (Title): Tiêu đề chính của banner
  - **Phụ đề** (Subtitle): Mô tả ngắn gọn
  - **Mô tả** (Description): Nội dung chi tiết
  - **Hình ảnh**: Upload ảnh banner (khuyến nghị 1920x700px)
  - **Button Text**: Text của nút CTA (mặc định: "Khám phá ngay")
  - **Button Link**: Link khi click button (mặc định: "/products")
  - **Thứ tự hiển thị**: Số càng nhỏ hiển thị trước
  - **Thời gian hoạt động**: Ngày bắt đầu và kết thúc (tùy chọn)

### 2. **Bật/Tắt Banner Dễ Dàng**

- Toggle trạng thái active/inactive ngay trên danh sách
- Chỉ banner được đánh dấu "Active" mới hiển thị trên trang chủ

### 3. **Lên Lịch Banner**

- Đặt ngày bắt đầu và kết thúc cho banner
- Banner tự động hiển thị/ẩn theo lịch đã đặt
- Không cần ngày = hiển thị vô thời hạn (cho đến khi tắt)

### 4. **Carousel Tự Động**

- Nếu có nhiều banner active, tự động xoay vòng hiển thị
- Thay đổi mỗi 5 giây
- Có indicator (dấu chấm) để biết đang xem banner nào

## Hướng Dẫn Sử Dụng

### Truy Cập Trang Quản Lý

1. Đăng nhập admin tại: `http://localhost:3001`
2. Vào menu **Hero Banner** trên sidebar admin

### Tạo Banner Mới

1. Click nút **"+ Tạo Banner Mới"**
2. Điền thông tin:
   ```
   Tiêu đề *: "Giảm Giá 50% Dịp Tết 2025"
   Phụ đề: "Nhận ngay ưu đãi khủng"
   Mô tả: "Áp dụng cho tất cả sản phẩm trong bộ sưu tập mùa xuân"
   Ảnh Banner *: Upload ảnh (max 5MB)
   Text Button: "Mua ngay"
   Link Button: "/products?promo=tet2025"
   Ngày bắt đầu: 01/01/2025
   Ngày kết thúc: 15/02/2025
   Thứ tự: 1
   ✓ Kích hoạt banner
   ```
3. Click **"Tạo Banner"**

### Chỉnh Sửa Banner

1. Tìm banner trong danh sách
2. Click nút **"Sửa"**
3. Thay đổi thông tin cần thiết
4. Click **"Cập nhật"**

### Xóa Banner

1. Click nút **"Xóa"** trên banner cần xóa
2. Xác nhận xóa

### Bật/Tắt Banner Nhanh

- Click vào badge trạng thái (xanh/xám) để toggle active/inactive
- Không cần vào form chỉnh sửa

## Ví Dụ Thực Tế

### Kịch Bản 1: Khuyến Mãi Flash Sale Cuối Tuần

```javascript
Tiêu đề: "Flash Sale 48H"
Phụ đề: "Giảm đến 70% - Chỉ cuối tuần này"
Button: "Săn deal ngay" → "/products?sale=flash"
Thời gian: 06/01/2025 00:00 → 08/01/2025 23:59
Thứ tự: 1
Active: ✓
```

### Kịch Bản 2: Ra Mắt Bộ Sưu Tập Mới

```javascript
Tiêu đề: "Bộ Sưu Tập Xuân 2025"
Phụ đề: "Khám phá vẻ đẹp mới"
Button: "Xem ngay" → "/collections/xuan-2025"
Thời gian: Không giới hạn
Thứ tự: 2
Active: ✓
```

### Kịch Bản 3: Sự Kiện Đặc Biệt

```javascript
Tiêu đề: "Tri Ân Khách Hàng"
Phụ đề: "Ưu đãi đặc biệt cho thành viên"
Button: "Nhận ưu đãi" → "/membership"
Thời gian: 14/02/2025 → 20/02/2025
Thứ tự: 0 (hiển thị trước banner khác)
Active: ✓
```

## Lưu Ý Quan Trọng

### Kích Thước Ảnh

- **Khuyến nghị**: 1920x700 pixels
- **Tỷ lệ**: 2.74:1 (wide landscape)
- **Dung lượng**: Tối đa 5MB
- **Format**: JPG, PNG, WebP

### Thứ Tự Hiển Thị

- Banner có số thứ tự **nhỏ hơn** hiển thị **trước**
- VD: order=0 hiển thị trước order=1
- Nếu nhiều banner cùng order, banner mới tạo hiển thị trước

### Thời Gian Hoạt Động

- **Không set thời gian** = banner hiển thị cho đến khi tắt
- **Có startDate** = banner bắt đầu hiển thị từ ngày đó
- **Có endDate** = banner tự động ẩn sau ngày đó
- **Cả hai** = banner chỉ hiển thị trong khoảng thời gian đó

### Text Overlay

- Text màu trắng với nền mờ đen (30% opacity)
- Đảm bảo text đọc được trên ảnh nền
- Nếu ảnh quá sáng, cân nhắc tối ảnh trước khi upload

## API Endpoints

### Public

```
GET /api/hero-banners/active
→ Lấy danh sách banner đang active và trong thời gian hiển thị
```

### Admin (Cần token)

```
GET    /api/hero-banners/admin       # Lấy tất cả banners
GET    /api/hero-banners/:id         # Lấy 1 banner theo ID
POST   /api/hero-banners             # Tạo banner mới
PUT    /api/hero-banners/:id         # Cập nhật banner
DELETE /api/hero-banners/:id         # Xóa banner
PATCH  /api/hero-banners/:id/toggle  # Bật/tắt banner
```

## Cấu Trúc Database

```javascript
{
  _id: ObjectId,
  title: String (required),           // "Flash Sale 50%"
  subtitle: String,                    // "Chỉ hôm nay"
  description: String,                 // "Áp dụng tất cả sản phẩm"
  image: String (required),            // URL ảnh
  buttonText: String,                  // "Mua ngay"
  buttonLink: String,                  // "/products"
  isActive: Boolean,                   // true/false
  startDate: Date,                     // 2025-01-01
  endDate: Date,                       // 2025-01-31
  order: Number,                       // 0, 1, 2...
  createdAt: Date,
  updatedAt: Date
}
```

## Workflow Thực Tế

### Chuẩn Bị Sự Kiện Tết

**1 tuần trước Tết:**

1. Thiết kế ảnh banner Tết (1920x700px)
2. Upload banner qua admin panel
3. Điền thông tin:
   - Tiêu đề: "Chúc Mừng Năm Mới 2025"
   - Ngày bắt đầu: 29/01/2025
   - Ngày kết thúc: 10/02/2025
   - **Chưa kích hoạt** (để test trước)

**3 ngày trước Tết:**

- Kích hoạt banner → Test trên trang chủ
- Kiểm tra responsive trên mobile

**Ngày 29/01:**

- Banner tự động hiển thị (vì đã set startDate)

**Ngày 10/02:**

- Banner tự động ẩn (endDate)

### Thay Đổi Nhanh Trong Ngày

**Scenario**: Có flash sale đột xuất trong 2 giờ

1. Vào admin panel
2. Tạo banner mới:
   ```
   Tiêu đề: "FLASH SALE 2H"
   Thời gian: Hôm nay 14:00 → Hôm nay 16:00
   Thứ tự: -1 (để hiển thị đầu tiên)
   Active: ✓
   ```
3. **Done!** Banner hiển thị ngay lập tức
4. Sau 16:00 banner tự động ẩn

## Troubleshooting

### Banner Không Hiển Thị

**Kiểm tra:**

1. ✓ Banner có status "Đang hiển thị" (màu xanh)?
2. ✓ Thời gian hiện tại có nằm trong startDate → endDate?
3. ✓ Ảnh có load được không? (kiểm tra Network tab)
4. ✓ Backend có đang chạy không? (port 3000)

### Ảnh Bị Vỡ/Méo

**Giải pháp:**

- Resize ảnh về đúng tỷ lệ 1920x700px trước khi upload
- Dùng tool online: photopea.com, canva.com
- Crop theo tỷ lệ 2.74:1

### Text Không Đọc Được

**Giải pháp:**

- Chọn ảnh nền tối màu
- Hoặc tối ảnh trước khi upload (giảm brightness 20-30%)
- Hoặc để trống subtitle/description, chỉ giữ title

## Best Practices

1. **Tối đa 3 banner active cùng lúc**: Quá nhiều làm user bối rối
2. **Ưu tiên banner theo season**: Tết, 8/3, 20/10, Black Friday...
3. **Test trước khi active**: Tạo banner nhưng chưa active, test trước
4. **Xóa banner cũ**: Sau khi sự kiện kết thúc, xóa luôn để giữ database sạch
5. **Backup ảnh**: Lưu ảnh gốc ở nơi khác, không chỉ dựa vào upload

## Kết Luận

Hệ thống Hero Banner giúp bạn:

- ✅ Thay đổi banner trang chủ trong vài phút
- ✅ Không cần developer để update
- ✅ Lên lịch trước cho các sự kiện
- ✅ A/B test nhiều banner khác nhau
- ✅ Phản ứng nhanh với các chương trình marketing

**Mọi thắc mắc liên hệ team tech support!** 🚀
