# 📋 HƯỚNG DẪN CHUẨN BỊ DỮ LIỆU CHO WEBSITE

## ✅ Dữ Liệu Đã Có (Giữ Lại)

### 1. Admin Account

- **Email:** admin@example.com
- **Password:** admin123
- Dùng để đăng nhập quản lý website

### 2. Collections (4 Bộ Sưu Tập)

- ✅ Nhẫn
- ✅ Dây Chuyền
- ✅ Bông Tai
- ✅ Vòng Tay

**Cần làm:** Upload ảnh đẹp cho mỗi bộ sưu tập tại `/admin/collections`

### 3. Products (3 sản phẩm mẫu)

- Bông Tai Bạc 925 - Hoa Nhỏ (340,000đ)
- Nhẫn (300,000đ)
- Lắc tay - tinh thể (200,000đ)

**Cần làm:** Thêm nhiều sản phẩm thực tế hơn

---

## 🎯 DỮ LIỆU CẦN CHUẨN BỊ

### 1. ẢNH CHO BỘ SƯU TẬP (4 ảnh)

**Kích thước khuyến nghị:** 800x1000px (tỷ lệ 4:5)

1. **Nhẫn** (nhan.jpg)

   - Ảnh nhẫn đẹp, nổi bật
   - Nền sáng, chuyên nghiệp

2. **Dây Chuyền** (day-chuyen.jpg)

   - Ảnh dây chuyền trên người hoặc phông nền đẹp
   - Thể hiện sự sang trọng

3. **Bông Tai** (bong-tai.jpg)

   - Ảnh bông tai rõ nét
   - Có thể chụp trên người model

4. **Vòng Tay** (vong-tay.jpg)
   - Ảnh vòng tay đeo tay hoặc trên phông nền
   - Thể hiện chi tiết tinh xảo

**Cách upload:**

1. Vào http://localhost:3001/admin/collections
2. Click "Sửa" trên từng collection
3. Upload ảnh tương ứng
4. Click "Cập Nhật"

---

### 2. SẢN PHẨM (Tối thiểu 12-20 sản phẩm)

**Thông tin mỗi sản phẩm cần có:**

#### Thông Tin Cơ Bản:

- ✅ Tên sản phẩm (VD: "Nhẫn Bạc 925 Đính Đá Topaz")
- ✅ Giá (VD: 1,500,000đ)
- ✅ Giá sale (nếu có) (VD: 1,200,000đ)
- ✅ Danh mục: Chọn 1 trong 4 (Nhẫn / Dây Chuyền / Bông Tai / Vòng Tay)
- ✅ Chất liệu: Bạc 925, Vàng 18K, Vàng 14K, Platinum...
- ✅ Mô tả chi tiết (2-3 đoạn văn)
- ✅ Số lượng trong kho
- ✅ Ảnh sản phẩm (3-5 ảnh/sản phẩm)

#### Thông Số Kỹ Thuật:

- Chất liệu chi tiết (VD: "Bạc 925 mạ vàng trắng")
- Đá quý (VD: "Topaz xanh tự nhiên 5mm")
- Trọng lượng (VD: "3.5g")
- Kích thước (VD: "Size 5-7")

#### Ảnh Sản Phẩm:

**Kích thước khuyến nghị:** 800x800px trở lên

- Ảnh 1: Góc chính, toàn cảnh sản phẩm
- Ảnh 2: Góc cận cảnh chi tiết
- Ảnh 3: Ảnh đeo thử trên người (nếu có)
- Ảnh 4-5: Các góc khác

**Gợi ý phân bổ sản phẩm:**

- 📿 Nhẫn: 5-7 sản phẩm
- 📿 Dây Chuyền: 3-5 sản phẩm
- 📿 Bông Tai: 3-5 sản phẩm
- 📿 Vòng Tay: 3-5 sản phẩm

**Cách thêm sản phẩm:**

1. Vào http://localhost:3001/admin/products
2. Click "+ Thêm Sản Phẩm"
3. Điền đầy đủ thông tin
4. Upload ảnh (có thể upload nhiều ảnh cùng lúc)
5. Click "Thêm Sản Phẩm"

---

### 3. ẢNH BANNER/HERO

**Banner trang chủ:**

- File: `/FE/public/bthn-hero.jpg` (đã có)
- Kích thước: 1920x700px
- Nội dung: Ảnh đại diện thương hiệu

**Cách thay đổi:**

- Chụp/thiết kế ảnh banner đẹp
- Đổi tên thành `bthn-hero.jpg`
- Copy vào folder `FE/public/`
- Hoặc update path trong HomeSimple.jsx

