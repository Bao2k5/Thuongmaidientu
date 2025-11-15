// Debug trực tiếp trong browser console
// Copy và paste toàn bộ code này vào console và press Enter

(function() {
  console.log('🔍 Bắt đầu debug wishlist...');
  
  // 1. Kiểm tra product hiện tại
  const productCards = document.querySelectorAll('[data-testid="product-card"], .product-card');
  console.log('📦 Số lượng product cards:', productCards.length);
  
  if (productCards.length > 0) {
    const firstCard = productCards[0];
    console.log('📦 First card HTML:', firstCard.innerHTML.substring(0, 200));
  }
  
  // 2. Tìm nút wishlist
  const wishlistButtons = document.querySelectorAll('button:has(.heart), button:has(svg), .wishlist-btn');
  console.log('❤️ Số lượng wishlist buttons:', wishlistButtons.length);
  
  wishlistButtons.forEach((btn, index) => {
    console.log(`❤️ Button ${index}:`, btn.onclick ? 'Có onclick' : 'Không có onclick');
  });
  
  // 3. Kiểm tra window state
  console.log('🔍 Window state:');
  console.log('- window.location:', window.location.href);
  console.log('- window.axios:', typeof window.axios);
  console.log('- window.React:', typeof window.React);
  
  // 4. Kiểm tra stores
  try {
    const stores = window.__VITE_DEVTOOLS_HOOK__?.state?.inspector?.instances;
    console.log('🏪 React stores:', stores ? stores.length : 'Không tìm thấy');
  } catch (e) {
    console.log('🏪 Không thể kiểm tra stores:', e.message);
  }
  
  // 5. Tự động click vào wishlist button đầu tiên
  if (wishlistButtons.length > 0) {
    console.log('🖱️ Auto-click vào wishlist button đầu tiên...');
    wishlistButtons[0].click();
    console.log('✅ Đã click! Kiểm tra console cho errors...');
  } else {
    console.log('❌ Không tìm thấy wishlist buttons');
    
    // Tìm tất cả buttons
    const allButtons = document.querySelectorAll('button');
    console.log('🔘 Tất cả buttons:', allButtons.length);
    allButtons.forEach((btn, index) => {
      if (index < 5) {
        console.log(`Button ${index}:`, btn.textContent.trim(), btn.className);
      }
    });
  }
  
  // 6. Theo dõi network requests
  const originalFetch = window.fetch;
  window.fetch = function(...args) {
    if (args[0] && args[0].includes && args[0].includes('wishlist')) {
      console.log('📡 Fetch Wishlist:', args[0], args[1]);
    }
    return originalFetch.apply(this, args).then(response => {
      if (args[0] && args[0].includes && args[0].includes('wishlist')) {
        console.log('📡 Fetch Response:', response.status);
      }
      return response;
    });
  };
  
  console.log('✅ Debug script loaded! Click vào heart icon hoặc script sẽ auto-click.');
})();
