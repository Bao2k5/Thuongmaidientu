# 📋 TÓM TẮT NHANH - CHỨC NĂNG NGƯỜI DÙNG

## 🎯 7 CHỨC NĂNG CHÍNH

### 1️⃣ ĐĂNG KÝ & ĐĂNG NHẬP 🔐

```
Đăng ký → Nhập (Tên, Email, Password)
Đăng nhập → Nhập (Email, Password) → Nhận Token
Quên mật khẩu → Nhập Email → Nhận link reset
```

**Nhánh điều kiện (ví dụ):**

```
IF email đã tồn tại THEN
  ↓
  Hiển thị lỗi: "Email đã được sử dụng" → Gợi ý đăng nhập hoặc dùng quên mật khẩu
ELSE
  ↓
  Tạo tài khoản → Gửi email xác thực (nếu bật xác thực email)
ENDIF
```

---

### 2️⃣ QUẢN LÝ TÀI KHOẢN 👤

```
✓ Xem hồ sơ cá nhân
✓ Cập nhật tên, địa chỉ
✓ Đổi mật khẩu
✓ Quản lý địa chỉ giao hàng (Thêm/Sửa/Xóa)
```

**Nhánh điều kiện (ví dụ):**

```
IF cập nhật thông tin hợp lệ THEN
  ↓
  Lưu thay đổi → Hiển thị thông báo thành công
ELSE
  ↓
  Hiển thị lỗi xác thực (VD: email không hợp lệ, mật khẩu quá ngắn)
ENDIF
```

---

### 3️⃣ DUYỆT SẢN PHẨM 🏪

```
✓ Xem danh sách sản phẩm (phân trang: 12 sản phẩm/trang)
✓ Tìm kiếm theo từ khóa (ví dụ: "nhẫn vàng")
✓ Xem chi tiết sản phẩm (ảnh, giá, mô tả, rating)
✓ Xem các reviews của khách hàng khác
```

**Nhánh điều kiện (ví dụ):**

```
IF kết quả tìm kiếm == 0 THEN
  ↓
  Hiển thị: "Không tìm thấy kết quả" → Gợi ý từ khóa liên quan
ELSE
  ↓
  Hiển thị danh sách kết quả
ENDIF
```

---

### 4️⃣ GIỎ HÀNG & THANH TOÁN 🛒

```
Giỏ Hàng:
  • Thêm sản phẩm vào giỏ
  • Sửa số lượng
  • Xóa sản phẩm
  • Xem tổng tiền

Thanh Toán:
  • Tạo đơn hàng từ giỏ hàng
  • Chọn địa chỉ giao hàng
  • Chọn phương thức: COD (trả khi nhận) hoặc Stripe (thẻ)
  • Xem trạng thái đơn hàng
```

**Nhánh điều kiện (ví dụ):**

```
IF sản phẩm hết hàng THEN
  ↓
  Hiển thị cảnh báo khi thêm vào giỏ → Không cho thêm hoặc gợi ý số lượng tối đa
ELSE
  ↓
  Thêm vào giỏ thành công
ENDIF
```

---

### 5️⃣ DANH SÁCH YÊU THÍCH ❤️

```
✓ Xem danh sách sản phẩm yêu thích
✓ Thêm sản phẩm vào wishlist
✓ Xóa khỏi wishlist
✓ Thêm trực tiếp từ wishlist vào giỏ hàng
```

**Nhánh điều kiện (ví dụ):**

```
IF user.isAuthenticated THEN
  ↓
  Lưu wishlist trên server
ELSE
  ↓
  Lưu tạm trên client (localStorage) → Yêu cầu đăng nhập để lưu lâu dài
ENDIF
```

---

### 6️⃣ ĐÁNH GIÁ & REVIEW ⭐

```
✓ Xem đánh giá của người khác (rating 1-5 sao)
✓ Viết review sản phẩm (tiêu đề + chi tiết + rating)
✓ Xóa review của mình
✓ Xem trung bình rating sản phẩm
```

**Nhánh điều kiện (ví dụ):**

```
IF user đã mua sản phẩm THEN
  ↓
  Cho phép viết review
ELSE
  ↓
  Hiển thị: "Chỉ khách hàng đã mua mới được viết review"
ENDIF
```

---

### 7️⃣ LỊCH SỬ MUA HÀNG 📦

```
✓ Xem tất cả đơn hàng đã đặt
✓ Xem chi tiết từng đơn hàng
✓ Theo dõi trạng thái đơn hàng:
  - pending (chờ xác nhận)
  - confirmed (đã xác nhận)
  - shipped (đang gửi)
  - delivered (đã giao)
```

