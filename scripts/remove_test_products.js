const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';
const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASS = 'admin123';

(async function(){
  try{
    console.log('Logging in as admin...');
    const loginRes = await axios.post(`${BASE_URL}/auth/login`, { email: ADMIN_EMAIL, password: ADMIN_PASS });
    const token = loginRes.data.token;
    if(!token) throw new Error('No token received');
    console.log('Authenticated. Fetching products matching "Test"...');
    const listRes = await axios.get(`${BASE_URL}/products?q=Test`);
    const products = listRes.data.products || listRes.data;
    console.log(`Found ${products.length} product(s) to delete.`);
    for(const p of products){
      try{
        const id = p._id || p.id;
        process.stdout.write(`- Deleting ${id} / ${p.name} ... `);
        const del = await axios.delete(`${BASE_URL}/products/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        console.log('OK');
      } catch(e){
        console.log('FAILED', e.response?.data || e.message);
      }
    }
    console.log('Done.');
  } catch (e){
    console.error('Error:', e.response?.data || e.message);
    process.exit(1);
  }
})();
