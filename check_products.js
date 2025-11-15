const mongoose = require('mongoose');
const Product = require('./BE/src/models/product.model');

mongoose.connect('mongodb://localhost:27017/hoangmyjewelry');

async function checkProducts() {
  try {
    const products = await Product.find({}).limit(5).select('name category price slug');
    console.log('Sample products:');
    products.forEach(p => {
      console.log(`- ${p.name} (${p.category}) - ${p.price}đ - slug: ${p.slug}`);
    });
    
    const total = await Product.countDocuments();
    console.log(`\nTotal products: ${total}`);
    
    // Check categories
    const categories = await Product.distinct('category');
    console.log(`Categories: ${categories.join(', ')}`);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

checkProducts();
