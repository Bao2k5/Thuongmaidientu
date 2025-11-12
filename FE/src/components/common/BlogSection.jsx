import React from 'react';

const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Tại Sao Nên Chọn Bạc 925?',
      excerpt: 'Bạc 925 là lựa chọn hoàn hảo cho trang sức cao cấp. Nó kết hợp độ bền, vẻ đẹp và tính bền vững, khiến nó trở thành lựa chọn ưa thích của những người yêu thích trang sức.',
      image: '/images/blog-why-silver.jpg',  // Admin tự upload
      category: 'Kiến Thức',
      date: '15 Tháng 1, 2024',
    },
    {
      id: 2,
      title: 'Cách Chăm Sóc Bạc 925 của Bạn',
      excerpt: 'Để giữ cho trang sức bạc của bạn sáng bóng và đẹp, bạn cần tuân theo một số hướng dẫn chăm sóc cơ bản. Tìm hiểu cách làm sạch, lưu trữ và bảo vệ trang sức bạc của bạn.',
      image: '/images/blog-care-silver.jpg',
      category: 'Hướng Dẫn',
      date: '10 Tháng 1, 2024',
    },
    {
      id: 3,
      title: 'Lịch Sử Của Bạc Tinh Tế Trong Các Nền Văn Hóa',
      excerpt: 'Bạc đã được sử dụng để tạo ra trang sức và các vật dụng cao cấp trong hàng ngàn năm. Khám phá lịch sử phong phú và ý nghĩa văn hóa của bạc trên khắp thế giới.',
      image: '/images/blog-history-silver.jpg',
      category: 'Lịch Sử',
      date: '5 Tháng 1, 2024',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-luxury-cream">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-display text-4xl md:text-5xl text-luxury-charcoal mb-4 font-light">
            Tin Tức & Bài Viết
          </h2>
          <p className="text-luxury-brown text-lg md:text-xl max-w-2xl mx-auto">
            Khám phá những bài viết về bạc 925, cách chăm sóc và những tip trang sức tinh tế
          </p>
        </div>

        {}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article 
              key={post.id}
              className="group cursor-pointer transform transition-all duration-500 hover:scale-105"
            >
              {}
              <div className="relative h-64 md:h-80 overflow-hidden mb-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {}
                <div className="absolute top-4 left-4">
                  <span className="inline-block bg-luxury-brown text-luxury-cream px-3 py-1 text-xs font-medium tracking-wide rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              {}
              <div>
                {}
                <p className="text-luxury-taupe text-sm font-medium mb-3">
                  {post.date}
                </p>

                {}
                <h3 className="font-display text-xl md:text-2xl text-luxury-charcoal mb-3 font-light group-hover:text-luxury-brown transition-colors duration-300">
                  {post.title}
                </h3>

                {}
                <p className="text-luxury-brown text-sm md:text-base leading-relaxed mb-4">
                  {post.excerpt}
                </p>

                {}
                <a href="#" className="inline-flex items-center text-luxury-brown hover:text-luxury-charcoal transition-colors duration-300 font-medium text-sm">
                  Đọc thêm
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>

        {}
        <div className="text-center mt-12 md:mt-16">
          <button className="btn-luxury">
            XEM TẤT CẢ BÀI VIẾT
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
