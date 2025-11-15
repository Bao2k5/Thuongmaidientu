// Test real wishlist functionality
const axios = require('axios');

const API_BASE_URL = 'http://localhost:3000/api';

// Test with actual data
async function testWishlistReal() {
  try {
    console.log('🧪 Testing Wishlist API with real data...\n');

    // 1. First check if backend is running
    console.log('1. Checking backend status...');
    try {
      const healthCheck = await axios.get(`${API_BASE_URL}/`, { timeout: 5000 });
      console.log('✅ Backend is running');
    } catch (error) {
      console.log('❌ Backend not responding:', error.message);
      return;
    }

    // 2. Check if there are products
    console.log('\n2. Checking available products...');
    try {
      const productsResponse = await axios.get(`${API_BASE_URL}/products`, { timeout: 5000 });
      const products = productsResponse.data;
      
      if (!products || products.length === 0) {
        console.log('❌ No products found in database');
        console.log('💡 You need to add products first via admin panel');
        return;
      }
      
      console.log(`✅ Found ${products.length} products`);
      const sampleProduct = products[0];
      console.log('Sample product:', {
        _id: sampleProduct._id,
        name: sampleProduct.name,
        price: sampleProduct.price
      });
      
      // 3. Try to create a test user and login
      console.log('\n3. Creating test user...');
      const testUser = {
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password123'
      };
      
      let token;
      try {
        // Try to register
        await axios.post(`${API_BASE_URL}/auth/register`, testUser, { timeout: 5000 });
        console.log('✅ Test user created');
      } catch (error) {
        // User might already exist, try to login
        console.log('ℹ️ User might already exist, trying login...');
      }
      
      // Login
      const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
        email: testUser.email,
        password: testUser.password
      }, { timeout: 5000 });
      
      token = loginResponse.data.token;
      console.log('✅ Login successful');
      
      // 4. Test wishlist operations
      const authApi = axios.create({
        baseURL: API_BASE_URL,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        timeout: 10000
      });
      
      // Test fetch wishlist
      console.log('\n4. Testing fetch wishlist...');
      try {
        const wishlistResponse = await authApi.get('/users/wishlist');
        console.log('✅ Fetch wishlist successful');
        console.log('Current wishlist:', wishlistResponse.data);
      } catch (error) {
        console.log('❌ Fetch wishlist failed:', error.response?.data || error.message);
      }
      
      // Test add to wishlist
      console.log('\n5. Testing add to wishlist...');
      try {
        const addResponse = await authApi.post('/users/wishlist', { 
          productId: sampleProduct._id
        });
        console.log('✅ Add to wishlist successful');
        console.log('Response:', addResponse.data);
      } catch (error) {
        console.log('❌ Add to wishlist failed:', error.response?.data || error.message);
      }
      
      // Test fetch again to verify
      console.log('\n6. Verifying wishlist after adding...');
      try {
        const wishlistResponse = await authApi.get('/users/wishlist');
        console.log('✅ Wishlist after adding:', wishlistResponse.data);
      } catch (error) {
        console.log('❌ Verify failed:', error.response?.data || error.message);
      }
      
      // Test remove from wishlist
      console.log('\n7. Testing remove from wishlist...');
      try {
        const removeResponse = await authApi.delete(`/users/wishlist/${sampleProduct._id}`);
        console.log('✅ Remove from wishlist successful');
        console.log('Response:', removeResponse.data);
      } catch (error) {
        console.log('❌ Remove from wishlist failed:', error.response?.data || error.message);
      }
      
    } catch (error) {
      console.log('❌ Product check failed:', error.response?.data || error.message);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testWishlistReal();
