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

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroSlides = [
    {
      id: 1,
      title: 'Bộ Sưu Tập Xuân Hè 2024',
      subtitle: 'Tỏa sáng với phong cách riêng của bạn',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&q=80',
      cta: 'Khám Phá Ngay',
      link: '/products',
    },
    {
      id: 2,
      title: 'Nhẫn Kim Cương Sang Trọng',
      subtitle: 'Biểu tượng của tình yêu vĩnh cửu',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1920&q=80',
      cta: 'Xem Sản Phẩm',
      link: '/products',
    },
    {
      id: 3,
      title: 'Dây Chuyền Cao Cấp',
      subtitle: 'Nâng tầm phong cách của bạn',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1920&q=80',
      cta: 'Mua Sắm Ngay',
      link: '/products',
    },
  ];

  const collections = [
    {
      id: 1,
      name: 'Nhẫn Cưới',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80',
      count: 25,
      link: '/products?category=rings',
    },
    {
      id: 2,
      name: 'Dây Chuyền',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80',
      count: 35,
      link: '/products?category=necklaces',
    },
    {
      id: 3,
      name: 'Bông Tai',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80',
      count: 40,
      link: '/products?category=earrings',
    },
    {
      id: 4,
      name: 'Vòng Tay',
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80',
      count: 30,
      link: '/products?category=bracelets',
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
    <div className="min-h-screen bg-white">
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
                <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8">{slide.subtitle}</p>
                <Link
                  to={slide.link}
                  className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full font-medium transition-colors"
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
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-500 rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold mb-4">
              Bộ Sưu Tập
            </h2>
            <p className="text-gray-600 text-lg">
              Khám phá các sản phẩm trang sức tinh tế và sang trọng
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
                  className="group block relative overflow-hidden rounded-lg"
                >
                  <div className="aspect-square relative">
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-serif font-bold mb-1">
                        {collection.name}
                      </h3>
                      <p className="text-sm text-gray-200">
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
      <section className="py-20 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Đăng Ký Nhận Ưu Đãi
            </h2>
            <p className="text-xl mb-8 text-blue-50">
              Nhận ngay mã giảm giá 10% cho đơn hàng đầu tiên
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Email của bạn"
                className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-blue-500 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-colors">
                Đăng Ký
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4">
              Tại Sao Chọn Chúng Tôi
            </h2>
            <p className="text-gray-600 text-lg">
              Cam kết mang đến trải nghiệm mua sắm tốt nhất
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                emoji: '💎',
                title: 'Chất Lượng Vượt Trội',
                description:
                  'Mỗi sản phẩm đều được chế tác tỉ mỉ từ vật liệu cao cấp và kiểm định chất lượng nghiêm ngặt.',
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
                  'Cam kết mang đến sản phẩm chất lượng với mức giá hợp lý nhất trên thị trường.',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-6xl mb-6">{item.emoji}</div>
                <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
