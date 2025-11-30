# 💎 HMJewelry - Đồ Án Thương Mại Điện Tử (Nhóm 8)

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

### 👋 Chào mọi người, đây là đồ án môn Thương Mại Điện Tử của tụi mình!

**Nhóm 8 - Khoa Công Nghệ Thông Tin**

</div>

---

## 👥 Team Của Tụi Mình

Dưới đây là danh sách thành viên và phân công công việc của nhóm:

<div align="center">

| STT | Họ và Tên           |  MSSV  | Vai Trò                   | Công Việc Chính                                                                   |
| :-: | ------------------- | :----: | ------------------------- | --------------------------------------------------------------------------------- |
|  1  | **Lê Dương Bảo**    | 123456 | 👑 **Team Leader**        | Cân team Backend, thiết kế Database, làm Admin Dashboard, quản lý tiến độ.        |
|  2  | **Nguyễn Lê Hưng**  | 234567 | 💻 **Frontend Developer** | Code giao diện React, xử lý logic Frontend, làm cho web đẹp lung linh.            |
|  3  | **Phạm Thanh Tùng** | 345678 | 🎨 **UI/UX Designer**     | Thiết kế Mockup, lo phần hình ảnh, logo và hỗ trợ Frontend.                       |
|  4  | **Trần Gia Nghĩa**  | 456789 | 📊 **Tester & QA**        | Test lỗi sấp mặt, viết tài liệu hướng dẫn, đảm bảo web chạy mượt.                 |

</div>

---

## 📝 Giới Thiệu Một Chút Về Dự Án

**HMJewelry** là một trang web bán trang sức (nhẫn, dây chuyền, bông tai...) mà tụi mình đã xây dựng trong học kỳ này.

Lý do chọn đề tài này là vì tụi mình muốn thử thách bản thân với một hệ thống thương mại điện tử hoàn chỉnh, từ việc quản lý sản phẩm, giỏ hàng cho đến thanh toán online. Tụi mình chọn **MERN Stack** (MongoDB, Express, React, Node.js) vì đây là công nghệ khá hot và linh hoạt hiện nay.

Giao diện thì tụi mình hướng tới phong cách "sang chảnh" (Luxury) một chút, sử dụng **TailwindCSS** để custom cho nhanh và đẹp.

---

## ✨ Web Tụi Mình Làm Được Gì?

Sau một hồi code ngày đêm thì đây là những tính năng đã hoàn thiện:

### 1. Cho Khách Hàng (User)
*   **Đăng ký/Đăng nhập**: Có thể dùng Email hoặc đăng nhập nhanh bằng **Google/Facebook** (cái này làm hơi cực nhưng xịn).
*   **Xem sản phẩm**: Lọc theo danh mục (Nhẫn, Dây chuyền...), xem chi tiết, ảnh phóng to.
*   **Mua hàng**: Thêm vào giỏ, sửa số lượng, đặt hàng.
*   **Thanh toán**:
    *   Thanh toán khi nhận hàng (COD).
    *   Thanh toán online qua **Stripe** (Visa/Mastercard).
    *   Giả lập thanh toán qua **Momo** và **VNPay** (Demo cho thầy xem quy trình thôi ạ).
*   **Tương tác**: Viết review, chấm sao cho sản phẩm, xem top review xịn trên trang chủ.

### 2. Cho Admin (Quản trị viên)
*   **Dashboard xịn xò**: Xem thống kê doanh thu, số đơn hàng, khách hàng mới.
*   **Quản lý Banner**: Thay đổi banner trang chủ ngay trong admin luôn, không cần sửa code.
*   **Quản lý Sản phẩm**: Thêm, sửa, xóa, upload ảnh lên Cloudinary.
*   **Quản lý Đơn hàng**: Xem ai đặt gì, cập nhật trạng thái đơn (Đang giao, Đã giao...).

---

## 🛠️ Công Nghệ Sử Dụng

Tụi mình dùng mấy món này nè:

*   **Backend**: Node.js + Express (Viết API).
*   **Database**: MongoDB (Lưu trữ dữ liệu dạng JSON, khá tiện).
*   **Frontend**: React + Vite (Chạy siêu nhanh) + TailwindCSS.
*   **Xác thực**: JWT (JSON Web Token) và Passport.js.
*   **Lưu trữ ảnh**: Cloudinary (Free mà ngon).
*   **Email**: Nodemailer (Dùng Gmail để gửi mail xác nhận đơn hàng).

---

## 🚀 Hướng Dẫn Chạy (Cho thầy và các bạn)

Để chạy được project này thì máy cần cài sẵn **Node.js** (bản 18 trở lên nhé) và **MongoDB**.

### Bước 1: Tải code về

```bash
git clone https://github.com/Bao2k5/Thuongmaidientu.git
cd Thuongmaidientu
```

### Bước 2: Cài đặt Backend

Mở terminal ở thư mục gốc và chạy:

```bash
npm install
```

Sau đó tạo file `.env` ở thư mục gốc (copy từ `.env.example` ra cũng được) và điền mấy thông tin này vào:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/jewelry-bthn
JWT_SECRET=dien-cai-gi-cung-duoc-mien-la-dai
NODE_ENV=development

# Email (Dùng App Password của Gmail nhé)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=email-cua-ban@gmail.com
SMTP_PASS=mat-khau-ung-dung

# Cloudinary (Lên trang chủ đăng ký free lấy key nhé)
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

# Frontend URL
CLIENT_URL=http://localhost:5173
```

Chạy Backend lên:

```bash
npm run dev
```

### Bước 3: Cài đặt Frontend

Mở một terminal **mới**, đi vào thư mục FE:

```bash
cd FE
npm install
```

Tạo file `.env` trong thư mục `FE` với nội dung:

```env
VITE_API_URL=http://localhost:3000
```

Chạy Frontend lên:

```bash
npm run dev
```

Xong rồi đó! Giờ vào `http://localhost:5173` để xem thành quả nhé.

### Bước 4: Tạo dữ liệu mẫu (Optional)

Nếu lười tạo từng sản phẩm thì chạy lệnh này để có sẵn dữ liệu test:

```bash
# Tại thư mục gốc
node BE/scripts/seedReviews.js
```

---

## 👤 Tài Khoản Test

Để thầy và các bạn đỡ mất công đăng ký:

*   **Admin**: `admin@example.com` / `admin123`
*   **User**: `user@hmjewelry.com` / `user123`

---

## 📂 Cấu Trúc Thư Mục

```
Thuongmaidientu/
├── BE/              # Code Backend ở đây
│   ├── src/         # Logic chính (Controller, Model...)
│   └── server.js    # File chạy server
│
├── FE/              # Code Frontend ở đây
│   ├── public/      # Chứa ảnh tĩnh
│   └── src/         # Code React (Component, Page...)
│
└── README.md        # Là file bạn đang đọc nè
```

---

<div align="center">

**Cảm ơn thầy và các bạn đã ghé thăm project của nhóm 8!**
Nếu thấy hay thì cho tụi mình xin 1 sao trên GitHub nha ⭐

**Made with ❤️ by HMJewelry Team**

</div>
