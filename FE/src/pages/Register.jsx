import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Mật khẩu xác nhận không khớp!');
      return;
    }

    if (!acceptTerms) {
      alert('Vui lòng đồng ý với điều khoản dịch vụ!');
      return;
    }

    try {
      // API call sẽ được thêm sau
      console.log('Register:', formData);
      alert('Đăng ký thành công! (Sẽ tích hợp với backend sau)');
      navigate('/login');
    } catch (error) {
      console.error('Register error:', error);
      alert('Đăng ký thất bại. Vui lòng thử lại.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-luxury-ivory to-luxury-cream flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-light text-luxury-charcoal mb-4 tracking-wide">ĐĂNG KÝ</h1>
          <div className="w-20 h-1 bg-luxury-taupe mx-auto mb-6"></div>
          <p className="text-luxury-brown font-light">Tạo tài khoản mới</p>
        </div>

        {/* Form */}
        <div className="bg-white border border-luxury-sand p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-luxury-charcoal font-light mb-2">Họ và tên *</label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className="w-full border border-luxury-beige px-4 py-3 focus:outline-none focus:border-luxury-taupe font-light"
                placeholder="Nguyễn Văn A"
              />
            </div>

            <div>
              <label className="block text-luxury-charcoal font-light mb-2">Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full border border-luxury-beige px-4 py-3 focus:outline-none focus:border-luxury-taupe font-light"
                placeholder="example@email.com"
              />
            </div>

            <div>
              <label className="block text-luxury-charcoal font-light mb-2">Số điện thoại *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full border border-luxury-beige px-4 py-3 focus:outline-none focus:border-luxury-taupe font-light"
                placeholder="0901234567"
              />
            </div>

            <div>
              <label className="block text-luxury-charcoal font-light mb-2">Mật khẩu *</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full border border-luxury-beige px-4 py-3 pr-12 focus:outline-none focus:border-luxury-taupe font-light"
                  placeholder="••••••••"
                  minLength="6"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-luxury-taupe hover:text-luxury-brown"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              <p className="text-xs text-luxury-brown mt-1 font-light">Mật khẩu phải có ít nhất 6 ký tự</p>
            </div>

            <div>
              <label className="block text-luxury-charcoal font-light mb-2">Xác nhận mật khẩu *</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="w-full border border-luxury-beige px-4 py-3 pr-12 focus:outline-none focus:border-luxury-taupe font-light"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-luxury-taupe hover:text-luxury-brown"
                >
                  {showConfirmPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="flex items-start cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="w-4 h-4 text-luxury-taupe border-luxury-beige focus:ring-luxury-taupe mt-1"
                />
                <span className="ml-2 text-sm text-luxury-brown font-light">
                  Tôi đồng ý với{' '}
                  <a href="#" className="text-luxury-charcoal hover:text-luxury-taupe">Điều khoản dịch vụ</a>
                  {' '}và{' '}
                  <a href="#" className="text-luxury-charcoal hover:text-luxury-taupe">Chính sách bảo mật</a>
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-luxury-charcoal text-white py-4 text-sm font-light tracking-wider hover:bg-luxury-brown transition-all duration-300"
            >
              ĐĂNG KÝ
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-luxury-brown font-light">
              Đã có tài khoản?{' '}
              <Link to="/login" className="text-luxury-charcoal hover:text-luxury-taupe font-normal">
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link to="/" className="text-sm text-luxury-taupe hover:text-luxury-charcoal font-light">
            ← Quay về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