---

### 4. ẢNH VỀ CHÚNG TÔI

**About Us image:**

- Hiện tại dùng: `/FE/public/bthn-hero.jpg`
- Kích thước khuyến nghị: 600x750px (tỷ lệ 4:5)
- Nội dung: Ảnh cửa hàng, xưởng, hoặc sản phẩm đại diện

---

## 🚀 CÁC BƯỚC UPLOAD DỮ LIỆU

### Bước 1: Chuẩn bị ảnh

1. ✅ 4 ảnh collection (800x1000px)
2. ✅ 12-20 sản phẩm, mỗi sản phẩm 3-5 ảnh (800x800px)
3. ✅ 1 ảnh banner hero (1920x700px)
4. ✅ 1 ảnh about us (600x750px)

### Bước 2: Upload Collections

1. Mở http://localhost:3001/admin
2. Login với admin@example.com / admin123
3. Vào "Bộ Sưu Tập"
4. Sửa từng collection và upload ảnh tương ứng

### Bước 3: Upload Products

1. Vào "Sản Phẩm"
2. Click "+ Thêm Sản Phẩm"
3. Điền thông tin đầy đủ:
   - Tên sản phẩm
   - Giá (và giá sale nếu có)
   - Danh mục (chọn 1 trong 4 collections)
   - Chất liệu
   - Mô tả chi tiết
   - Số lượng
   - Thông số kỹ thuật
4. Upload 3-5 ảnh cho sản phẩm
5. Click "Thêm Sản Phẩm"
6. Lặp lại cho các sản phẩm khác

### Bước 4: Kiểm tra

1. Vào trang chủ: http://localhost:3001
2. Kiểm tra:
   - ✅ Collections có hiển thị đủ 4 và có ảnh đẹp
   - ✅ Sản phẩm hiển thị đủ và có ảnh
   - ✅ Click vào từng sản phẩm xem chi tiết
   - ✅ Thêm sản phẩm vào giỏ hàng (test chức năng)

---

## 📝 GHI CHÚ QUAN TRỌNG

### Định dạng ảnh:

- ✅ **Format:** JPG hoặc PNG
- ✅ **Kích thước tối đa:** 5MB/ảnh
- ✅ **Chất lượng:** Cao, sắc nét, không bị mờ

### Tên file ảnh:

- Đặt tên dễ hiểu (VD: `nhan-bac-topaz-1.jpg`)
- Không dấu tiếng Việt
- Không khoảng trắng (dùng dấu gạch ngang `-`)

### Giá sản phẩm:

- Nhập số không dấu (VD: `1500000` cho 1,500,000đ)
- Hệ thống tự động format hiển thị

### Danh mục:

- **Phải chọn đúng 1 trong 4:** Nhẫn / Dây Chuyền / Bông Tai / Vòng Tay
- Viết chính xác như tên collection (có dấu tiếng Việt)

---

## 🔍 CHECKLIST TRƯỚC KHI ĐI LIVE

- [ ] Đã có ít nhất 12 sản phẩm thực tế
- [ ] Mỗi sản phẩm có ít nhất 3 ảnh đẹp
- [ ] 4 collections đều có ảnh đại diện đẹp
- [ ] Đã test chức năng:
  - [ ] Xem sản phẩm
  - [ ] Thêm vào giỏ hàng
  - [ ] Lọc theo danh mục
  - [ ] Tìm kiếm sản phẩm
- [ ] Thông tin liên hệ đã chính xác (footer, trang Contact)
- [ ] Đã backup database trước khi deploy

---

## 💡 MẸO

1. **Chụp ảnh chuyên nghiệp:**

   - Nền trắng hoặc nền đơn sắc
   - Ánh sáng đều, không bị bóng
   - Nhiều góc độ

2. **Viết mô tả hấp dẫn:**

   - Nói về chất liệu, nguồn gốc
   - Ý nghĩa của sản phẩm
   - Phù hợp với ai, dịp nào

3. **Giá cả hợp lý:**

   - Tham khảo thị trường
   - Có chương trình giảm giá để thu hút

4. **Cập nhật thường xuyên:**
   - Thêm sản phẩm mới định kỳ
   - Cập nhật số lượng tồn kho
   - Quản lý đơn hàng kịp thời

---

## 📞 LIÊN HỆ HỖ TRỢ

Nếu gặp vấn đề khi upload dữ liệu, hãy chụp màn hình và mô tả chi tiết lỗi!

**Chúc bạn thành công! 🎉**
