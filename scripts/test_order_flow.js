// Test đơn giản chức năng đơn hàng
const axios = require('axios');

const API_URL = 'http://localhost:3000';

async function testOrderFlow() {
  console.log('🧪 Testing Order Flow...\n');

  try {
    // 1. Login admin để lấy token
    console.log('1️⃣ Login admin...');
    const loginResponse = await axios.post(`${API_URL}/api/auth/login`, {
      email: 'admin@example.com',
      password: 'admin123'
    });
    const adminToken = loginResponse.data.token;
    console.log('✅ Admin login successful');

    // 2. Lấy danh sách sản phẩm
    console.log('\n2️⃣ Getting products...');
    const productsResponse = await axios.get(`${API_URL}/api/products`);
    const products = productsResponse.data.products || productsResponse.data;
    console.log(`✅ Found ${products.length} products`);

    if (products.length === 0) {
      console.log('❌ No products found. Creating test product...');
      
      // Tạo sản phẩm test
      const createProductResponse = await axios.post(`${API_URL}/api/products`, {
        name: 'Test Product for Order',
        slug: 'test-product-order-' + Date.now(),
        description: 'Test product description',
        price: 100000,
        stock: 10,
        category: 'jewelry',
        images: [{ url: 'test.jpg', public_id: 'test_image' }]
      }, {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      
      console.log('✅ Test product created');
    }

    // 3. Lấy sản phẩm để test
    const updatedProductsResponse = await axios.get(`${API_URL}/api/products`);
    const updatedProducts = updatedProductsResponse.data.products || updatedProductsResponse.data;
    
    if (updatedProducts.length > 0) {
      const testProduct = updatedProducts[0];
      console.log(`\n3️⃣ Using product: ${testProduct.name}`);

      // 4. Test tạo đơn hàng với user thường
      console.log('\n4️⃣ Testing order creation...');
      
      // Tạo user test
      try {
        await axios.post(`${API_URL}/api/auth/register`, {
          name: 'Test User',
          email: `testuser${Date.now()}@example.com`,
          password: 'password123'
        });
      } catch (e) {
        // User có thể đã tồn tại
      }

      // Login user
      const userLoginResponse = await axios.post(`${API_URL}/api/auth/login`, {
        email: 'leduongbao2019@gmail.com',
        password: 'password123'
      });
      const userToken = userLoginResponse.data.token;
      console.log('✅ User login successful');

      // Thêm vào giỏ hàng
      const cartResponse = await axios.post(`${API_URL}/api/cart`, {
        productId: testProduct._id,
        qty: 1
      }, {
        headers: { Authorization: `Bearer ${userToken}` }
      });
      console.log('✅ Added to cart');

      // Tạo đơn hàng
      const orderResponse = await axios.post(`${API_URL}/api/orders`, {
        items: [{
          product: testProduct._id,
          quantity: 1,
          price: testProduct.price
        }],
        address: 'Test Street, Test City, Phone: 0123456789',
        paymentMethod: 'cod'
      }, {
        headers: { Authorization: `Bearer ${userToken}` }
      });
      
      console.log('✅ Order created successfully');
      console.log('Order ID:', orderResponse.data.order?._id || orderResponse.data._id);

      // 5. Lấy danh sách đơn hàng
      console.log('\n5️⃣ Getting user orders...');
      const ordersResponse = await axios.get(`${API_URL}/api/orders`, {
        headers: { Authorization: `Bearer ${userToken}` }
      });
      console.log(`✅ Found ${ordersResponse.data.length} orders`);

      // 6. Test admin xem đơn hàng
      console.log('\n6️⃣ Admin getting all orders...');
      const adminOrdersResponse = await axios.get(`${API_URL}/api/admin/orders`, {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      console.log(`✅ Admin found ${adminOrdersResponse.data.orders?.length || adminOrdersResponse.data?.length || 0} orders`);

    }

    console.log('\n🎉 Order flow test completed successfully!');

  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

testOrderFlow();
