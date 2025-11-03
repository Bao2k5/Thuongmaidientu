const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3000/api';
const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASS = 'admin123';

let token = '';
let testProductId = '';
let testUserId = '';

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(emoji, message, color = colors.reset) {
  console.log(`${color}${emoji} ${message}${colors.reset}`);
}

function success(message) { log('✅', message, colors.green); }
function error(message) { log('❌', message, colors.red); }
function info(message) { log('ℹ️', message, colors.cyan); }
function section(message) { log('📋', message, colors.blue); }

async function test1_AdminLogin() {
  section('TEST 1: Admin Login & Authentication');
  try {
    const res = await axios.post(`${BASE_URL}/auth/login`, {
      email: ADMIN_EMAIL,
      password: ADMIN_PASS
    });
    
    if (!res.data.token) throw new Error('No token received');
    if (res.data.user.role !== 'admin') throw new Error('User is not admin');
    
    token = res.data.token;
    success('Admin login successful, token received');
    return true;
  } catch (e) {
    error(`Login failed: ${e.response?.data?.message || e.message}`);
    return false;
  }
}

async function test2_ProductCRUD() {
  section('TEST 2: Product CRUD Operations');
  
  try {
    // CREATE
    info('2.1 Creating product...');
    const createRes = await axios.post(`${BASE_URL}/products`, {
      name: `Admin Test Product ${Date.now()}`,
      description: 'Test product for admin testing',
      price: 150000,
      priceSale: 120000,
      material: 'Bạc 925',
      stock: 10,
      category: 'Nhẫn',
      tags: ['admin-test']
    }, { headers: { Authorization: `Bearer ${token}` } });
    
    testProductId = createRes.data._id;
    success(`Product created: ${testProductId}`);
    
    // READ
    info('2.2 Reading product...');
    const readRes = await axios.get(`${BASE_URL}/products/${testProductId}`);
    if (readRes.data.name.includes('Admin Test')) {
      success('Product read successfully');
    } else {
      throw new Error('Product data mismatch');
    }
    
    // UPDATE
    info('2.3 Updating product...');
    const updateRes = await axios.put(`${BASE_URL}/products/${testProductId}`, {
      price: 200000,
      stock: 15
    }, { headers: { Authorization: `Bearer ${token}` } });
    
    if (updateRes.data.price === 200000) {
      success('Product updated successfully');
    } else {
      throw new Error('Product update failed');
    }
    
    // DELETE
    info('2.4 Deleting product...');
    await axios.delete(`${BASE_URL}/products/${testProductId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    success('Product deleted successfully');
    
    return true;
  } catch (e) {
    error(`Product CRUD failed: ${e.response?.data?.message || e.message}`);
    if (e.response?.data) console.error('Response:', e.response.data);
    return false;
  }
}

async function test3_ImageUpload() {
  section('TEST 3: Image Upload');
  
  try {
    // Create a simple test image buffer (1x1 PNG)
    const testImageBuffer = Buffer.from([
      0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A,
      0x00, 0x00, 0x00, 0x0D, 0x49, 0x48, 0x44, 0x52,
      0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
      0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53,
      0xDE, 0x00, 0x00, 0x00, 0x0C, 0x49, 0x44, 0x41,
      0x54, 0x08, 0xD7, 0x63, 0xF8, 0xFF, 0xFF, 0x3F,
      0x00, 0x05, 0xFE, 0x02, 0xFE, 0xDC, 0xCC, 0x59,
      0xE7, 0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4E,
      0x44, 0xAE, 0x42, 0x60, 0x82
    ]);
    
    const form = new FormData();
    form.append('image', testImageBuffer, { filename: 'test.png', contentType: 'image/png' });
    
    const res = await axios.post(`${BASE_URL}/upload/image`, form, {
      headers: {
        ...form.getHeaders(),
        Authorization: `Bearer ${token}`
      }
    });
    
    if (res.data.url && res.data.public_id) {
      success(`Image uploaded: ${res.data.url}`);
      return true;
    } else {
      throw new Error('No URL or public_id in response');
    }
  } catch (e) {
    error(`Image upload failed: ${e.response?.data?.message || e.message}`);
    if (e.response?.status === 404) {
      error('Upload endpoint not found - check route mounting');
    }
    return false;
  }
}

async function test4_OrderManagement() {
  section('TEST 4: Order Management');
  
  try {
    info('4.1 Listing orders...');
    const listRes = await axios.get(`${BASE_URL}/admin/orders`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    success(`Found ${listRes.data.orders?.length || 0} orders`);
    
    if (listRes.data.orders && listRes.data.orders.length > 0) {
      const orderId = listRes.data.orders[0]._id;
      
      info('4.2 Getting order detail...');
      const detailRes = await axios.get(`${BASE_URL}/admin/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      success('Order detail retrieved');
      
      info('4.3 Updating order status...');
      const statusRes = await axios.put(`${BASE_URL}/admin/orders/${orderId}/status`, {
        status: 'processing'
      }, { headers: { Authorization: `Bearer ${token}` } });
      success('Order status updated');
    } else {
      info('No orders to test with');
    }
    
    return true;
  } catch (e) {
    error(`Order management failed: ${e.response?.data?.message || e.message}`);
    return false;
  }
}

