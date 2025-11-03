const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

async function testCRUD() {
  try {
    console.log('1. Logging in as admin...');

    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'admin@example.com',
      password: 'admin123'
    });

    const token = loginResponse.data.token;
    console.log('Token received:', !!token);

    console.log('2. Creating test product...');
    const productData = {
      name: `CRUD Test Product ${Date.now()}`,
      description: 'Product for CRUD testing',
      price: 50000,
      material: 'Bạc 925',
      stock: 2,
      category: 'Nhẫn',
      tags: ['crud','test']
    };

    const createResponse = await axios.post(`${BASE_URL}/products`, productData, {
      headers: { Authorization: `Bearer ${token}` }
    });

    console.log('Created product id:', createResponse.data._id);

    const id = createResponse.data._id;

    console.log('3. Deleting product...');
    const delRes = await axios.delete(`${BASE_URL}/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    console.log('Delete response:', delRes.data);

    console.log('✅ CRUD test passed');
  } catch (error) {
    console.error('❌ Error during CRUD test:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  }
}

testCRUD();