**Nhánh điều kiện (ví dụ):**

```
IF đơn đang ở trạng thái pending THEN
  ↓
  Cho phép hủy (nếu trước thời điểm đóng gói)
ELSE IF trạng thái == shipped THEN
  ↓
  Không cho hủy, chỉ có thể yêu cầu trả hàng sau khi giao
ENDIF
```

---

## 📊 BẢNG SO SÁNH TRẠNG THÁI

### Trạng Thái Đơn Hàng

| Trạng Thái   | Ý Nghĩa                    |
| ------------ | -------------------------- |
| 🔵 Pending   | Chờ Admin xác nhận         |
| 🟢 Confirmed | Đã xác nhận, chuẩn bị hàng |
| 🟡 Shipped   | Đang vận chuyển            |
| ✅ Delivered | Đã giao hàng               |
| ❌ Cancelled | Đã hủy                     |

### Phương Thức Thanh Toán

| Phương Thức | Cách Thức             | Lợi Ích        |
| ----------- | --------------------- | -------------- |
| COD         | Trả khi nhận hàng     | Không rủi ro   |
| Stripe      | Thanh toán trực tuyến | Nhanh, an toàn |

---

## 🔄 QUY TRÌNH MUA HÀNG

```
START
  ↓
📱 Đăng nhập/Đăng ký
  ↓
🔍 Tìm kiếm sản phẩm
  ↓
👀 Xem chi tiết sản phẩm
  ↓
❓ Quyết định
  │
  ├─→ Thêm vào Wishlist ❤️ (Lưu để sau)
  │
  └─→ Thêm vào Giỏ 🛒
         ↓
       Tiếp tục mua?
         │
         ├─→ YES → Quay lại bước 🔍
         │
         └─→ NO → Xem Giỏ 👁️
                ↓
              Chỉnh sửa ✏️ (số lượng/xóa)
                ↓
              Thanh Toán 💳
                ↓
              Chọn địa chỉ 📍
                ↓
              Chọn thanh toán (COD/Stripe)
                ↓
              ✅ Xác nhận đơn hàng
                ↓
              📦 Theo dõi đơn hàng
                ↓
              Nhận hàng + Thanh toán (COD)
                ↓
              ⭐ Đánh giá & Review
                ↓
              END
```

---

## 🧭 QUY TRÌNH CHÍNH KHÁC (Flows)

Dưới đây là các quy trình chính bổ sung — phiên bản ngắn gọn, dễ đọc để đưa vào tài liệu hoặc chuyển thành sơ đồ tuần tự khi cần.

### 🔐 1) ĐĂNG KÝ / ĐĂNG NHẬP (chi tiết)

```
START
  ↓
Mở App / Trang web
  ↓
Chọn Đăng ký → Nhập (Tên, Email, Mật khẩu) → Xác nhận → Tạo tài khoản
  ↓
Đăng nhập → Nhập (Email, Mật khẩu) → Nhận Token → Lưu token (client)
  ↓
END
```

### 👤 2) QUẢN LÝ TÀI KHOẢN

```
START
  ↓
Đăng nhập
  ↓
Mở Hồ sơ (Profile)
  ↓
Chọn: Cập nhật thông tin / Đổi mật khẩu / Quản lý địa chỉ
  ↓
Thực hiện thay đổi → Lưu → Xác nhận thành công
  ↓
END
```

### 🔎 3) DUYỆT SẢN PHẨM (tìm + lọc)

```
START
  ↓
Trang chủ / Danh mục
  ↓
Tìm kiếm từ khóa / Dùng bộ lọc (giá, loại, rating)
  ↓
Chọn sản phẩm → Xem chi tiết (ảnh, mô tả, review)
  ↓
Quyết định: Thêm vào Wishlist ❤️  or Thêm vào Giỏ 🛒
  ↓
END
```

### ❤️ 4) WISHLIST (lưu & mua sau)

```
START
  ↓
Xem danh sách Wishlist
  ↓
Từ Wishlist: Xem chi tiết / Xóa / Thêm vào Giỏ
  ↓
Nếu Thêm vào Giỏ → Cập nhật Giỏ → END
```

### 🏠 5) QUẢN LÝ ĐỊA CHỈ GIAO HÀNG

```
START
  ↓
Mở trang Địa chỉ
  ↓
Thêm địa chỉ mới / Sửa / Xóa / Đặt làm mặc định
  ↓
Lưu → Xác nhận
  ↓
END
```

