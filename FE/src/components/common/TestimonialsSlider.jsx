import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TestimonialsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Nguyễn Minh Anh',
      role: 'Khách hàng thân thiết',
      content: 'Sản phẩm bạc 925 tại HM Jewelry thật sự rất đẹp và tinh tế. Mình đã mua nhiều món và đều rất hài lòng về chất lượng cũng như thiết kế. Dịch vụ chăm sóc khách hàng cũng rất tốt!',
      rating: 5,
      image: 'https://i.pravatar.cc/150?img=1'
    },
    {
      id: 2,
      name: 'Trần Thanh Hà',
      role: 'Chuyên gia làm đẹp',
      content: 'Tôi rất ấn tượng với độ tinh xảo trong từng chi tiết của sản phẩm. Bạc 925 sáng bóng, không bị xỉn màu sau thời gian dài sử dụng. Sẽ tiếp tục ủng hộ HM Jewelry!',
      rating: 5,
      image: 'https://i.pravatar.cc/150?img=5'
    },
    {
      id: 3,
      name: 'Lê Hoàng Nam',
      role: 'Doanh nhân',
      content: 'Mình đã mua quà tặng bạn gái tại đây và cô ấy rất thích. Thiết kế sang trọng, đóng gói cẩn thận. Giá cả hợp lý so với chất lượng. Chắc chắn sẽ quay lại!',
      rating: 5,
      image: 'https://i.pravatar.cc/150?img=12'
    },
    {
      id: 4,
      name: 'Phạm Thị Lan',
      role: 'Giảng viên',
      content: 'Bộ sưu tập của HM Jewelry rất đa dạng và phù hợp với nhiều phong cách khác nhau. Mình đặc biệt thích các thiết kế tối giản nhưng vẫn rất sang trọng. Rất đáng để thử!',
      rating: 5,
      image: 'https://i.pravatar.cc/150?img=9'
    }
  ];

  // Auto-advance slider every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="section-luxury bg-luxury-cream">
      <div className="container-luxury">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-light text-luxury-charcoal tracking-wide mb-4">
            Khách Hàng Nói Gì
          </h2>
          <div className="w-16 h-px bg-luxury-sage mx-auto mb-6"></div>
          <p className="text-luxury-brown text-base font-light">
            Những đánh giá chân thực từ khách hàng của chúng tôi
          </p>
        </div>

        {/* Slider */}
        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-luxury-white p-8 md:p-12 shadow-lg"
            >
              {/* Quote Icon */}
              <div className="text-luxury-sage/30 text-6xl mb-6 font-serif">"</div>

              {/* Content */}
              <p className="text-luxury-charcoal text-lg md:text-xl font-light leading-relaxed mb-8 italic">
                {testimonials[currentIndex].content}
              </p>

              {/* Rating */}
              <div className="flex items-center justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-luxury-sage"
                />
                <div className="text-left">
                  <h4 className="text-luxury-charcoal font-medium text-lg">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-luxury-taupe text-sm">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-luxury-white hover:bg-luxury-sage text-luxury-charcoal hover:text-luxury-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-md transition-all duration-300 group"
            aria-label="Previous testimonial"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-luxury-white hover:bg-luxury-sage text-luxury-charcoal hover:text-luxury-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-md transition-all duration-300 group"
            aria-label="Next testimonial"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 h-2 bg-luxury-sage'
                    : 'w-2 h-2 bg-luxury-taupe/30 hover:bg-luxury-taupe/50'
                } rounded-full`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSlider;
