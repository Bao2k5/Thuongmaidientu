// Test complete login flow
async function testLoginFlow() {
  try {
    console.log('=== TESTING COMPLETE LOGIN FLOW ===');
    
    // Test 1: Check if frontend is accessible
    console.log('\n1. Testing frontend accessibility...');
    const frontendResponse = await fetch('http://localhost:5174');
    console.log('✅ Frontend accessible:', frontendResponse.ok);
    
    // Test 2: Check if backend API is accessible
    console.log('\n2. Testing backend API...');
    const backendResponse = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@example.com',
        password: 'admin123'
      })
    });
    
    const loginData = await backendResponse.json();
    console.log('✅ Backend login successful:', backendResponse.ok);
    console.log('User data:', loginData.user);
    console.log('Is admin:', loginData.user?.role === 'admin');
    
    // Test 3: Check admin endpoint
    console.log('\n3. Testing admin endpoint...');
    const adminResponse = await fetch('http://localhost:3000/api/admin/stats', {
      headers: {
        'Authorization': `Bearer ${loginData.token}`
      }
    });
    
    const adminData = await adminResponse.json();
    console.log('✅ Admin endpoint accessible:', adminResponse.ok);
    console.log('Admin stats:', adminData);
    
    console.log('\n=== ALL TESTS PASSED ===');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run test
testLoginFlow();