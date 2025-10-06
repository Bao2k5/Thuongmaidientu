// API Base URL
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Categories
export const CATEGORIES = [
  { id: 'rings', name: 'Nhẫn', slug: 'nhan', icon: '💍' },
  { id: 'necklaces', name: 'Dây Chuyền', slug: 'day-chuyen', icon: '📿' },
  { id: 'bracelets', name: 'Lắc Tay', slug: 'lac-tay', icon: '⛓️' },
  { id: 'earrings', name: 'Hoa Tai', slug: 'hoa-tai', icon: '👂' },
];

// Order Status
export const ORDER_STATUS = {
  PENDING: { value: 'pending', label: 'Chờ xử lý', color: 'yellow' },
  PAID: { value: 'paid', label: 'Đã thanh toán', color: 'blue' },
  PROCESSING: { value: 'processing', label: 'Đang xử lý', color: 'indigo' },
  SHIPPED: { value: 'shipped', label: 'Đang giao hàng', color: 'purple' },
  COMPLETED: { value: 'completed', label: 'Hoàn thành', color: 'green' },
  CANCELLED: { value: 'cancelled', label: 'Đã hủy', color: 'red' },
};

// Price Ranges for Filter
export const PRICE_RANGES = [
  { id: 1, label: 'Dưới 500,000đ', min: 0, max: 500000 },
  { id: 2, label: '500,000đ - 1,000,000đ', min: 500000, max: 1000000 },
  { id: 3, label: '1,000,000đ - 2,000,000đ', min: 1000000, max: 2000000 },
  { id: 4, label: '2,000,000đ - 5,000,000đ', min: 2000000, max: 5000000 },
  { id: 5, label: 'Trên 5,000,000đ', min: 5000000, max: Infinity },
];

// Sort Options
export const SORT_OPTIONS = [
  { value: 'newest', label: 'Mới nhất' },
  { value: 'price-asc', label: 'Giá: Thấp đến cao' },
  { value: 'price-desc', label: 'Giá: Cao đến thấp' },
  { value: 'name-asc', label: 'Tên: A-Z' },
  { value: 'name-desc', label: 'Tên: Z-A' },
  { value: 'rating', label: 'Đánh giá cao nhất' },
];

// Social Links
export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/jewelrybthn',
  instagram: 'https://instagram.com/jewelrybthn',
  tiktok: 'https://tiktok.com/@jewelrybthn',
  zalo: 'https://zalo.me/jewelrybthn',
};

// Contact Info
export const CONTACT_INFO = {
  phone: '0965990895',
  email: 'contact@jewelrybthn.com',
  address: '123 Nguyễn Trãi, Quận 1, TP.HCM',
};

// Shipping Fee
export const SHIPPING_FEE = 30000;

// Free shipping threshold
export const FREE_SHIPPING_THRESHOLD = 500000;

// Default pagination
export const DEFAULT_PAGE_SIZE = 12;

// Rating stars
export const RATING_LABELS = {
  1: 'Rất tệ',
  2: 'Tệ',
  3: 'Bình thường',
  4: 'Tốt',
  5: 'Rất tốt',
};

// Flash Sale countdown duration (in seconds)
export const FLASH_SALE_DURATION = 24 * 60 * 60; // 24 hours

// Image placeholders
export const PLACEHOLDER_IMAGES = {
  product: '/placeholder-product.jpg',
  avatar: '/placeholder-avatar.jpg',
  banner: '/placeholder-banner.jpg',
};

// Payment methods
export const PAYMENT_METHODS = [
  { id: 'cod', name: 'Thanh toán khi nhận hàng (COD)', icon: '💵' },
  { id: 'stripe', name: 'Thanh toán online (Thẻ/QR)', icon: '💳' },
];
