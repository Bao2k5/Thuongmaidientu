# 🎨 BTHN Jewelry - Features & Improvements TODO

## ✅ ĐÃ HOÀN THÀNH (Completed)

### Frontend Core
- ✅ All pages render successfully (Home, Products, ProductDetail, Cart, Checkout, Auth)
- ✅ Header with navigation, search, cart/wishlist counters
- ✅ Footer with links and social media
- ✅ Responsive layout structure
- ✅ Tailwind CSS với sky blue theme
- ✅ React Router v6 navigation
- ✅ Zustand state management (auth, cart, wishlist)
- ✅ Mock data cho testing

### Pages Implemented
- ✅ **HomeSimple.jsx** - Hero, Features, Collections, About, Testimonials, Instagram, Products
- ✅ **Products.jsx** - Grid/List view, Filters, Sort, Pagination
- ✅ **ProductDetail.jsx** - Gallery, Info, Tabs, Reviews, Related products
- ✅ **Cart.jsx** - Items list, Quantity controls, Summary
- ✅ **Checkout.jsx** - 3-step process (Shipping, Payment, Review)
- ✅ **Login.jsx** - Login form with social options
- ✅ **Register.jsx** - Registration form
- ✅ **Profile.jsx** - User profile management

---

## 🎯 CẦN CẢI THIỆN (Improvements Needed)

### 1. 🎨 **Design & UX** (ĐANG LÀM)

#### Màu sắc - Color Scheme
- ⚠️ **Sky-900 quá đậm** → Đổi sang sky-700/gray-800 cho headings
- ⚠️ **Sky-700 cho body text** → Đổi sang gray-700 (neutral)
- ✅ Đã tạo custom color palette trong `tailwind.config.js`:
  - `sky-custom-600`: Links & buttons
  - `sky-custom-700`: Headings (lighter than sky-900)
  - `neutral-custom-700`: Body text
  - `neutral-custom-800`: Headings

#### Typography
- 📝 Headings nên lighter weight (font-light/font-normal thay vì font-semibold)
- 📝 Body text tăng line-height cho dễ đọc (leading-relaxed → leading-loose)
- 📝 Letter spacing cho headings (tracking-wide)

#### Spacing & Layout
- 📝 Tăng whitespace giữa các sections
- 📝 Padding/margin cần consistent hơn
- 📝 Card shadows nhẹ nhàng hơn (shadow-sm thay vì shadow-lg)

---

### 2. 🚀 **Features Còn Thiếu** (Missing Features)

#### Products Page
- ❌ **Quick View Modal** - Xem nhanh product không cần chuyển trang
- ❌ **Filter by Material** - Chức năng lọc theo chất liệu chưa hoạt động
- ❌ **Price Range Slider** - UI có nhưng chưa functional
- ❌ **Grid/List Toggle** - Toggle có nhưng List view chưa hoàn chỉnh
- ❌ **Pagination** - UI có nhưng chưa functional
- ❌ **Product Count** - "Hiển thị X sản phẩm" chưa có

#### Product Detail
- ❌ **Image Zoom** - Hover vào ảnh chưa có zoom
- ❌ **Image Lightbox** - Click ảnh mở fullscreen
- ❌ **Add to Wishlist Animation** - Chưa có animation/feedback
- ❌ **Stock Indicator** - Hiển thị "Còn X sản phẩm"
- ❌ **Size Guide Modal** - Modal hướng dẫn đo size
- ❌ **Review Form** - Form viết đánh giá chưa có
- ❌ **Review Pagination** - Nếu nhiều reviews

#### Cart & Checkout
- ❌ **Cart Notification** - Toast khi add to cart
- ❌ **Remove Confirmation** - Confirm trước khi xóa
- ❌ **Save for Later** - Lưu sản phẩm ra khỏi cart
- ❌ **Coupon Code** - Apply mã giảm giá
- ❌ **Shipping Calculator** - Tính phí ship theo địa chỉ
- ❌ **Payment Integration** - Stripe/VNPay chưa connect

#### Header & Navigation
- ❌ **Search Functionality** - Search modal có UI nhưng chưa hoạt động
- ❌ **Search Suggestions** - Autocomplete khi gõ
- ❌ **Search History** - Lưu lịch sử tìm kiếm
- ❌ **Mobile Menu** - Hamburger menu chưa hoàn chỉnh
- ❌ **Mega Menu** - Dropdown menu cho categories
- ❌ **Sticky Header** - Header fixed khi scroll

#### Auth & User
- ❌ **Form Validation** - Validation rules chưa đầy đủ
- ❌ **Password Strength Meter** - Indicator khi đăng ký
- ❌ **Forgot Password Flow** - Reset password qua email
- ❌ **Email Verification** - Verify email sau đăng ký
- ❌ **Social Login** - Google/Facebook login
- ❌ **Order History** - Xem lịch sử đơn hàng
- ❌ **Wishlist Page** - Trang danh sách yêu thích
- ❌ **Address Book** - Quản lý địa chỉ giao hàng

---

### 3. 🔌 **Backend Integration** (API Connection)

