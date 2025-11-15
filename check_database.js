const mongoose = require('mongoose');
const Product = require('./BE/src/models/product.model');

mongoose.connect('mongodb://localhost:27017/hoangmyjewelry');

async function checkDatabase() {
  try {
    // Wait for connection
    await mongoose.connection.asPromise();
    
    console.log('=== Database Info ===');
    console.log('Connected database:', mongoose.connection.db.databaseName);
    
    // List all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('\nCollections in database:');
    collections.forEach(col => {
      console.log(`- ${col.name}`);
    });
    
    // Check products collection
    const productsCount = await Product.countDocuments();
    console.log(`\nProducts collection count: ${productsCount}`);
    
    // Show all product names
    const allProducts = await Product.find({}).select('name category');
    console.log('\nAll products:');
    allProducts.forEach((p, i) => {
      console.log(`${i+1}. ${p.name} (${p.category})`);
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

checkDatabase();
