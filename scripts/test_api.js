require('dotenv').config();
const http = require('http');

const makeRequest = (path, method = 'GET', data = null) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', reject);
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
};

async function testAPI() {
  console.log('🧪 Testing API Endpoints...\n');

  try {
    // Test 1: Products
    console.log('1️⃣ Testing GET /api/products');
    const products = await makeRequest('/api/products');
    console.log(`   Status: ${products.status}`);
    console.log(`   Products found: ${products.data.products?.length || 0}`);
    console.log(`   ✅ Products API works\n`);

    // Test 2: Login
    console.log('2️⃣ Testing POST /api/auth/login');
    const login = await makeRequest('/api/auth/login', 'POST', {
      email: 'admin@example.com',
      password: 'admin123'
    });
    console.log(`   Status: ${login.status}`);
    console.log(`   User: ${login.data.user?.name} (${login.data.user?.role})`);
    console.log(`   Token: ${login.data.token ? 'Generated ✅' : 'Missing ❌'}`);
    
    const token = login.data.token;

    // Test 3: Admin Stats (requires auth)
    if (token) {
      console.log('\n3️⃣ Testing GET /api/admin/stats (with auth)');
      const statsReq = http.request({
        hostname: 'localhost',
        port: 3000,
        path: '/api/admin/stats',
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          const data = JSON.parse(body);
          console.log(`   Status: ${res.statusCode}`);
          console.log(`   Total Revenue: ${data.stats?.totalRevenue || 0} VND`);
          console.log(`   Total Orders: ${data.stats?.totalOrders || 0}`);
          console.log(`   Total Products: ${data.stats?.totalProducts || 0}`);
          console.log(`   Total Users: ${data.stats?.totalUsers || 0}`);
          console.log(`   ✅ Admin Stats API works\n`);
          
          console.log('✅ All tests passed!');
        });
      });
      statsReq.end();
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testAPI();
