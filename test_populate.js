const mongoose = require('mongoose');
const Product = require('./BE/src/models/product.model');

mongoose.connect('mongodb://localhost:27017/hoangmyjewelry');

async function testPopulate() {
  try {
    console.log('=== Test populate collection ===');
    
    // Test without populate
    const withoutPopulate = await Product.find({}).limit(3);
    console.log(`Without populate: ${withoutPopulate.length} products`);
    
    // Test with populate
    try {
      const withPopulate = await Product.find({}).populate('collection').limit(3);
      console.log(`With populate: ${withPopulate.length} products`);
      
      if (withPopulate.length > 0) {
        console.log('First product with populate:');
        const product = withPopulate[0].toObject();
        console.log(`- Name: ${product.name}`);
        console.log(`- Collection: ${product.collection || 'null'}`);
      }
    } catch (populateError) {
      console.error('Populate error:', populateError.message);
    }
    
    // Test exact controller logic
    const limit = 1000;
    const page = 1;
    const filter = {};
    
    console.log('\n=== Test exact controller logic ===');
    let products = await Product.find(filter).populate('collection').skip((page - 1) * limit).limit(limit);
    console.log(`Controller logic result: ${products.length} products`);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

testPopulate();
