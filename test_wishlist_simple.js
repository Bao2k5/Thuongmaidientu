// Simple wishlist test with real product
const axios = require('axios');

const API_BASE_URL = 'http://localhost:3000/api';
const PRODUCT_ID = '6917f595c89a3a46c8af8f73'; // Real product ID from database

async function quickTest() {
  try {
    console.log('🧪 Quick Wishlist Test\n');
    
    // 1. Login with existing user or create new
    console.log('1. Testing login...');
    let token;
    try {
      const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
        email: 'admin@example.com',
        password: 'admin123'
      }, { timeout: 5000 });
      token = loginResponse.data.token;
      console.log('✅ Login successful with admin user');
    } catch (error) {
      console.log('❌ Admin login failed, trying to register new user...');
      try {
        // Register new user
        await axios.post(`${API_BASE_URL}/auth/register`, {
          name: 'Test User',
          email: 'testuser123@example.com',
          password: 'password123'
        }, { timeout: 5000 });
        
        // Login with new user
        const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
          email: 'testuser123@example.com',
          password: 'password123'
        }, { timeout: 5000 });
        token = loginResponse.data.token;
        console.log('✅ New user created and logged in');
      } catch (regError) {
        console.log('❌ Registration failed:', regError.response?.data || regError.message);
        return;
      }
    }
    
    // 2. Setup authenticated API
    const authApi = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      timeout: 10000
    });
    
    // 3. Test add to wishlist
    console.log('\n2. Testing add to wishlist...');
    console.log(`Product ID: ${PRODUCT_ID}`);
    
    try {
      const addResponse = await authApi.post('/users/wishlist', { 
        productId: PRODUCT_ID
      });
      console.log('✅ Add to wishlist successful!');
      console.log('Response:', addResponse.data);
    } catch (error) {
      console.log('❌ Add to wishlist failed:');
      console.log('Status:', error.response?.status);
      console.log('Data:', error.response?.data);
      console.log('Message:', error.message);
    }
    
    // 4. Test fetch wishlist
    console.log('\n3. Testing fetch wishlist...');
    try {
      const fetchResponse = await authApi.get('/users/wishlist');
      console.log('✅ Fetch wishlist successful!');
      console.log('Wishlist items:', fetchResponse.data.wishlist?.length || 0);
      console.log('Data:', JSON.stringify(fetchResponse.data, null, 2));
    } catch (error) {
      console.log('❌ Fetch wishlist failed:');
      console.log('Status:', error.response?.status);
      console.log('Data:', error.response?.data);
      console.log('Message:', error.message);
    }
    
    // 5. Test remove from wishlist
    console.log('\n4. Testing remove from wishlist...');
    try {
      const removeResponse = await authApi.delete(`/users/wishlist/${PRODUCT_ID}`);
      console.log('✅ Remove from wishlist successful!');
      console.log('Response:', removeResponse.data);
    } catch (error) {
      console.log('❌ Remove from wishlist failed:');
      console.log('Status:', error.response?.status);
      console.log('Data:', error.response?.data);
      console.log('Message:', error.message);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

quickTest();
