const mongoose = require('mongoose');
const Product = require('./BE/src/models/product.model');

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/thuongmaidientu');

const categories = {
  nhan: 'Nhẫn',
  bongtai: 'Bông tai', 
  daychuyen: 'Dây chuyền',
  lactay: 'Lắc tay'
};

const productNames = {
  nhan: [
    'Nhẫn Bạc Tình Yêu Vĩnh Cửu',
    'Nhẫn Bạc Trái Tim Lấp Lánh',
    'Nhẫn Bạc Dải Sao Đêm',
    'Nhẫn Bạc Hoa Cỏ Mùa Xuân',
    'Nhẫn Bạc Sóng Biển',
    'Nhẫn Bạc Mặt Trăng',
    'Nhẫn Bạc Nốt Nhạc',
    'Nhẫn Bạc Cánh Bướm',
    'Nhẫn Bạc Lá Phong',
    'Nhẫn Bạc Giọt Sương'
  ],
  bongtai: [
    'Bông Tai Bạc Giọt Nước',
    'Bông Tai Bạc Trái Tim',
    'Bông Tai Bạc Ngôi Sao',
    'Bông Tai Bạc Hoa Mai',
    'Bông Tai Bạc Lông Vũ',
    'Bông Tai Bạc Giọt Mưa',
    'Bông Tai Bạc Mặt Trăng',
    'Bông Tai Bạc Cánh Bướm',
    'Bông Tai Bạc Lá Thơm',
    'Bông Tai Bạc Sóng Biển'
  ],
  daychuyen: [
    'Dây Chuyền Bạc Giọt Nước',
    'Dây Chuyền Bạc Trái Tim',
    'Dây Chuyền Bạc Ngôi Sao',
    'Dây Chuyền Bạc Hoa Mai',
    'Dây Chuyền Bạc Lông Vũ',
    'Dây Chuyền Bạc Giọt Mưa',
    'Dây Chuyền Bạc Mặt Trăng',
    'Dây Chuyền Bạc Cánh Bướm',
    'Dây Chuyền Bạc Lá Thơm',
    'Dây Chuyền Bạc Sóng Biển'
  ],
  lactay: [
    'Lắc Tay Bạc Chuông Xinh',
    'Lắc Tay Bạc Trái Tim',
    'Lắc Tay Bạc Sao Băng',
    'Lắc Tay Bạc Hoa Cúc',
    'Lắc Tay Bạc Lá Phong',
    'Lắc Tay Bạc Giọt Nước',
    'Lắc Tay Bạc Mặt Trăng',
    'Lắc Tay Bạc Cánh Bướm',
    'Lắc Tay Bạc Dải Sao',
    'Lắc Tay Bạc Hoa Sen'
  ]
};

const imageUrls = {
  nhan: [
    'https://i.imgur.com/NhanBac1.jpg',
    'https://i.imgur.com/NhanBac2.jpg', 
    'https://i.imgur.com/NhanBac3.jpg',
    'https://i.imgur.com/NhanBac4.jpg',
    'https://i.imgur.com/NhanBac5.jpg',
    'https://i.imgur.com/NhanBac6.jpg',
    'https://i.imgur.com/NhanBac7.jpg',
    'https://i.imgur.com/NhanBac8.jpg',
    'https://i.imgur.com/NhanBac9.jpg',
    'https://i.imgur.com/NhanBac10.jpg'
  ],
  bongtai: [
    'https://i.imgur.com/BongTaiBac1.jpg',
    'https://i.imgur.com/BongTaiBac2.jpg',
    'https://i.imgur.com/BongTaiBac3.jpg',
    'https://i.imgur.com/BongTaiBac4.jpg',
    'https://i.imgur.com/BongTaiBac5.jpg',
    'https://i.imgur.com/BongTaiBac6.jpg',
    'https://i.imgur.com/BongTaiBac7.jpg',
    'https://i.imgur.com/BongTaiBac8.jpg',
    'https://i.imgur.com/BongTaiBac9.jpg',
    'https://i.imgur.com/BongTaiBac10.jpg'
  ],
  daychuyen: [
    'https://i.imgur.com/DayChuyenBac1.jpg',
    'https://i.imgur.com/DayChuyenBac2.jpg',
    'https://i.imgur.com/DayChuyenBac3.jpg',
    'https://i.imgur.com/DayChuyenBac4.jpg',
    'https://i.imgur.com/DayChuyenBac5.jpg',
    'https://i.imgur.com/DayChuyenBac6.jpg',
    'https://i.imgur.com/DayChuyenBac7.jpg',
    'https://i.imgur.com/DayChuyenBac8.jpg',
    'https://i.imgur.com/DayChuyenBac9.jpg',
    'https://i.imgur.com/DayChuyenBac10.jpg'
  ],
  lactay: [
    'https://i.imgur.com/LacTayBac1.jpg',
    'https://i.imgur.com/LacTayBac2.jpg',
    'https://i.imgur.com/LacTayBac3.jpg',
    'https://i.imgur.com/LacTayBac4.jpg',
    'https://i.imgur.com/LacTayBac5.jpg',
    'https://i.imgur.com/LacTayBac6.jpg',
    'https://i.imgur.com/LacTayBac7.jpg',
    'https://i.imgur.com/LacTayBac8.jpg',
    'https://i.imgur.com/LacTayBac9.jpg',
    'https://i.imgur.com/LacTayBac10.jpg'
  ]
};