### ✍️ 6) VIẾT REVIEW (sau khi nhận hàng)

```
START
  ↓
Mở trang đơn hàng hoặc trang sản phẩm
  ↓
Chọn "Viết review" → Nhập tiêu đề + nội dung + rating (1-5)
  ↓
Gửi → Lưu review → Cập nhật rating trung bình
  ↓
END
```

### 🔁 7) HOÀN TRẢ / YÊU CẦU HOÀN TIỀN

```
START
  ↓
Mở chi tiết đơn hàng (trong thời hạn hoàn trả)
  ↓
Chọn Yêu cầu hoàn trả → Chọn lý do + Ảnh minh họa (nếu có)
  ↓
Gửi yêu cầu → Chờ xét duyệt bởi Admin
  ↓
Admin duyệt → Xác nhận thu hồi hàng / Chấp nhận hoàn tiền
  ↓
Khách nhận thông báo + tiền hoàn trả (hoặc hướng dẫn gửi trả hàng)
  ↓
END
```

### 🛠️ 8) QUY TRÌNH ADMIN XỬ LÝ ĐƠN HÀNG (tóm tắt)

```
START
  ↓
Khách đặt hàng → Tạo đơn (pending)
  ↓
Admin kiểm tra đơn → Confirm (confirmed)
  ↓
Chuẩn bị & Đóng gói → Giao cho đơn vị vận chuyển (shipped)
  ↓
Cập nhật tracking → Khách nhận hàng (delivered)
  ↓
Nếu có yêu cầu hoàn trả → Xử lý theo quy trình hoàn trả
  ↓
END
```

---

## 🧩 NHÁNH ĐIỀU KIỆN (Conditional flows) — ví dụ

Dưới đây là một số ví dụ về nhánh điều kiện thường gặp trong các quy trình thương mại điện tử. Mục đích: giúp dev và thiết kế hiểu các luồng xử lý khác nhau tùy điều kiện.

### 1) Thanh toán — theo phương thức

```
START
  ↓
Chọn Thanh toán
  ↓
IF phương thức == "Stripe" THEN
  ↓
  Chuyển sang cổng Stripe -> Thực hiện thanh toán trực tuyến
    ↓
  IF thanh toán OK THEN
    ↓
    Tạo đơn (confirmed) -> Gửi xác nhận
  ELSE
    ↓
    Hiển thị lỗi thanh toán -> Cho phép thử lại hoặc chuyển sang COD
  ENDIF
ELSE IF phương thức == "COD" THEN
  ↓
  Tạo đơn (pending) -> Yêu cầu xác nhận từ Admin
ENDIF
  ↓
END
```

### 2) Checkout — người dùng đăng nhập vs guest

```
START
  ↓
Bắt đầu Checkout
  ↓
IF user.isAuthenticated THEN
  ↓
  Lấy địa chỉ mặc định, áp mã giảm giá tự động (nếu có)
ELSE
  ↓
  Hiện form Guest: Nhập email + địa chỉ hoặc Yêu cầu đăng nhập
ENDIF
  ↓
Tiếp tục quy trình thanh toán
  ↓
END
```

### 3) Áp mã giảm giá (promo code)

```
START
  ↓
Nhập mã giảm giá
  ↓
IF mã hợp lệ AND chưa hết hạn AND áp dụng cho sản phẩm THEN
  ↓
  Áp giảm giá -> Cập nhật tổng tiền
ELSE
  ↓
  Hiện thông báo: mã không hợp lệ / không áp dụng
ENDIF
  ↓
END
```

### 4) Kiểm tra tồn kho khi thêm vào giỏ / thanh toán

```
START
  ↓
Khách thêm sản phẩm vào giỏ
  ↓
IF stock >= requested THEN
  ↓
  Thêm thành công
ELSE
  ↓
  Hiện cảnh báo: hết hàng hoặc giới hạn số lượng
  ↓
  Gợi ý: Thêm vào Wishlist hoặc thông báo khi có hàng
ENDIF
  ↓
END
```

### 5) Yêu cầu hoàn trả — Admin duyệt/ từ chối

```
START
  ↓
Khách gửi yêu cầu hoàn trả
  ↓
Admin kiểm tra
  ↓
IF chứng từ hợp lệ THEN
  ↓
  Chấp nhận -> Hướng dẫn trả hàng -> Hoàn tiền
ELSE
  ↓
  Từ chối -> Thông báo lý do
ENDIF
  ↓
END
```

---

## � LUỒNG HOẠT ĐỘNG TÍCH HỢP (Mapping features to flows)

