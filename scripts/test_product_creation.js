// Test script to login as admin and create a product
const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

async function testProductCreation() {
  try {
    console.log('1. Logging in as admin...');

    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'admin@example.com',
      password: 'admin123'
    });

    console.log('Login response:', loginResponse.data);

    if (!loginResponse.data.token) {
      throw new Error('No token received from login');
    }

    const token = loginResponse.data.token;
    console.log('Token received:', token.substring(0, 20) + '...');

    console.log('2. Creating test product...');

    const productData = {
      name: `Test Silver Product ${Date.now()}`,
      description: 'A test product with silver material',
      price: 100000,
      material: 'Bạc 925',
      weight: 10,
      stock: 5,
      category: 'jewelry',
      tags: ['test', 'silver']
    };

    const createResponse = await axios.post(`${BASE_URL}/products`, productData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Product creation response:', createResponse.data);
    console.log('✅ Product created successfully!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
      console.error('Headers:', error.response.headers);
    } else if (error.request) {
      console.error('No response received. Request details:', error.request);
    } else {
      console.error('Request setup error:', error.message);
    }
  }
}

testProductCreation();