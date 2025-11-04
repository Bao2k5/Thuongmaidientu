# Image Upload Setup

Hệ thống hỗ trợ 2 cách upload ảnh:

## 🚀 **Option 1: Local Storage (Mặc định - Khuyến nghị)**

- **Ưu điểm**: Không cần tài khoản bên ngoài, đơn giản, nhanh
- **Cách hoạt động**: Ảnh được lưu trong thư mục `uploads/` của server
- **Cấu hình**: Không cần làm gì thêm - đã hoạt động sẵn!

## ☁️ **Option 2: Cloudinary (Nâng cao)**

- **Ưu điểm**: CDN global, tối ưu ảnh tự động, backup cloud
- **Nhược điểm**: Cần tạo tài khoản và cấu hình

### Để sử dụng Cloudinary:

#### 1. Tạo tài khoản Cloudinary

- Truy cập: https://cloudinary.com/
- Đăng ký tài khoản miễn phí

#### 2. Lấy API credentials

- Vào Dashboard > Account Details > API Keys
- Copy các thông tin:
  - Cloud Name
  - API Key
  - API Secret

#### 3. Cập nhật file .env

Thêm vào file `.env` ở root directory:

```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

#### 4. Restart server

```bash
cd BE
node server.js
```

## 🧪 **Test Upload**

Sau khi setup, bạn có thể test upload ảnh trong admin panel:

- Vào Admin > Quản Lý Sản Phẩm > Thêm Sản Phẩm
- Chọn ảnh và submit

## 📁 **Local Storage**

- Ảnh được lưu trong: `BE/uploads/`
- URL truy cập: `http://localhost:3000/uploads/filename.jpg`
- Dung lượng: Tối đa 5MB/ảnh
- Định dạng: JPG, PNG, GIF, WebP

## ⚠️ **Lưu ý**

- **Local storage** phù hợp cho development và production nhỏ
- **Cloudinary** phù hợp cho production lớn với nhiều traffic
- Có thể chuyển đổi giữa 2 phương pháp bất cứ lúc nào
