import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../components/common/ProductCard';
import ReviewCard from '../components/common/ReviewCard';
import { mockProducts, mockReviews } from '../utils/mockData';

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const product = mockProducts.find(p => p.id === parseInt(id)) || mockProducts[0];
  const relatedProducts = mockProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const productReviews = mockReviews.filter(r => r.productId === product.id);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-sky-50 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-sky-700 font-light">
            <Link to="/" className="hover:text-sky-900">Trang chủ</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-sky-900">Sản phẩm</Link>
            <span>/</span>
            <span className="text-sky-900">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Product Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Image Gallery */}
          <div>
            <div className="aspect-square bg-gray-50 mb-4 overflow-hidden border border-sky-100">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`aspect-square bg-gray-50 overflow-hidden border-2 transition ${
                    selectedImage === i ? 'border-sky-900' : 'border-gray-200 hover:border-sky-400'
                  }`}
                >
                  <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-4xl font-light text-sky-900 mb-4 tracking-wide">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-5 h-5 ${i < product.rating ? 'text-sky-500' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sky-700 font-light">({product.reviews} đánh giá)</span>
            </div>

            {/* Price */}
            <div className="mb-8">
              <p className="text-4xl font-light text-sky-900 mb-2">{formatPrice(product.price)}</p>
              <div className="flex items-center gap-2">
                {product.inStock ? (
                  <>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-600 font-light text-sm">Còn hàng</span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-red-600 font-light text-sm">Hết hàng</span>
                  </>
                )}
              </div>
            </div>

            {/* Quick Info */}
            <div className="space-y-3 mb-8 pb-8 border-b border-sky-100">
              <div className="flex items-center gap-3">
                <span className="text-sky-700 font-light w-32">Chất liệu:</span>
                <span className="text-sky-900 font-light">{product.material}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sky-700 font-light w-32">Danh mục:</span>
                <span className="text-sky-900 font-light">{product.category}</span>
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <label className="block text-sky-900 font-light mb-3">Số lượng</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-sky-200">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center text-sky-900 hover:bg-sky-50 transition"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                    </svg>
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 h-12 text-center border-x border-sky-200 text-sky-900 font-light focus:outline-none"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center text-sky-900 hover:bg-sky-50 transition"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 mb-8">
              <button className="w-full bg-sky-900 text-white py-4 text-sm font-light tracking-wider hover:bg-sky-800 transition-all duration-300 flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                THÊM VÀO GIỎ HÀNG
              </button>
              <button className="w-full border-2 border-sky-900 text-sky-900 py-4 text-sm font-light tracking-wider hover:bg-sky-900 hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                THÊM VÀO YÊU THÍCH
              </button>
            </div>

            {/* Features */}
            <div className="space-y-4 bg-sky-50 p-6 border border-sky-100">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-sky-900 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                <div>
                  <h4 className="font-light text-sky-900 mb-1">Miễn phí vận chuyển</h4>
                  <p className="text-sm text-sky-700 font-light">Cho đơn hàng từ 500.000đ</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-sky-900 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <div>
                  <h4 className="font-light text-sky-900 mb-1">Bảo hành trọn đời</h4>
                  <p className="text-sm text-sky-700 font-light">Chất lượng được đảm bảo</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-sky-900 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <div>
                  <h4 className="font-light text-sky-900 mb-1">Đổi trả dễ dàng</h4>
                  <p className="text-sm text-sky-700 font-light">Trong vòng 30 ngày</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mb-20">
          {/* Tab Headers */}
          <div className="flex gap-8 border-b border-sky-100 mb-8">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-4 text-sm font-light tracking-wider transition ${
                activeTab === 'description'
                  ? 'text-sky-900 border-b-2 border-sky-900'
                  : 'text-sky-600 hover:text-sky-900'
              }`}
            >
              MÔ TẢ
            </button>
            <button
              onClick={() => setActiveTab('specifications')}
              className={`pb-4 text-sm font-light tracking-wider transition ${
                activeTab === 'specifications'
                  ? 'text-sky-900 border-b-2 border-sky-900'
                  : 'text-sky-600 hover:text-sky-900'
              }`}
            >
              THÔNG SỐ KỸ THUẬT
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 text-sm font-light tracking-wider transition ${
                activeTab === 'reviews'
                  ? 'text-sky-900 border-b-2 border-sky-900'
                  : 'text-sky-600 hover:text-sky-900'
              }`}
            >
              ĐÁNH GIÁ ({product.reviews})
            </button>
          </div>

          {/* Tab Content */}
          <div className="max-w-3xl">
            {activeTab === 'description' && (
              <div className="text-sky-700 font-light leading-relaxed text-lg">
                {product.description}
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="space-y-4">
                {product.specifications && Object.entries(product.specifications).map(([key, value]) => {
                  const labels = {
                    material: 'Chất liệu',
                    gemstone: 'Đá quý',
                    pearl: 'Ngọc trai',
                    weight: 'Trọng lượng',
                    size: 'Kích thước',
                    length: 'Chiều dài',
                    diameter: 'Đường kính'
                  };
                  return (
                    <div key={key} className="flex border-b border-sky-50 pb-3">
                      <span className="w-48 text-sky-700 font-light">{labels[key] || key}:</span>
                      <span className="flex-1 text-sky-900 font-light">{value}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-8">
                {productReviews.map(review => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light mb-4 text-sky-900 tracking-wide">SẢN PHẨM LIÊN QUAN</h2>
            <div className="w-20 h-1 bg-sky-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
