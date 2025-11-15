// Test script to diagnose wishlist functionality issues
const axios = require('axios');

// Test configuration
const API_BASE_URL = 'http://localhost:3000/api';

// Test user credentials (you'll need to replace these with actual test user credentials)
const testUser = {
  email: 'test@example.com',
  password: 'password123'
};

async function testWishlistAPI() {
  try {
    console.log('🧪 Testing Wishlist API...\n');

    // 1. Test login to get token
    console.log('1. Testing login...');
    const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, testUser);
    const token = loginResponse.data.token;
    console.log('✅ Login successful, token obtained');

    // Set up axios instance with auth header
    const authApi = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    // 2. Test fetching wishlist
    console.log('\n2. Testing fetch wishlist...');
    try {
      const wishlistResponse = await authApi.get('/users/wishlist');
      console.log('✅ Fetch wishlist successful');
      console.log('Wishlist data:', JSON.stringify(wishlistResponse.data, null, 2));
    } catch (error) {
      console.log('❌ Fetch wishlist failed:', error.response?.data || error.message);
    }

    // 3. Test adding to wishlist (you'll need a valid product ID)
    console.log('\n3. Testing add to wishlist...');
    try {
      const addResponse = await authApi.post('/users/wishlist', { 
        productId: '507f1f77bcf86cd799439011' // Replace with actual product ID
      });
      console.log('✅ Add to wishlist successful');
      console.log('Add response:', JSON.stringify(addResponse.data, null, 2));
    } catch (error) {
      console.log('❌ Add to wishlist failed:', error.response?.data || error.message);
    }

    // 4. Test removing from wishlist
    console.log('\n4. Testing remove from wishlist...');
    try {
      const removeResponse = await authApi.delete('/users/wishlist/507f1f77bcf86cd799439011');
      console.log('✅ Remove from wishlist successful');
      console.log('Remove response:', JSON.stringify(removeResponse.data, null, 2));
    } catch (error) {
      console.log('❌ Remove from wishlist failed:', error.response?.data || error.message);
    }

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

// Run the test
testWishlistAPI();
