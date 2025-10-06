// scripts/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../BE/src/models/user.model');
const Product = require('../BE/src/models/product.model');
const Collection = require('../BE/src/models/collection.model');

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected');

  // create admin
  const adminEmail = 'admin@example.com';
  let admin = await User.findOne({ email: adminEmail });
  if (!admin) {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash('admin123', salt);
    admin = await User.create({ name: 'Admin', email: adminEmail, password: hashed, role: 'admin', emailVerified: true });
    console.log('Created admin', adminEmail);
  }

  // sample collection + products
  const col = await Collection.findOne({ slug: 'default' }) || await Collection.create({ name: 'Default', slug: 'default' });
  const pcount = await Product.countDocuments();
  if (pcount === 0) {
    await Product.create([{ name: 'Sample Ring', slug: 'sample-ring', price: 1000000, collection: col._id }, { name: 'Sample Necklace', slug: 'sample-necklace', price: 1500000, collection: col._id }]);
    console.log('Created sample products');
  }

  console.log('Done');
  process.exit(0);
}

main().catch(err=>{console.error(err); process.exit(1);});