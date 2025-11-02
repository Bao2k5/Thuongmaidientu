// Quick test to verify images are working
require('dotenv').config();
const axios = require('axios');

const API_URL = process.env.VITE_API_URL || 'http://localhost:3000';

async function testImages() {
  console.log('🧪 Testing Product Images...\n');

  try {
    // Get products
    const response = await axios.get(`${API_URL}/api/products`);
    const products = response.data.products;

    console.log(`✅ Found ${products.length} products\n`);

    products.forEach(product => {
      const hasImages = product.images && product.images.length > 0;
      const firstImage = hasImages ? product.images[0] : null;
      
      console.log(`📦 ${product.name}`);
      console.log(`   Category: ${product.category}`);
      console.log(`   Price: ${(product.price / 1000000).toFixed(1)}M đ`);
      
      if (hasImages && firstImage.url) {
        console.log(`   ✅ Image: ${firstImage.url}`);
      } else {
        console.log(`   ❌ No image!`);
      }
      console.log('');
    });

    const allHaveImages = products.every(p => p.images && p.images.length > 0 && p.images[0].url);
    
    if (allHaveImages) {
      console.log('🎉 SUCCESS: All products have images!');
    } else {
      console.log('⚠️  WARNING: Some products missing images');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testImages();
