import { Link } from 'react-router-dom';
import ProductCard from '../components/common/ProductCard';
import { mockProducts, mockTestimonials, mockCollections } from '../utils/mockData';

const HomeSimple = () => {
  const featuredProducts = mockProducts.slice(0, 8);

  return (
    <div className="min-h-screen bg-luxury-white">
      {/* Hero Section - Full Width Image Banner */}
      <section className="relative h-[700px] w-full overflow-hidden">
        <img 
          src="/bthn-hero.jpg" 
          alt="BTHN Jewelry"
          className="w-full h-full object-cover object-top"
        />
      </section>

      {/* Features */}
      <section className="section-luxury bg-luxury-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <svg className="w-10 h-10 text-luxury-darkGray group-hover:text-luxury-black transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <h3 className="text-sm font-sans font-medium mb-2 text-luxury-black uppercase tracking-widest">Miễn Phí Vận Chuyển</h3>
              <p className="text-luxury-gray text-sm font-light">Đơn hàng từ 500.000đ</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <svg className="w-10 h-10 text-luxury-darkGray group-hover:text-luxury-black transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-sm font-sans font-medium mb-2 text-luxury-black uppercase tracking-widest">Thanh Toán Bảo Mật</h3>
              <p className="text-luxury-gray text-sm font-light">An toàn 100%</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <svg className="w-10 h-10 text-luxury-darkGray group-hover:text-luxury-black transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-sm font-sans font-medium mb-2 text-luxury-black uppercase tracking-widest">Chất Lượng Đảm Bảo</h3>
              <p className="text-luxury-gray text-sm font-light">Bảo hành trọn đời</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <svg className="w-10 h-10 text-luxury-darkGray group-hover:text-luxury-black transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-sm font-sans font-medium mb-2 text-luxury-black uppercase tracking-widest">Đổi Trả Dễ Dàng</h3>
              <p className="text-luxury-gray text-sm font-light">Trong vòng 30 ngày</p>
            </div>
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="section-luxury bg-luxury-white border-t border-luxury-platinum">
        <div className="container-luxury">
          <div className="text-center mb-20">
            <h2 className="font-serif text-5xl font-light mb-6 text-luxury-black tracking-wide">Bộ Sưu Tập</h2>
            <div className="w-16 h-px bg-luxury-gray mx-auto mb-6"></div>
            <p className="text-luxury-gray text-base font-light tracking-wide">Khám phá vẻ đẹp tinh tế của từng thiết kế</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {mockCollections.map((item) => (
              <Link
                key={item.id}
                to="/products"
                className="group block relative"
              >
                <div className="aspect-square relative overflow-hidden border-1 border-luxury-platinum">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-luxury-black/0 group-hover:bg-luxury-black/10 transition-all duration-500" />
                </div>
                <div className="mt-6 text-center">
                  <h3 className="font-serif text-2xl font-light text-luxury-black mb-2 tracking-wide">{item.name}</h3>
                  <p className="text-luxury-gray text-sm font-light tracking-wide">{item.count} sản phẩm</p>
                  <div className="w-8 h-px bg-luxury-black mx-auto opacity-0 group-hover:opacity-100 transition-opacity mt-3"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="section-luxury bg-luxury-pearl">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="aspect-[4/5] bg-luxury-platinum overflow-hidden border-1 border-luxury-platinum">
              <img 
                src="/bthn-hero.jpg" 
                alt="About BTHN Jewelry"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-serif text-5xl font-light mb-8 text-luxury-black tracking-wide">Về BTHN Jewelry</h2>
              <div className="space-y-6 text-luxury-gray text-base leading-relaxed font-light">
                <p>
                  BTHN Jewelry là thương hiệu trang sức cao cấp, được thành lập với sứ mệnh mang đến những sản phẩm 
                  trang sức tinh tế, sang trọng và đầy ý nghĩa cho khách hàng.
                </p>
                <p>
                  Mỗi sản phẩm của chúng tôi đều được chế tác tỉ mỉ từ những nguyên liệu quý hiếm nhất, 
                  kết hợp với tay nghề thủ công tinh xảo của các nghệ nhân hàng đầu.
                </p>
                <p>
                  Chúng tôi tin rằng trang sức không chỉ là phụ kiện, mà còn là biểu tượng của tình yêu, 
                  sự gắn kết và những kỷ niệm đáng nhớ trong cuộc đời mỗi người.
                </p>
              </div>
              <Link to="/products" className="btn-luxury mt-10 inline-block">
                KHÁM PHÁ BỘ SƯU TẬP
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-luxury bg-luxury-white border-t border-luxury-platinum">
        <div className="container-luxury">
          <div className="text-center mb-20">
            <h2 className="font-serif text-5xl font-light mb-6 text-luxury-black tracking-wide">Khách Hàng Nói Gì</h2>
            <div className="w-16 h-px bg-luxury-gray mx-auto mb-6"></div>
            <p className="text-luxury-gray text-base font-light tracking-wide">Trải nghiệm của khách hàng là niềm tự hào của chúng tôi</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {mockTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="card-luxury p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-luxury-darkGray" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-luxury-gray font-light leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-luxury-platinum rounded-full flex items-center justify-center mr-4">
                    <span className="font-serif text-luxury-darkGray text-lg">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-medium text-luxury-black">{testimonial.name}</p>
                    <p className="text-sm text-luxury-lightGray font-light">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="section-luxury bg-luxury-pearl border-t border-luxury-platinum">
        <div className="container-luxury">
          <div className="text-center mb-20">
            <h2 className="font-serif text-5xl font-light mb-6 text-luxury-black tracking-wide">@BTHN.Jewelry</h2>
            <div className="w-16 h-px bg-luxury-gray mx-auto mb-6"></div>
            <p className="text-luxury-gray text-base font-light tracking-wide">Theo dõi chúng tôi trên Instagram</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square bg-luxury-platinum overflow-hidden group cursor-pointer border-1 border-luxury-platinum">
                <img 
                  src={`/product-${i}.png`}
                  alt={`Instagram ${i}`}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80';
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-luxury bg-luxury-white border-t border-luxury-platinum">
        <div className="container-luxury">
          <div className="text-center mb-20">
            <h2 className="font-serif text-5xl font-light mb-6 text-luxury-black tracking-wide">Sản Phẩm Nổi Bật</h2>
            <div className="w-16 h-px bg-luxury-gray mx-auto mb-6"></div>
            <p className="text-luxury-gray text-base font-light tracking-wide">Khám phá những thiết kế được yêu thích nhất</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-16">
            <Link to="/products" className="btn-luxury">
              XEM TẤT CẢ SẢN PHẨM
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter - Light Sky Blue Background (Ocean Water) */}
      <section className="section-luxury bg-gradient-to-br from-sky-50 via-cyan-50 to-blue-50">
        <div className="container-luxury">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-5xl font-light mb-6 tracking-wide text-sky-800">Đăng Ký Nhận Ưu Đãi</h2>
            <p className="text-sky-700 text-base font-light mb-10 tracking-wide">
              Nhận ngay mã giảm giá 10% cho đơn hàng đầu tiên và cập nhật về bộ sưu tập mới nhất
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Địa chỉ email của bạn"
                className="input-luxury flex-1 text-luxury-darkGray bg-white"
              />
              <button type="submit" className="bg-sky-500 text-white hover:bg-sky-600 px-10 py-3 border-2 border-sky-500 hover:border-sky-600 font-medium uppercase tracking-widest transition-all duration-300 whitespace-nowrap">
                ĐĂNG KÝ
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeSimple;