Dưới đây mình gộp luồng hoạt động chính (checkout + điều kiện) vào từng chức năng để bạn dễ hình dung "hướng đi" của người dùng và các rẽ nhánh quan trọng.

### 1) Duyệt sản phẩm → Quyết định

```
Trang chủ / Danh mục
  ↓
Xem chi tiết sản phẩm
  ↓
IF thích → Thêm vào Wishlist (nếu guest lưu tạm)
ELSE IF muốn mua → Thêm vào Giỏ
```

### 2) Wishlist → Chuyển sang Giỏ

```
Xem Wishlist
  ↓
Chọn "Thêm vào Giỏ" → Kiểm tra tồn kho
  ↓
IF đủ stock THEN thêm vào giỏ
ELSE hiển thị cảnh báo / gợi ý đặt thông báo khi có hàng
```

### 3) Giỏ → Checkout (có rẽ nhánh)

```
Xem Giỏ → Chọn Thanh toán
  ↓
IF user.authenticated THEN lấy địa chỉ mặc định
ELSE yêu cầu guest nhập email + địa chỉ hoặc đăng nhập
  ↓
Nhập mã giảm giá? → IF mã hợp lệ THEN áp dụng
  ↓
Kiểm tra tồn kho cuối cùng
  ↓
Chọn phương thức thanh toán: Stripe OR COD
```

### 4) Thanh toán (kết quả ảnh hưởng tới trạng thái đơn)

```
IF phương thức == Stripe THEN
  ↓
  Thực hiện thanh toán trực tuyến
    ↓
  IF success THEN tạo đơn confirmed
  ELSE hiển thị lỗi → cho thử lại hoặc chọn COD
ELSE IF phương thức == COD THEN
  ↓
  Tạo đơn pending (chờ admin xác nhận)
```

### 5) Sau khi tạo đơn

```
Admin/ hệ thống cập nhật trạng thái → shipped → delivered
  ↓
Khách nhận hàng → Có thể viết review (nếu đã mua)
  ↓
Nếu có yêu cầu hoàn trả → Chạy luồng hoàn trả (Admin duyệt/ từ chối)
```

Ghi chú nhanh:

- Các bước kiểm tra (tồn kho, áp mã, xác thực) nên được lặp lại tại thời điểm quan trọng (thêm vào giỏ, trước khi thanh toán) để tránh race condition và giá trị tính toán sai.
- Luồng guest → đăng ký nên dễ hoán đổi (show modal login / continue as guest) để không làm gián đoạn checkout.
- Ứng dụng thực tế: hành vi lỗi (payment fail, out-of-stock) phải thông báo rõ và đưa lựa chọn tiếp theo (thử lại, chọn COD, remove item).

---

## �💡 QUICK TIPS

| Tip             | Chi Tiết                                                  |
| --------------- | --------------------------------------------------------- |
| 🔖 **Wishlist** | Lưu sản phẩm yêu thích để xem sau, không mất khi đóng app |
| 💾 **Token**    | Được lưu tự động, đăng nhập 1 lần dùng 7 ngày             |
| 📦 **Giỏ**      | Được lưu trên server, bất kỳ lúc nào vào đều còn          |
| ⭐ **Review**   | Mỗi sản phẩm chỉ review 1 lần, phải xóa cũ mới review lại |
| 🔑 **Mật khẩu** | Tối thiểu 6 ký tự, được mã hóa an toàn                    |
| 📍 **Địa chỉ**  | Lưu được nhiều địa chỉ, chọn khi thanh toán               |

---

## 🎁 SÀN NÀNG CÓ GÌ ĐẶC BIỆT

✨ **JEWELRY BTHN** cung cấp:

- 💎 Sản phẩm trang sức cao cấp
- 🚚 Giao hàng miễn phí
- ✅ Chất lượng đảm bảo
- 🤝 Hỗ trợ 24/7
- ❤️ Có wishlist để lưu sản phẩm yêu thích
- ⭐ Hệ thống rating & review minh bạch
- 💳 2 cách thanh toán linh hoạt (COD & Stripe)

---

## 📞 CẦN HỖ TRỢ?

| Kênh                 | Thông Tin                |
| -------------------- | ------------------------ |
| ☎️ **Phone**         | 0389068652               |
| 📧 **Email**         | support@jewelrybthn.com  |
| 💬 **Chat**          | Zalo Official            |
| ⏰ **Giờ hoạt động** | 09:00 - 16:00, Mon - Sat |

---

**✨ Vui lòng xem `USER_FEATURES.md` để biết chi tiết đầy đủ! ✨**