#### Products API
- ❌ GET `/api/products` - Lấy danh sách sản phẩm
- ❌ GET `/api/products/:id` - Chi tiết sản phẩm
- ❌ GET `/api/products/search` - Tìm kiếm
- ❌ GET `/api/products/related/:id` - Sản phẩm liên quan

#### Cart API
- ❌ GET `/api/cart` - Lấy giỏ hàng
- ❌ POST `/api/cart` - Thêm vào giỏ
- ❌ PUT `/api/cart/:id` - Cập nhật số lượng
- ❌ DELETE `/api/cart/:id` - Xóa khỏi giỏ

#### Order API
- ❌ POST `/api/orders` - Đặt hàng
- ❌ GET `/api/orders` - Lịch sử đơn hàng
- ❌ GET `/api/orders/:id` - Chi tiết đơn hàng

#### Review API
- ❌ GET `/api/reviews/:productId` - Lấy đánh giá
- ❌ POST `/api/reviews` - Viết đánh giá

#### Auth API
- ❌ POST `/api/auth/register` - Đăng ký
- ❌ POST `/api/auth/login` - Đăng nhập
- ❌ POST `/api/auth/logout` - Đăng xuất
- ❌ GET `/api/auth/me` - Lấy thông tin user

---

### 4. 🐛 **Bugs & Issues**

#### Visual Issues
- ⚠️ **Sky-900 color** - Quá đậm, cần lighter
- ⚠️ Hover effects - Một số nơi thiếu hover state
- ⚠️ Focus states - Input fields thiếu focus indicator
- ⚠️ Loading states - Chưa có skeleton/spinner

#### Functional Issues
- ⚠️ Store persistence - Cart/Wishlist chưa lưu vào localStorage
- ⚠️ Image fallback - Chưa có placeholder khi ảnh lỗi
- ⚠️ Error boundaries - Chưa có error handling UI
- ⚠️ 404 page - Chưa có page not found

#### Performance Issues
- ⚠️ Image optimization - Chưa có lazy loading
- ⚠️ Code splitting - Chưa split routes
- ⚠️ Bundle size - Chưa optimize

---

### 5. 📱 **Mobile Responsive**

- ❌ Mobile navigation menu
- ❌ Touch gestures cho image gallery
- ❌ Mobile filters (bottom sheet)
- ❌ Responsive tables
- ❌ Mobile search overlay

---

### 6. ♿ **Accessibility (A11y)**

- ❌ Keyboard navigation
- ❌ Screen reader support
- ❌ ARIA labels
- ❌ Focus management
- ❌ Color contrast check

---

### 7. 🔍 **SEO & Performance**

- ❌ Meta tags (title, description)
- ❌ Open Graph tags
- ❌ Structured data (JSON-LD)
- ❌ Sitemap.xml
- ❌ Robots.txt
- ❌ Image alt texts
- ❌ Lazy loading images
- ❌ Code splitting
- ❌ Bundle optimization

---

### 8. 🧪 **Testing**

- ❌ Unit tests (Jest)
- ❌ Component tests (React Testing Library)
- ❌ E2E tests (Playwright/Cypress)
- ❌ API integration tests

---

### 9. 📦 **Deployment**

- ❌ Environment variables setup
- ❌ Build optimization
- ❌ CI/CD pipeline
- ❌ Hosting setup (Vercel/Netlify)
- ❌ Domain & SSL
- ❌ Analytics (Google Analytics)
- ❌ Error tracking (Sentry)

---

## 🎯 PRIORITY ORDER (Thứ tự ưu tiên)

### 🔥 HIGH PRIORITY - LÀM NGAY
1. ✅ **Fix màu sắc** - Đổi sky-900 sang lighter colors
2. **Backend API Integration** - Connect real data
3. **Search Functionality** - Làm search hoạt động
4. **Cart Notifications** - Toast khi add/remove
5. **Form Validation** - Validate tất cả forms

### 🟡 MEDIUM PRIORITY - LÀM SAU
6. **Quick View Modal** - Product quick view
7. **Image Zoom** - Zoom on hover/click
8. **Mobile Menu** - Hamburger navigation
9. **Loading States** - Skeleton/spinner
10. **Error Handling** - Error boundaries

### 🔵 LOW PRIORITY - NẾU CÒN THỜI GIAN
11. **Wishlist Page** - Full wishlist page
12. **Order History** - User order history
13. **Social Login** - Google/Facebook
14. **Image Lightbox** - Fullscreen gallery
15. **Review Form** - Write reviews

---

## 📊 PROGRESS TRACKING

**Total Tasks:** ~80
**Completed:** ~25 (31%)
**In Progress:** 1 (Color scheme)
**Pending:** ~54 (69%)

**Estimated Time:**
- Color fixes: 2 hours ⏰ (ĐANG LÀM)
- Backend integration: 8-12 hours
- Missing features: 15-20 hours
- Testing & polish: 5-8 hours
- **TOTAL:** ~30-42 hours

---

## 💡 NOTES

- Backend API đã sẵn sàng - chỉ cần connect
- Mock data structure match với API response
- Stores đã setup - chỉ cần thêm API calls
- Design foundation tốt - chỉ cần refine colors
- Code structure clean - dễ maintain & scale

---

**Last Updated:** October 6, 2025
**Status:** Color scheme improvements in progress
