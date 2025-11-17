const mongoose = require('mongoose');
const Review = require('./BE/src/models/review.model');
const Product = require('./BE/src/models/product.model');
const User = require('./BE/src/models/user.model');

// Testimonials data
const testimonialsData = [
  {
    productName: 'Nhẫn Kim Cương',
    customerName: 'Nguyễn Thị Mai',
    rating: 5,
    title: 'Sản phẩm tuyệt vời',
    text: 'Nhẫn rất đẹp, lấp lánh và sang trọng. Chất lượng vượt ngoài mong đợi. Dịch vụ chăm sóc khách hàng rất tốt.'
  },
  {
    productName: 'Bông Tai Vàng',
    customerName: 'Trần Hoàng Anh',
    rating: 5,
    title: 'Rất ưng ý',
    text: 'Bông tai thiết kế tinh tế, mang lên rất sang. Chất lượng vàng tốt, không bị dị ứng. Sẽ giới thiệu cho bạn bè.'
  },
  {
    productName: 'Dây Chuyền Bạc',
    customerName: 'Lê Thuỳ Linh',
    rating: 4,
    title: 'Đẹp nhưng cần cải thiện',
    text: 'Dây chuyền thiết kế đẹp, nhưng móc cài hơi yếu. Tổng thể vẫn hài lòng với sản phẩm.'
  },
  {
    productName: 'Lắc Tay Vàng',
    customerName: 'Phạm Minh Quân',
    rating: 5,
    title: 'Quà tặng hoàn hảo',
    text: 'Mua làm quà tặng vợ, cô ấy rất thích. Sản phẩm được đóng gói cẩn thận, sang trọng.'
  },
  {
    productName: 'Nhẫn Cặp',
    customerName: 'Hoàng Văn Hùng',
    rating: 5,
    title: 'Biểu tượng tình yêu',
    text: 'Cặp nhẫn rất ý nghĩa, khắc tên đẹp. Chất lượng đảm bảo, đeo thoải mái. Cảm ơn cửa hàng.'
  },
  {
    productName: 'Khuyên Tai Kim Cương',
    customerName: 'Bùi Ngọc Ánh',
    rating: 5,
    title: 'Đẳng cấp',
    text: 'Kim cương lấp lánh, thiết kế thời thượng. Đeo lên rất sang trọng và nổi bật. Đáng đồng tiền.'
  },
  {
    productName: 'Vòng Cổ Đá Quý',
    customerName: 'Đỗ Duy Khang',
    rating: 4,
    title: 'Tốt',
    text: 'Đá quý có màu sắc đẹp, nhưng chuỗi hơi ngắn. Nên có nhiều lựa chọn kích thước hơn.'
  },
  {
    productName: 'Nhẫn Trơn',
    customerName: 'Vũ Thảo Vy',
    rating: 5,
    title: 'Đơn giản mà đẹp',
    text: 'Thiết kế tối giản nhưng rất tinh tế. Chất lượng tốt, đeo hàng ngày cũng được. Rất thích.'
  }
];

async function addTestimonials() {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/thuongmaidientu');
    console.log('Connected to database');

    // Clear existing testimonials
    await Review.deleteMany({});
    console.log('Cleared existing reviews');

    // Get products and users
    const products = await Product.find().limit(10);
    const users = await User.find({ role: 'user' }).limit(5);

    if (products.length === 0) {
      console.log('No products found. Please add products first.');
      return;
    }

    if (users.length === 0) {
      console.log('No users found. Creating a test user...');
      const testUser = await User.create({
        name: 'Khách Hàng Test',
        email: 'test@example.com',
        password: 'password123',
        role: 'user'
      });
      users.push(testUser);
    }

    // Add testimonials
    const reviews = [];
    for (let i = 0; i < testimonialsData.length; i++) {
      const testimonial = testimonialsData[i];
      const product = products[i % products.length];
      const user = users[i % users.length];

      const review = await Review.create({
        product: product._id,
        user: user._id,
        rating: testimonial.rating,
        title: testimonial.title,
        text: testimonial.text
      });

      reviews.push(review);
      console.log(`Added review for product: ${product.name}`);
    }

    // Update product ratings
    for (const review of reviews) {
      await updateProductRatings(review.product);
    }

    console.log(`Successfully added ${reviews.length} testimonials to database`);
    console.log('Testimonials data has been added successfully!');

  } catch (error) {
    console.error('Error adding testimonials:', error);
  } finally {
    await mongoose.disconnect();
  }
}

async function updateProductRatings(productId) {
  const agg = await Review.aggregate([
    { $match: { product: productId } },
    { $group: { _id: '$product', avg: { $avg: '$rating' }, count: { $sum: 1 } } }
  ]);
  
  if (agg.length > 0) {
    await Product.findByIdAndUpdate(productId, { 
      ratingsAvg: agg[0].avg, 
      ratingsCount: agg[0].count 
    });
  } else {
    await Product.findByIdAndUpdate(productId, { 
      ratingsAvg: 0, 
      ratingsCount: 0 
    });
  }
}

// Run the script
addTestimonials();
