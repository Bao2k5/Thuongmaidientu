import { useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  // Mock cart data (sẽ dùng cartStore sau)
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Nhẫn Kim Cương Soleste',
      price: 15000000,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&q=80',
      material: 'Vàng trắng 18K'
    },
    {
      id: 2,
      name: 'Dây Chuyền Vàng Trắng',
      price: 12500000,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop&q=80',
      material: 'Vàng trắng 18K'
    },
    {
      id: 3,
      name: 'Bông Tai Ngọc Trai',
      price: 8900000,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop&q=80',
      material: 'Bạch kim'
    }
  ]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal >= 500000 ? 0 : 50000;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="bg-gradient-to-b from-sky-50 to-white py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-5xl font-light mb-4 text-sky-900 tracking-wide text-center">GIỎ HÀNG</h1>
            <div className="w-20 h-1 bg-sky-500 mx-auto"></div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <svg className="w-32 h-32 mx-auto mb-8 text-sky-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h2 className="text-3xl font-light text-sky-900 mb-4">Giỏ hàng của bạn đang trống</h2>
          <p className="text-sky-700 font-light mb-8">Khám phá các sản phẩm tuyệt vời của chúng tôi</p>
          <Link
            to="/products"
            className="inline-block border-2 border-sky-900 text-sky-900 px-12 py-4 text-sm font-light tracking-widest hover:bg-sky-900 hover:text-white transition-all duration-300"
          >
            MUA SẮM NGAY
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-gradient-to-b from-sky-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-light mb-4 text-sky-900 tracking-wide text-center">GIỎ HÀNG</h1>
          <div className="w-20 h-1 bg-sky-500 mx-auto mb-6"></div>
          <p className="text-sky-700 text-lg font-light text-center">{cartItems.length} sản phẩm</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white border border-sky-100 p-6 hover:shadow-lg transition-shadow">
                <div className="flex gap-6">
                  {/* Image */}
                  <Link to={`/products/${item.id}`} className="w-32 h-32 flex-shrink-0 bg-gray-50 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                  </Link>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex justify-between mb-3">
                      <div>
                        <Link to={`/products/${item.id}`} className="block">
                          <h3 className="text-lg font-light text-sky-900 mb-2 hover:text-sky-600 transition">{item.name}</h3>
                        </Link>
                        <p className="text-sm text-sky-600 font-light">{item.material}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-sky-400 hover:text-red-500 transition"
                        title="Xóa sản phẩm"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-sky-200">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-10 h-10 flex items-center justify-center text-sky-900 hover:bg-sky-50 transition"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                          </svg>
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                          className="w-16 h-10 text-center border-x border-sky-200 text-sky-900 font-light focus:outline-none"
                        />
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-10 h-10 flex items-center justify-center text-sky-900 hover:bg-sky-50 transition"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-lg font-light text-sky-900">{formatPrice(item.price * item.quantity)}</p>
                        <p className="text-sm text-sky-600 font-light">{formatPrice(item.price)} / sản phẩm</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue Shopping */}
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-sky-900 hover:text-sky-600 transition font-light"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Tiếp tục mua sắm
            </Link>
          </div>

          {/* Order Summary */}
          <div>
            <div className="sticky top-24 bg-sky-50 border border-sky-100 p-8">
              <h2 className="text-2xl font-light text-sky-900 mb-8 tracking-wide">TÓM TẮT ĐƠN HÀNG</h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between">
                  <span className="text-sky-700 font-light">Tạm tính</span>
                  <span className="text-sky-900 font-light">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sky-700 font-light">Phí vận chuyển</span>
                  <span className="text-sky-900 font-light">
                    {shipping === 0 ? 'Miễn phí' : formatPrice(shipping)}
                  </span>
                </div>
                {shipping > 0 && (
                  <div className="text-sm text-sky-600 font-light bg-sky-100 p-3 border border-sky-200">
                    Mua thêm {formatPrice(500000 - subtotal)} để được miễn phí vận chuyển
                  </div>
                )}
                <div className="border-t border-sky-200 pt-4">
                  <div className="flex justify-between text-xl">
                    <span className="font-light text-sky-900">Tổng cộng</span>
                    <span className="font-light text-sky-900">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              <Link
                to="/checkout"
                className="block w-full bg-sky-900 text-white py-4 text-center text-sm font-light tracking-wider hover:bg-sky-800 transition-all duration-300 mb-4"
              >
                THANH TOÁN
              </Link>

              {/* Features */}
              <div className="space-y-3 pt-6 border-t border-sky-200">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-sm text-sky-700 font-light">Thanh toán bảo mật</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                  <span className="text-sm text-sky-700 font-light">Giao hàng nhanh chóng</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="text-sm text-sky-700 font-light">Đổi trả dễ dàng</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
