const mongoose = require('mongoose');
require('dotenv').config();

const Product = require('./BE/src/models/product.model');

const checkImages = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hoangmyjewelry');
    console.log('Connected to MongoDB');
    
    const products = await Product.find().limit(10);
    console.log(`\nFound ${products.length} products:\n`);
    
    products.forEach(p => {
      console.log(`\n📦 ${p.name}`);
      console.log(`   Images type: ${typeof p.images}`);
      console.log(`   Images length: ${p.images?.length || 0}`);
      if (p.images && p.images.length > 0) {
        console.log(`   First image type: ${typeof p.images[0]}`);
        console.log(`   First image value:`, p.images[0]);
      } else {
        console.log(`   ⚠️  NO IMAGES`);
      }
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

checkImages();
