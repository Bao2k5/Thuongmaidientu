// Mock data tập trung cho tất cả các pages
// Tối ưu: Không lặp lại data, dễ maintain, dễ thay bằng API sau

export const mockProducts = [
  {
    id: 1,
    name: 'Nhẫn Kim Cương Soleste',
    price: 15000000,
    priceSale: null,
    category: 'Nhẫn',
    material: 'Vàng trắng 18K',
    description: 'Nhẫn kim cương cao cấp với thiết kế tinh tế, tôn vinh vẻ đẹp vượt thời gian.',
    images: [
      '/product-1.png',
      '/product-2.png',
      '/nhan.png'
    ],
    rating: 5,
    reviews: 24,
    stock: 5,
    specifications: {
      material: 'Vàng trắng 18K',
      gemstone: 'Kim cương tự nhiên',
      weight: '3.5g',
      size: '5-7 (có thể đo size)',
    }
  },
  {
    id: 2,
    name: 'Dây Chuyền Vàng Trắng',
    price: 12500000,
    priceSale: 10900000,
    category: 'Dây Chuyền',
    material: 'Vàng trắng 18K',
    description: 'Dây chuyền vàng trắng thanh lịch, phù hợp mọi phong cách.',
    images: [
      '/product-3.png',
      '/day-chuyen.png'
    ],
    rating: 5,
    reviews: 18,
    stock: 8,
    specifications: {
      material: 'Vàng trắng 18K',
      length: '40cm + 5cm điều chỉnh',
      weight: '4.2g',
    }
  },
  {
    id: 3,
    name: 'Bông Tai Ngọc Trai',
    price: 8900000,
    priceSale: null,
    category: 'Bông Tai',
    material: 'Vàng 18K',
    description: 'Bông tai ngọc trai thanh lịch, hoàn hảo cho mọi dịp.',
    images: [
      '/product-4.png',
      '/bong-tai.png'
    ],
    rating: 5,
    reviews: 15,
    stock: 12,
    specifications: {
      material: 'Vàng 18K',
      gemstone: 'Ngọc trai Akoya',
      weight: '2.8g',
    }
  },
  {
    id: 4,
    name: 'Vòng Tay Bạch Kim',
    price: 18000000,
    priceSale: 16200000,
    category: 'Vòng Tay',
    material: 'Bạch kim 950',
    description: 'Vòng tay bạch kim sang trọng với thiết kế tinh xảo.',
    images: [
      '/product-5.png',
      '/vong-tay.png'
    ],
    rating: 5,
    reviews: 20,
    stock: 6,
    specifications: {
      material: 'Bạch kim 950',
      length: '17-19cm (có thể điều chỉnh)',
      weight: '12g',
    }
  },
  {
    id: 5,
    name: 'Nhẫn Đính Đá Ruby',
    price: 22000000,
    priceSale: null,
    category: 'Nhẫn',
    material: 'Vàng 18K',
    description: 'Nhẫn đính đá ruby quý hiếm, biểu tượng của tình yêu và quyền lực.',
    images: [
      '/product-6.png',
      '/nhan.png'
    ],
    rating: 5,
    reviews: 12,
    stock: 3,
    specifications: {
      material: 'Vàng 18K',
      gemstone: 'Ruby Miến Điện',
      weight: '4.5g',
      size: '5-8',
    }
  },
  {
    id: 6,
    name: 'Dây Chuyền Ngọc Lục Bảo',
    price: 28000000,
    priceSale: null,
    category: 'Dây Chuyền',
    material: 'Vàng trắng 18K',
    description: 'Dây chuyền đính ngọc lục bảo tự nhiên, mang lại may mắn và thịnh vượng.',
    images: [
      '/product-7.png',
      '/day-chuyen.png'
    ],
    rating: 5,
    reviews: 8,
    stock: 4,
    specifications: {
      material: 'Vàng trắng 18K',
      gemstone: 'Ngọc lục bảo Colombia',
      length: '45cm + 5cm điều chỉnh',
      weight: '5.2g',
    }
  },
  {
    id: 7,
    name: 'Bông Tai Kim Cương',
    price: 32000000,
    priceSale: 29900000,
    category: 'Bông Tai',
    material: 'Bạch kim',
    description: 'Bông tai kim cương lấp lánh, thể hiện đẳng cấp và sang trọng.',
    images: [
      '/product-8.png',
      '/bong-tai.png'
    ],
    rating: 5,
    reviews: 16,
    stock: 5,
    specifications: {
      material: 'Bạch kim 950',
      gemstone: 'Kim cương 1 carat',
      weight: '3.2g',
    }
  },
  {
    id: 8,
    name: 'Vòng Tay Charm Vàng',
    price: 14500000,
    priceSale: null,
    category: 'Vòng Tay',
    material: 'Vàng 18K',
    description: 'Vòng tay charm linh hoạt, có thể kết hợp nhiều phong cách.',
    images: [
      '/product-2.png',
      '/vong-tay.png'
    ],
    rating: 5,
    reviews: 22,
    stock: 10,
    specifications: {
      material: 'Vàng 18K',
      length: '16-20cm (có thể thêm charm)',
      weight: '8.5g',
    }
  }
];

export const mockReviews = [
  {
    id: 1,
    userName: 'Nguyễn Thị Mai',
    rating: 5,
    date: '2024-01-15',
    comment: 'Sản phẩm rất đẹp, chất lượng tốt. Tôi rất hài lòng với sự lựa chọn này!',
    productId: 1
  },
  {
    id: 2,
    userName: 'Trần Văn Hùng',
    rating: 5,
    date: '2024-01-10',
    comment: 'Kim cương đẹp, thiết kế tinh xảo. Đáng đồng tiền bát gạo.',
    productId: 1
  },
  {
    id: 3,
    userName: 'Lê Thị Hương',
    rating: 4,
    date: '2024-01-05',
    comment: 'Sản phẩm đẹp nhưng giao hàng hơi lâu.',
    productId: 1
  }
];

export const mockTestimonials = [
  {
    id: 1,
    name: 'Nguyễn Thị Mai',
    role: 'Khách hàng thân thiết',
    content: 'Tôi đã mua nhiều trang sức tại đây và luôn hài lòng với chất lượng cũng như dịch vụ. BTHN là nơi tôi tin tưởng nhất.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80'
  },
  {
    id: 2,
    name: 'Trần Văn Minh',
    role: 'Doanh nhân',
    content: 'Thiết kế tinh tế, chất liệu cao cấp. Tôi đã tặng vợ nhẫn kim cương và cô ấy rất yêu thích.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80'
  },
  {
    id: 3,
    name: 'Lê Thị Hương',
    role: 'Giáo viên',
    content: 'Dịch vụ chăm sóc khách hàng tuyệt vời. Nhân viên tư vấn nhiệt tình và am hiểu sản phẩm.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&q=80'
  }
];

export const mockCollections = [
  {
    id: 1,
    name: 'Nhẫn',
    image: '/nhan.png',
    count: 25
  },
  {
    id: 2,
    name: 'Dây Chuyền',
    image: '/day-chuyen.png',
    count: 18
  },
  {
    id: 3,
    name: 'Bông Tai',
    image: '/bong-tai.png',
    count: 30
  },
  {
    id: 4,
    name: 'Vòng Tay',
    image: '/vong-tay.png',
    count: 22
  }
];

export const categories = ['Nhẫn', 'Dây Chuyền', 'Bông Tai', 'Vòng Tay'];
export const materials = ['Vàng 18K', 'Vàng trắng 18K', 'Bạch kim'];
