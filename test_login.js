// Test login admin
const axios = require('axios');

async function testLogin() {
  try {
    console.log('Testing admin login...');
    
    const response = await axios.post('http://localhost:3000/api/auth/login', {
      email: 'admin@example.com',
      password: 'admin123'
    });
    
    console.log('✅ Login successful!');
    console.log('User:', response.data.user);
    console.log('Role:', response.data.user.role);
    console.log('Token:', response.data.token.substring(0, 20) + '...');
    
    // Test admin endpoint
    console.log('\nTesting admin stats endpoint...');
    const statsResponse = await axios.get('http://localhost:3000/api/admin/stats', {
      headers: {
        'Authorization': `Bearer ${response.data.token}`
      }
    });
    
    console.log('✅ Admin stats:', statsResponse.data);
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

testLogin();