async function test5_UserManagement() {
  section('TEST 5: User Management');
  
  try {
    info('5.1 Listing users...');
    const listRes = await axios.get(`${BASE_URL}/admin/users`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    success(`Found ${listRes.data.users?.length || 0} users`);
    
    if (listRes.data.users && listRes.data.users.length > 1) {
      // Find a non-admin user
      const user = listRes.data.users.find(u => u.role !== 'admin');
      if (user) {
        testUserId = user._id;
        
        info('5.2 Getting user detail...');
        const detailRes = await axios.get(`${BASE_URL}/admin/users/${testUserId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        success('User detail retrieved');
      }
    }
    
    return true;
  } catch (e) {
    error(`User management failed: ${e.response?.data?.message || e.message}`);
    return false;
  }
}

async function test6_AdminStats() {
  section('TEST 6: Admin Dashboard Stats');
  
  try {
    const res = await axios.get(`${BASE_URL}/admin/stats`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    const stats = res.data.stats || res.data;
    info(`Total Revenue: ${stats.totalRevenue || 0} VND`);
    info(`Total Orders: ${stats.totalOrders || 0}`);
    info(`Total Products: ${stats.totalProducts || 0}`);
    info(`Total Users: ${stats.totalUsers || 0}`);
    
    success('Admin stats retrieved successfully');
    return true;
  } catch (e) {
    error(`Admin stats failed: ${e.response?.data?.message || e.message}`);
    return false;
  }
}

async function runAllTests() {
  console.log('\n' + '='.repeat(60));
  console.log('🚀 COMPREHENSIVE ADMIN FUNCTIONALITY TEST');
  console.log('='.repeat(60) + '\n');
  
  const results = {
    total: 0,
    passed: 0,
    failed: 0
  };
  
  const tests = [
    { name: 'Admin Login', fn: test1_AdminLogin },
    { name: 'Product CRUD', fn: test2_ProductCRUD },
    { name: 'Image Upload', fn: test3_ImageUpload },
    { name: 'Order Management', fn: test4_OrderManagement },
    { name: 'User Management', fn: test5_UserManagement },
    { name: 'Admin Stats', fn: test6_AdminStats }
  ];
  
  for (const test of tests) {
    results.total++;
    const passed = await test.fn();
    if (passed) {
      results.passed++;
    } else {
      results.failed++;
    }
    console.log(''); // spacing
  }
  
  console.log('='.repeat(60));
  console.log(`📊 TEST RESULTS: ${results.passed}/${results.total} passed, ${results.failed} failed`);
  console.log('='.repeat(60) + '\n');
  
  if (results.failed > 0) {
    error('Some tests failed. Please fix the issues above.');
    process.exit(1);
  } else {
    success('All tests passed! 🎉');
    process.exit(0);
  }
}

runAllTests().catch(err => {
  error(`Fatal error: ${err.message}`);
  process.exit(1);
});