function generateRandomPrice() {
  return Math.floor(Math.random() * (1000000 - 300000 + 1)) + 300000;
}

function generateRandomSalePrice(price) {
  const discount = Math.random() < 0.6; // 60% có giảm giá
  if (discount) {
    const discountPercent = Math.floor(Math.random() * 30) + 10; // 10-40% discount
    return Math.floor(price * (1 - discountPercent / 100));
  }
  return null;
}

function createSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
}

async function createProducts() {
  try {
    const products = [];
    const categoryKeys = Object.keys(categories);
    const productsPerCategory = 10; // 40 sản phẩm / 4 loại = 10 mỗi loại

    for (let i = 0; i < productsPerCategory; i++) {
      categoryKeys.forEach(categoryKey => {
        const price = generateRandomPrice();
        const priceSale = generateRandomSalePrice(price);
        const categoryNames = productNames[categoryKey];
        
        products.push({
          name: categoryNames[i],
          slug: createSlug(categoryNames[i]),
          category: categories[categoryKey],
          price: price,
          priceSale: priceSale,
          description: `${categoryNames[i]} - Trang sức bạc cao cấp, thiết kế tinh xảo, phù hợp làm quà tặng hoặc sử dụng hàng ngày. Chất liệu bạc 925 cao cấp, không gây dị ứng, bền đẹp theo thời gian.`,
          images: [{ 
            url: imageUrls[categoryKey][i], 
            public_id: `product_${categoryKey}_${i}` 
          }],
          stock: Math.floor(Math.random() * 50) + 10, // 10-60 sản phẩm
          sold: Math.floor(Math.random() * 20), // 0-19 đã bán
          rating: (Math.random() * 2 + 3).toFixed(1), // 3.0-5.0
          reviews: Math.floor(Math.random() * 100), // 0-99 reviews
          featured: Math.random() < 0.3, // 30% featured
          new: Math.random() < 0.4, // 40% new
          bestseller: Math.random() < 0.25 // 25% bestseller
        });
      });
    }
    
    // Xóa sản phẩm cũ (nếu có)
    await Product.deleteMany({});
    
    // Thêm sản phẩm mới
    const createdProducts = await Product.insertMany(products);
    
    console.log(`✅ Đã tạo ${createdProducts.length} sản phẩm thành công!`);
    console.log('📊 Phân bổ:');
    
    // Đếm sản phẩm theo category
    const counts = {};
    createdProducts.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    
    Object.entries(counts).forEach(([category, count]) => {
      console.log(`  - ${category}: ${count} sản phẩm`);
    });
    
    // Hiển thị một vài sản phẩm mẫu
    console.log('\n🔍 Một vài sản phẩm mẫu:');
    createdProducts.slice(0, 5).forEach((p, i) => {
      console.log(`${i+1}. ${p.name} - ${p.price.toLocaleString('vi-VN')}đ`);
      if (p.priceSale) {
        console.log(`   🔥 Giảm giá: ${p.priceSale.toLocaleString('vi-VN')}đ`);
      }
    });
    
  } catch (error) {
    console.error('❌ Lỗi khi tạo sản phẩm:', error);
  } finally {
    await mongoose.disconnect();
  }
}

createProducts();
