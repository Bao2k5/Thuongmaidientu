# 📸 Partner Logo Images Upload

## Vị trí upload: `/FE/public/images/partners/`

### Danh sách các file logo cần upload:

| Partner | Logo File | Kích Thước |
|---------|-----------|-----------|
| Tiffany & Co | `tiffany-logo.jpg` | 150x150px (min) |
| Cartier | `cartier-logo.jpg` | 150x150px (min) |
| Pandora | `pandora-logo.jpg` | 150x150px (min) |
| Van Cleef & Arpels | `van-cleef-logo.jpg` | 150x150px (min) |
| Georg Jensen | `georg-jensen-logo.jpg` | 150x150px (min) |
| Mon Chéri Valentine | `moncheri-valentine.jpg` | 150x150px (min) |
| Tết Gold Collection | `tet-gold-2025.jpg` | 150x150px (min) |

## Hướng dẫn:

1. **Tên file phải chính xác** (case-sensitive)
   - ✅ `tiffany-logo.jpg` ✓
   - ❌ `Tiffany-Logo.jpg` ✗

2. **Định dạng**: JPG, PNG (tối ưu hóa size)

3. **Màu sắc**: Logo đơn sắc hoặc màu nhạt (sẽ dùng filter grayscale)

4. **Sau khi upload**:
   - Truy cập: http://localhost:3003
   - Partner banner sẽ hiển thị ở giữa trang Home

## Admin Management:

- Quản lý partners tại: `/admin/partners`
- Có thể:
  - ✅ Thêm partner mới
  - ✅ Chỉnh sửa thông tin
  - ✅ Đặt ngày hiển thị (cho holiday campaigns)
  - ✅ Kích hoạt/tắt partner
  - ✅ Đặt thứ tự hiển thị
  - ✅ Xóa partner

---

**Notes:**
- Partners hiển thị theo thứ tự `position` từ nhỏ đến lớn
- Chỉ hiển thị partners có `isActive = true` và nằm trong khoảng `displayFrom - displayTo`
- Logo sẽ mờ (grayscale) khi không hover, sáng khi hover
