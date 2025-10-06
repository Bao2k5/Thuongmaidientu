import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review

  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    ward: '',
    note: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('cod');

  // Mock cart data
  const cartItems = [
    { id: 1, name: 'Nhẫn Kim Cương Soleste', price: 15000000, quantity: 1, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&q=80' },
    { id: 2, name: 'Dây Chuyền Vàng Trắng', price: 12500000, quantity: 1, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop&q=80' },
    { id: 3, name: 'Bông Tai Ngọc Trai', price: 8900000, quantity: 2, image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop&q=80' }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal >= 500000 ? 0 : 50000;
  const total = subtotal + shipping;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setStep(3);
  };

  const handlePlaceOrder = () => {
    // API call to create order
    alert('Đặt hàng thành công! (Sẽ tích hợp với backend sau)');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-gradient-to-b from-sky-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-light mb-4 text-sky-900 tracking-wide text-center">THANH TOÁN</h1>
          <div className="w-20 h-1 bg-sky-500 mx-auto mb-8"></div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4 max-w-2xl mx-auto">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-sky-900 text-white' : 'bg-sky-100 text-sky-400'}`}>
                {step > 1 ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : '1'}
              </div>
              <span className="ml-2 text-sky-700 font-light">Giao hàng</span>
            </div>

            <div className="w-12 h-0.5 bg-sky-200"></div>

            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-sky-900 text-white' : 'bg-sky-100 text-sky-400'}`}>
                {step > 2 ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : '2'}
              </div>
              <span className="ml-2 text-sky-700 font-light">Thanh toán</span>
            </div>

            <div className="w-12 h-0.5 bg-sky-200"></div>

            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-sky-900 text-white' : 'bg-sky-100 text-sky-400'}`}>
                3
              </div>
              <span className="ml-2 text-sky-700 font-light">Xác nhận</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form Area */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Info */}
            {step === 1 && (
              <form onSubmit={handleShippingSubmit} className="space-y-6">
                <div className="bg-white border border-sky-100 p-8">
                  <h2 className="text-2xl font-light text-sky-900 mb-6 tracking-wide">THÔNG TIN GIAO HÀNG</h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sky-900 font-light mb-2">Họ và tên *</label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.fullName}
                        onChange={(e) => setShippingInfo({...shippingInfo, fullName: e.target.value})}
                        className="w-full border border-sky-200 px-4 py-3 focus:outline-none focus:border-sky-500 font-light"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sky-900 font-light mb-2">Email *</label>
                        <input
                          type="email"
                          required
                          value={shippingInfo.email}
                          onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                          className="w-full border border-sky-200 px-4 py-3 focus:outline-none focus:border-sky-500 font-light"
                        />
                      </div>
                      <div>
                        <label className="block text-sky-900 font-light mb-2">Số điện thoại *</label>
                        <input
                          type="tel"
                          required
                          value={shippingInfo.phone}
                          onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                          className="w-full border border-sky-200 px-4 py-3 focus:outline-none focus:border-sky-500 font-light"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sky-900 font-light mb-2">Địa chỉ *</label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.address}
                        onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                        placeholder="Số nhà, tên đường"
                        className="w-full border border-sky-200 px-4 py-3 focus:outline-none focus:border-sky-500 font-light"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sky-900 font-light mb-2">Tỉnh/Thành phố *</label>
                        <input
                          type="text"
                          required
                          value={shippingInfo.city}
                          onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                          className="w-full border border-sky-200 px-4 py-3 focus:outline-none focus:border-sky-500 font-light"
                        />
                      </div>
                      <div>
                        <label className="block text-sky-900 font-light mb-2">Quận/Huyện *</label>
                        <input
                          type="text"
                          required
                          value={shippingInfo.district}
                          onChange={(e) => setShippingInfo({...shippingInfo, district: e.target.value})}
                          className="w-full border border-sky-200 px-4 py-3 focus:outline-none focus:border-sky-500 font-light"
                        />
                      </div>
                      <div>
                        <label className="block text-sky-900 font-light mb-2">Phường/Xã *</label>
                        <input
                          type="text"
                          required
                          value={shippingInfo.ward}
                          onChange={(e) => setShippingInfo({...shippingInfo, ward: e.target.value})}
                          className="w-full border border-sky-200 px-4 py-3 focus:outline-none focus:border-sky-500 font-light"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sky-900 font-light mb-2">Ghi chú</label>
                      <textarea
                        rows="3"
                        value={shippingInfo.note}
                        onChange={(e) => setShippingInfo({...shippingInfo, note: e.target.value})}
                        placeholder="Ghi chú về đơn hàng (tùy chọn)"
                        className="w-full border border-sky-200 px-4 py-3 focus:outline-none focus:border-sky-500 font-light resize-none"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Link
                    to="/cart"
                    className="border-2 border-sky-900 text-sky-900 px-8 py-4 text-sm font-light tracking-wider hover:bg-sky-900 hover:text-white transition-all duration-300"
                  >
                    QUAY LẠI GIỎ HÀNG
                  </Link>
                  <button
                    type="submit"
                    className="flex-1 bg-sky-900 text-white px-8 py-4 text-sm font-light tracking-wider hover:bg-sky-800 transition-all duration-300"
                  >
                    TIẾP TỤC
                  </button>
                </div>
              </form>
            )}

            {/* Step 2: Payment Method */}
            {step === 2 && (
              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                <div className="bg-white border border-sky-100 p-8">
                  <h2 className="text-2xl font-light text-sky-900 mb-6 tracking-wide">PHƯƠNG THỨC THANH TOÁN</h2>

                  <div className="space-y-4">
                    <label className="flex items-start gap-4 p-4 border-2 border-sky-100 cursor-pointer hover:border-sky-400 transition">
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mt-1 w-5 h-5 text-sky-600"
                      />
                      <div className="flex-1">
                        <div className="font-light text-sky-900 mb-1">Thanh toán khi nhận hàng (COD)</div>
                        <p className="text-sm text-sky-600 font-light">Thanh toán bằng tiền mặt khi nhận hàng</p>
                      </div>
                    </label>

                    <label className="flex items-start gap-4 p-4 border-2 border-sky-100 cursor-pointer hover:border-sky-400 transition">
                      <input
                        type="radio"
                        name="payment"
                        value="bank"
                        checked={paymentMethod === 'bank'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mt-1 w-5 h-5 text-sky-600"
                      />
                      <div className="flex-1">
                        <div className="font-light text-sky-900 mb-1">Chuyển khoản ngân hàng</div>
                        <p className="text-sm text-sky-600 font-light">Chuyển khoản qua tài khoản ngân hàng</p>
                      </div>
                    </label>

                    <label className="flex items-start gap-4 p-4 border-2 border-sky-100 cursor-pointer hover:border-sky-400 transition">
                      <input
                        type="radio"
                        name="payment"
                        value="momo"
                        checked={paymentMethod === 'momo'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mt-1 w-5 h-5 text-sky-600"
                      />
                      <div className="flex-1">
                        <div className="font-light text-sky-900 mb-1">Ví MoMo</div>
                        <p className="text-sm text-sky-600 font-light">Thanh toán qua ví điện tử MoMo</p>
                      </div>
                    </label>

                    <label className="flex items-start gap-4 p-4 border-2 border-sky-100 cursor-pointer hover:border-sky-400 transition">
                      <input
                        type="radio"
                        name="payment"
                        value="vnpay"
                        checked={paymentMethod === 'vnpay'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mt-1 w-5 h-5 text-sky-600"
                      />
                      <div className="flex-1">
                        <div className="font-light text-sky-900 mb-1">VNPay</div>
                        <p className="text-sm text-sky-600 font-light">Thanh toán qua cổng VNPay</p>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="border-2 border-sky-900 text-sky-900 px-8 py-4 text-sm font-light tracking-wider hover:bg-sky-900 hover:text-white transition-all duration-300"
                  >
                    QUAY LẠI
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-sky-900 text-white px-8 py-4 text-sm font-light tracking-wider hover:bg-sky-800 transition-all duration-300"
                  >
                    TIẾP TỤC
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: Review Order */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="bg-white border border-sky-100 p-8">
                  <h2 className="text-2xl font-light text-sky-900 mb-6 tracking-wide">XÁC NHẬN ĐƠN HÀNG</h2>

                  {/* Shipping Info Review */}
                  <div className="mb-8 pb-8 border-b border-sky-100">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-light text-sky-900">Thông tin giao hàng</h3>
                      <button onClick={() => setStep(1)} className="text-sm text-sky-600 hover:text-sky-900">Chỉnh sửa</button>
                    </div>
                    <div className="space-y-2 text-sky-700 font-light">
                      <p>{shippingInfo.fullName}</p>
                      <p>{shippingInfo.email} | {shippingInfo.phone}</p>
                      <p>{shippingInfo.address}</p>
                      <p>{shippingInfo.ward}, {shippingInfo.district}, {shippingInfo.city}</p>
                      {shippingInfo.note && <p className="italic">Ghi chú: {shippingInfo.note}</p>}
                    </div>
                  </div>

                  {/* Payment Method Review */}
                  <div className="mb-8 pb-8 border-b border-sky-100">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-light text-sky-900">Phương thức thanh toán</h3>
                      <button onClick={() => setStep(2)} className="text-sm text-sky-600 hover:text-sky-900">Chỉnh sửa</button>
                    </div>
                    <p className="text-sky-700 font-light">
                      {paymentMethod === 'cod' && 'Thanh toán khi nhận hàng (COD)'}
                      {paymentMethod === 'bank' && 'Chuyển khoản ngân hàng'}
                      {paymentMethod === 'momo' && 'Ví MoMo'}
                      {paymentMethod === 'vnpay' && 'VNPay'}
                    </p>
                  </div>

                  {/* Order Items */}
                  <div>
                    <h3 className="text-lg font-light text-sky-900 mb-4">Sản phẩm đặt mua</h3>
                    <div className="space-y-4">
                      {cartItems.map(item => (
                        <div key={item.id} className="flex gap-4">
                          <div className="w-20 h-20 bg-gray-50 flex-shrink-0">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 flex justify-between">
                            <div>
                              <p className="font-light text-sky-900">{item.name}</p>
                              <p className="text-sm text-sky-600 font-light">Số lượng: {item.quantity}</p>
                            </div>
                            <p className="font-light text-sky-900">{formatPrice(item.price * item.quantity)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="border-2 border-sky-900 text-sky-900 px-8 py-4 text-sm font-light tracking-wider hover:bg-sky-900 hover:text-white transition-all duration-300"
                  >
                    QUAY LẠI
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="flex-1 bg-sky-900 text-white px-8 py-4 text-sm font-light tracking-wider hover:bg-sky-800 transition-all duration-300"
                  >
                    ĐẶT HÀNG
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <div className="sticky top-24 bg-sky-50 border border-sky-100 p-8">
              <h2 className="text-2xl font-light text-sky-900 mb-8 tracking-wide">ĐƠN HÀNG</h2>

              <div className="space-y-4 mb-8">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 bg-white border border-sky-100 flex-shrink-0 relative">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      <span className="absolute -top-2 -right-2 bg-sky-900 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-light text-sky-900 truncate">{item.name}</p>
                      <p className="text-sm text-sky-600 font-light">{formatPrice(item.price)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b border-sky-200">
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
              </div>

              <div className="flex justify-between text-xl mb-6">
                <span className="font-light text-sky-900">Tổng cộng</span>
                <span className="font-light text-sky-900">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
