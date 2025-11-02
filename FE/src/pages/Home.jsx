import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
  FiTruck, 
  FiShield, 
  FiAward,
  FiRefreshCw,
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';
import BlogSection from '../components/common/BlogSection';
import FlashSaleSection from '../components/common/FlashSaleSection';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroSlides = [
    {
      id: 1,
      title: 'Bộ Sưu Tập Mới 2024',
      subtitle: 'Bạc 925 tinh tế & nhẹ nhàng',
      image: '/images/hero-slide-1.jpg',  // Admin tự upload
      cta: 'Khám Phá Ngay',
      link: '/products',
    },
    {
      id: 2,
      title: 'Nhẫn Bạc 925 Sang Trọng',
      subtitle: 'Biểu tượng của tình yêu vĩnh cửu',
      image: '/images/hero-slide-2.jpg',
      cta: 'Xem Sản Phẩm',
      link: '/products',
    },
    {
      id: 3,
      title: 'Dây Chuyền Bạc 925 Cao Cấp',
      subtitle: 'Nâng tầm phong cách của bạn',
      image: '/images/hero-slide-3.jpg',
      cta: 'Mua Sắm Ngay',
      link: '/products',
    },
  ];

  const collections = [
    {
      id: 1,
      name: 'Nhẫn Bạc 925',
      image: '/images/placeholder-rings.jpg',  // Admin tự upload vào /public/images/
      count: 25,
      link: '/products?category=nhẫn',
    },
    {
      id: 2,
      name: 'Dây Chuyền Bạc 925',
      image: '/images/placeholder-necklaces.jpg',
      count: 35,
      link: '/products?category=dây chuyền',
    },
    {
      id: 3,
      name: 'Bông Tai Bạc 925',
      image: '/images/placeholder-earrings.jpg',
      count: 40,
      link: '/products?category=bông tai',
    },
    {
      id: 4,
      name: 'Vòng Tay Bạc 925',
      image: '/images/placeholder-bracelets.jpg',
      count: 30,
      link: '/products?category=vòng tay',
    },
  ];

  const features = [
    {
      icon: <FiTruck className="w-8 h-8" />,
      title: 'Miễn Phí Vận Chuyển',
      description: 'Cho đơn hàng từ 500.000đ',
    },
    {
      icon: <FiShield className="w-8 h-8" />,
      title: 'Thanh Toán Bảo Mật',
      description: 'An toàn 100%',
    },
    {
      icon: <FiAward className="w-8 h-8" />,
      title: 'Chất Lượng Đảm Bảo',
      description: 'Bảo hành trọn đời',
    },
    {
      icon: <FiRefreshCw className="w-8 h-8" />,
      title: 'Đổi Trả Dễ Dàng',
      description: 'Trong vòng 30 ngày',
    },
  ];

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="min-h-screen bg-luxury-cream">
      {/* Hero Slider */}
      <section className="relative h-[600px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/40" />
            </div>
            <div className="relative h-full flex items-center justify-center text-center text-white px-4">
              <div className={`transition-all duration-700 ${index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <h1 className="font-display text-5xl md:text-6xl font-light text-white mb-4">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-2xl text-white/90 mb-8">{slide.subtitle}</p>
                <Link
                  to={slide.link}
                  className="inline-flex items-center gap-2 bg-luxury-charcoal hover:bg-luxury-brown text-white px-8 py-4 rounded-full font-medium transition-colors"
                >
                  {slide.cta}
                  <FiArrowRight />
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-colors z-10"
        >
          <FiChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-colors z-10"
        >
          <FiChevronRight className="w-6 h-6" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-luxury-ivory">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-luxury-beige text-luxury-brown rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-luxury-charcoal">{feature.title}</h3>
                <p className="text-luxury-brown">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="py-20 bg-luxury-cream">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-light text-luxury-charcoal mb-4">
              Bộ Sưu Tập Bạc 925
            </h2>
            <p className="text-luxury-brown text-lg">
              Khám phá các trang sức bạc 925 tinh tế và sang trọng
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {collections.map((collection, index) => (
              <div
                key={collection.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Link
                  to={collection.link}
                  className="group block relative overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="aspect-square relative">
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="font-display text-2xl font-light mb-1">
                        {collection.name}
                      </h3>
                      <p className="text-sm text-luxury-cream/80">
                        {collection.count} sản phẩm
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-luxury-brown via-luxury-taupe to-luxury-brown text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-light mb-6">
              Đăng Ký Nhận Ưu Đãi
            </h2>
            <p className="text-xl mb-8 text-luxury-cream">
              Nhận ngay mã giảm giá 10% cho đơn hàng đầu tiên
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Email của bạn"
                className="flex-1 px-6 py-4 rounded-full text-luxury-charcoal focus:outline-none focus:ring-2 focus:ring-luxury-cream"
              />
              <button className="bg-white text-luxury-brown px-8 py-4 rounded-full font-semibold hover:bg-luxury-cream transition-colors">
                Đăng Ký
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-luxury-cream">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-light text-luxury-charcoal mb-4">
              Tại Sao Chọn Hoàng My Jewelry
            </h2>
            <p className="text-luxury-brown text-lg">
              Cam kết mang đến trải nghiệm mua sắm tốt nhất với bạc 925 tinh tế
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                emoji: '💎',
                title: 'Chất Lượng Vượt Trội',
                description:
                  'Mỗi sản phẩm bạc 925 đều được chế tác tỉ mỉ từ vật liệu cao cấp và kiểm định chất lượng nghiêm ngặt.',
              },
              {
                emoji: '🎨',
                title: 'Thiết Kế Độc Đáo',
                description:
                  'Bộ sưu tập đa dạng với những thiết kế tinh tế, phù hợp với mọi phong cách và sở thích.',
              },
              {
                emoji: '🤝',
                title: 'Giá Trị Tốt Nhất',
                description:
                  'Cam kết mang đến sản phẩm chất lượng bạc 925 với mức giá hợp lý nhất trên thị trường.',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-6xl mb-6">{item.emoji}</div>
                <h3 className="text-2xl font-semibold mb-4 text-luxury-charcoal">{item.title}</h3>
                <p className="text-luxury-brown leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flash Sale Section */}
      <FlashSaleSection />

      {/* Blog Section */}
      <BlogSection />
    </div>
  );
};

export default Home;
