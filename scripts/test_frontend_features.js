// Test các chức năng frontend qua browser
const axios = require('axios');

const API_URL = 'http://localhost:3000';

async function testFrontendFeatures() {
  console.log('🧪 Testing Frontend Features...\n');

  try {
    // 1. Test trang chủ
    console.log('1️⃣ Testing homepage...');
    try {
      const homeResponse = await axios.get(`${API_URL}/`);
      console.log('✅ Homepage accessible');
    } catch (e) {
      console.log('ℹ️  Frontend running on different port (expected)');
    }

    // 2. Test collections
    console.log('\n2️⃣ Testing collections...');
    const collectionsResponse = await axios.get(`${API_URL}/api/collections`);
    console.log(`✅ Collections API working - Found ${collectionsResponse.data.length} collections`);

    // 3. Test search
    console.log('\n3️⃣ Testing search...');
    const searchResponse = await axios.get(`${API_URL}/api/products?search=nhan`);
    console.log(`✅ Search API working - Found ${searchResponse.data.products?.length || 0} products`);

    // 4. Test product detail
    console.log('\n4️⃣ Testing product detail...');
    const productsResponse = await axios.get(`${API_URL}/api/products`);
    const products = productsResponse.data.products || productsResponse.data;
    
    if (products.length > 0) {
      const productDetailResponse = await axios.get(`${API_URL}/api/products/${products[0]._id}`);
      console.log('✅ Product detail API working');
    }

    // 5. Test wishlist
    console.log('\n5️⃣ Testing wishlist...');
    
    // Login user
    const userLoginResponse = await axios.post(`${API_URL}/api/auth/login`, {
      email: 'leduongbao2019@gmail.com',
      password: 'password123'
    });
    const userToken = userLoginResponse.data.token;

    if (products.length > 0) {
      // Add to wishlist
      try {
        await axios.post(`${API_URL}/api/users/wishlist`, {
          productId: products[0]._id
        }, {
          headers: { Authorization: `Bearer ${userToken}` }
        });
        console.log('✅ Add to wishlist working');
      } catch (e) {
        if (e.response?.data?.msg === 'Already in wishlist') {
          console.log('✅ Product already in wishlist (expected)');
        } else {
          throw e;
        }
      }

      // Get wishlist
      const wishlistResponse = await axios.get(`${API_URL}/api/users/wishlist`, {
        headers: { Authorization: `Bearer ${userToken}` }
      });
      console.log(`✅ Wishlist API working - Found ${wishlistResponse.data.length} items`);
    }

    // 6. Test profile update
    console.log('\n6️⃣ Testing profile update...');
    const profileResponse = await axios.put(`${API_URL}/api/users/profile`, {
      name: 'Lê Dương Bảo Updated',
      phone: '0123456789'
    }, {
      headers: { Authorization: `Bearer ${userToken}` }
    });
    console.log('✅ Profile update working');

    // 7. Test admin dashboard stats
    console.log('\n7️⃣ Testing admin dashboard...');
    
    // Login admin
    const adminLoginResponse = await axios.post(`${API_URL}/api/auth/login`, {
      email: 'admin@example.com',
      password: 'admin123'
    });
    const adminToken = adminLoginResponse.data.token;

    // Get dashboard stats
    const statsResponse = await axios.get(`${API_URL}/api/admin/stats`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    console.log('✅ Admin dashboard stats working');

    // 8. Test hero banners
    console.log('\n8️⃣ Testing hero banners...');
    const bannersResponse = await axios.get(`${API_URL}/api/hero-banners/active`);
    console.log(`✅ Hero banners API working - Found ${bannersResponse.data.length} banners`);

    console.log('\n🎉 Frontend features test completed successfully!');

  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

testFrontendFeatures();
