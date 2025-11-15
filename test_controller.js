const mongoose = require('mongoose');
const Product = require('./BE/src/models/product.model');

mongoose.connect('mongodb://localhost:27017/hoangmyjewelry');

async function testControllerLogic() {
  try {
    console.log('=== Test full controller logic ===');
    
    // Simulate exact controller logic
    let { page = 1, limit = 1000, q, collection, category, tag, minPrice, maxPrice, flash } = {};
    page = parseInt(page); 
    limit = parseInt(limit);
    
    const filter = {};
    if (q) filter.name = { $regex: q, $options: "i" };
    if (collection) filter.collection = collection;
    if (category) filter.category = category;
    if (tag) filter.tags = tag;
    if (minPrice || maxPrice) filter.price = {};
    if (minPrice) filter.price.$gte = parseFloat(minPrice);
    if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    if (flash === '1' || flash === 'true') filter.isFlashSale = true;

    console.log('Filter:', JSON.stringify(filter, null, 2));
    
    let products = await Product.find(filter).populate('collection').skip((page - 1) * limit).limit(limit);
    const total = await Product.countDocuments(filter);

    console.log(`Products found: ${products.length}`);
    console.log(`Total count: ${total}`);
    
    // Apply promo logic
    products = products.map(p => {
      const obj = p.toObject();
      if (obj.priceSale) obj.displayPrice = obj.priceSale; else obj.displayPrice = obj.price;
      return obj;
    });

    console.log(`After mapping: ${products.length}`);
    
    // Show sample
    if (products.length > 0) {
      console.log('\nFirst 3 products:');
      products.slice(0, 3).forEach((p, i) => {
        console.log(`${i+1}. ${p.name} - ${p.price}đ - ${p.category}`);
      });
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

testControllerLogic();
