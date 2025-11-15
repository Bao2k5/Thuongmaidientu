const mongoose = require('mongoose');
const Product = require('./BE/src/models/product.model');

mongoose.connect('mongodb://localhost:27017/hoangmyjewelry');

async function testFilters() {
  try {
    console.log('=== Test different filters ===');
    
    // Test no filter
    const allProducts = await Product.find({});
    console.log(`1. No filter: ${allProducts.length} products`);
    
    // Test empty filter object
    const emptyFilter = await Product.find({});
    console.log(`2. Empty filter: ${emptyFilter.length} products`);
    
    // Test with collection filter (null/undefined)
    const collectionFilter = await Product.find({ collection: { $exists: false } });
    console.log(`3. Collection doesn't exist: ${collectionFilter.length} products`);
    
    // Test with collection filter (null)
    const collectionNullFilter = await Product.find({ collection: null });
    console.log(`4. Collection is null: ${collectionNullFilter.length} products`);
    
    // Show sample product structure
    if (allProducts.length > 0) {
      console.log('\n=== Sample product structure ===');
      const sample = allProducts[0].toObject();
      Object.keys(sample).forEach(key => {
        console.log(`${key}: ${typeof sample[key]} - ${sample[key]}`);
      });
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

testFilters();
