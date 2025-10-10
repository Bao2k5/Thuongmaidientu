// Test comprehensive system functionality
const axios = require('axios');

const BASE_URL = 'http://localhost:3000';
let authToken = '';
let adminToken = '';

// Helper function to log results
const log = (message, data = null) => {
  console.log(`\n${message}`);
  if (data) console.log(JSON.stringify(data, null, 2));
};

// Test 1: Admin Login
async function testAdminLogin() {
  try {
    log('🔐 Testing Admin Login...');
    const response = await axios.post(`${BASE_URL}/api/auth/login`, {
      email: 'admin@example.com',
      password: 'admin123'
    });
    adminToken = response.data.token;
    log('✅ Admin Login: SUCCESS', {
      user: response.data.user,
      hasToken: !!response.data.token
    });
    return true;
  } catch (error) {
    log('❌ Admin Login: FAILED', error.response?.data || error.message);
    return false;
  }
}

// Test 2: User Registration
async function testUserRegistration() {
  try {
    log('📝 Testing User Registration...');
    const testUser = {
      name: 'Test User',
      email: `testuser${Date.now()}@example.com`,
      password: 'password123'
    };
    const response = await axios.post(`${BASE_URL}/api/auth/register`, testUser);
    authToken = response.data.token;
    log('✅ User Registration: SUCCESS', {
      user: response.data.user,
      hasToken: !!response.data.token
    });
    return true;
  } catch (error) {
    log('❌ User Registration: FAILED', error.response?.data || error.message);
    return false;
  }
}

// Test 3: Get Products
async function testGetProducts() {
  try {
    log('🛍️  Testing Get Products...');
    const response = await axios.get(`${BASE_URL}/api/products`);
    log('✅ Get Products: SUCCESS', {
      totalProducts: response.data.products?.length || 0,
      sampleProduct: response.data.products?.[0]?.name
    });
    return true;
  } catch (error) {
    log('❌ Get Products: FAILED', error.response?.data || error.message);
    return false;
  }
}

// Test 4: Cart Operations
async function testCartOperations() {
  try {
    log('🛒 Testing Cart Operations...');
    
    // Get products first
    const productsRes = await axios.get(`${BASE_URL}/api/products`);
    if (!productsRes.data.products || productsRes.data.products.length === 0) {
      log('⚠️  No products available for cart test');
      return false;
    }
    
    const productId = productsRes.data.products[0]._id;
    
    // Add to cart
    const addResponse = await axios.post(
      `${BASE_URL}/api/cart`,
      { productId, qty: 2 },
      { headers: { Authorization: `Bearer ${authToken}` } }
    );
    
    log('✅ Add to Cart: SUCCESS', {
      cartItems: addResponse.data.cart?.items?.length || 0
    });
    
    // Get cart
    const getResponse = await axios.get(`${BASE_URL}/api/cart`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    log('✅ Get Cart: SUCCESS', {
      itemCount: getResponse.data.cart?.items?.length || 0
    });
    
    return true;
  } catch (error) {
    log('❌ Cart Operations: FAILED', error.response?.data || error.message);
    return false;
  }
}

// Test 5: Wishlist Operations
async function testWishlistOperations() {
  try {
    log('❤️  Testing Wishlist Operations...');
    
    // Get products first
    const productsRes = await axios.get(`${BASE_URL}/api/products`);
    if (!productsRes.data.products || productsRes.data.products.length === 0) {
      log('⚠️  No products available for wishlist test');
      return false;
    }
    
    const productId = productsRes.data.products[0]._id;
    
    // Add to wishlist
    const addResponse = await axios.post(
      `${BASE_URL}/api/users/wishlist`,
      { productId },
      { headers: { Authorization: `Bearer ${authToken}` } }
    );
    
    log('✅ Add to Wishlist: SUCCESS');
    
    // Get wishlist
    const getResponse = await axios.get(`${BASE_URL}/api/users/wishlist`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    log('✅ Get Wishlist: SUCCESS', {
      itemCount: getResponse.data.wishlist?.length || 0
    });
    
    return true;
  } catch (error) {
    log('❌ Wishlist Operations: FAILED', error.response?.data || error.message);
    return false;
  }
}

// Test 6: Admin Stats
async function testAdminStats() {
  try {
    log('📊 Testing Admin Stats...');
    const response = await axios.get(`${BASE_URL}/api/admin/stats`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    log('✅ Admin Stats: SUCCESS', response.data);
    return true;
  } catch (error) {
    log('❌ Admin Stats: FAILED', error.response?.data || error.message);
    return false;
  }
}

// Test 7: Protected Routes
async function testProtectedRoutes() {
  try {
    log('🔒 Testing Protected Routes...');
    
    // Try accessing admin route without token
    try {
      await axios.get(`${BASE_URL}/api/admin/stats`);
      log('❌ Protected Routes: FAILED - Should require auth');
      return false;
    } catch (error) {
      if (error.response?.status === 401) {
        log('✅ Protected Routes: SUCCESS - Unauthorized access blocked');
        return true;
      }
    }
    return false;
  } catch (error) {
    log('❌ Protected Routes: FAILED', error.message);
    return false;
  }
}

// Run all tests
async function runAllTests() {
  console.log('\n═══════════════════════════════════════════');
  console.log('🧪 STARTING COMPREHENSIVE SYSTEM TESTS');
  console.log('═══════════════════════════════════════════');
  
  const results = {
    adminLogin: await testAdminLogin(),
    userRegistration: await testUserRegistration(),
    getProducts: await testGetProducts(),
    cartOperations: await testCartOperations(),
    wishlistOperations: await testWishlistOperations(),
    adminStats: await testAdminStats(),
    protectedRoutes: await testProtectedRoutes()
  };
  
  console.log('\n═══════════════════════════════════════════');
  console.log('📊 TEST RESULTS SUMMARY');
  console.log('═══════════════════════════════════════════');
  
  const totalTests = Object.keys(results).length;
  const passedTests = Object.values(results).filter(r => r === true).length;
  const failedTests = totalTests - passedTests;
  
  Object.entries(results).forEach(([test, passed]) => {
    const icon = passed ? '✅' : '❌';
    const status = passed ? 'PASSED' : 'FAILED';
    console.log(`${icon} ${test}: ${status}`);
  });
  
  console.log('\n═══════════════════════════════════════════');
  console.log(`Total Tests: ${totalTests}`);
  console.log(`✅ Passed: ${passedTests}`);
  console.log(`❌ Failed: ${failedTests}`);
  console.log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);
  console.log('═══════════════════════════════════════════\n');
  
  if (passedTests === totalTests) {
    console.log('🎉 ALL TESTS PASSED! System is working perfectly! 🎉\n');
  } else {
    console.log('⚠️  Some tests failed. Please check the logs above.\n');
  }
}

// Execute tests
runAllTests().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
