const puppeteer = require('puppeteer');
const axios = require('axios');

async function debugWishlist() {
  console.log('🔍 Bắt đầu debug wishlist...');
  
  // 1. Kiểm tra backend trước
  try {
    console.log('1️⃣ Kiểm tra backend...');
    const login = await axios.post('http://localhost:3000/api/auth/login', {
      email: 'admin@example.com',
      password: 'admin123'
    });
    
    const wishlistResponse = await axios.get('http://localhost:3000/api/users/wishlist', {
      headers: { Authorization: 'Bearer ' + login.data.token }
    });
    console.log('✅ Backend hoạt động tốt');
  } catch (error) {
    console.log('❌ Backend lỗi:', error.response?.data || error.message);
    return;
  }

  // 2. Kiểm tra frontend với Puppeteer
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  // Theo dõi console errors
  const consoleMessages = [];
  page.on('console', msg => {
    consoleMessages.push({
      type: msg.type(),
      text: msg.text(),
      location: msg.location()
    });
    
    if (msg.type() === 'error') {
      console.log('🚨 Console Error:', msg.text());
    }
  });
  
  // Theo dõi network requests
  const networkRequests = [];
  page.on('request', request => {
    networkRequests.push({
      url: request.url(),
      method: request.method(),
      headers: request.headers()
    });
  });
  
  page.on('response', response => {
    if (response.url().includes('wishlist')) {
      console.log(`📡 Wishlist Request: ${response.status()} - ${response.url()}`);
    }
  });

  try {
    console.log('2️⃣ Mở frontend...');
    await page.goto('http://localhost:3001');
    
    // Đăng nhập
    console.log('3️⃣ Đăng nhập...');
    await page.waitForSelector('input[type="email"]', { timeout: 5000 });
    await page.type('input[type="email"]', 'admin@example.com');
    await page.type('input[type="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(2000);
    
    // Tìm sản phẩm và click heart
    console.log('4️⃣ Tìm sản phẩm...');
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 5000 });
    
    // Click vào heart icon đầu tiên
    const heartIcon = await page.$('.heart-icon, [data-testid="wishlist-button"], button:has(svg)');
    if (heartIcon) {
      console.log('5️⃣ Click vào heart icon...');
      await heartIcon.click();
      await page.waitForTimeout(3000);
    } else {
      console.log('❌ Không tìm thấy heart icon');
    }
    
    // Phân tích lỗi
    console.log('6️⃣ Phân tích lỗi...');
    const errors = consoleMessages.filter(msg => msg.type === 'error');
    const wishlistRequests = networkRequests.filter(req => req.url.includes('wishlist'));
    
    console.log('\n📊 Kết quả phân tích:');
    console.log(`- Console errors: ${errors.length}`);
    console.log(`- Wishlist requests: ${wishlistRequests.length}`);
    
    if (errors.length > 0) {
      console.log('\n🚨 Danh sách lỗi:');
      errors.forEach((error, index) => {
        console.log(`${index + 1}. ${error.text}`);
        if (error.location) {
          console.log(`   📍 ${error.location.url}:${error.location.lineNumber}`);
        }
      });
    }
    
    if (wishlistRequests.length > 0) {
      console.log('\n📡 Wishlist Requests:');
      wishlistRequests.forEach((req, index) => {
        console.log(`${index + 1}. ${req.method} ${req.url}`);
        console.log(`   Headers:`, JSON.stringify(req.headers, null, 2));
      });
    }
    
  } catch (error) {
    console.log('❌ Lỗi trong quá trình test:', error.message);
  } finally {
    await browser.close();
  }
}

debugWishlist().catch(console.error);
