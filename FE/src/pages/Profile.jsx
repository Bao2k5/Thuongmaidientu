import { Link } from 'react-router-dom';

const Profile = () => {
  // Mock user data
  const user = {
    fullName: 'Nguyễn Văn A',
    email: 'nguyenvana@email.com',
    phone: '0901234567',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80'
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-gradient-to-b from-luxury-ivory to-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-light mb-4 text-luxury-charcoal tracking-wide text-center">TÀI KHOẢN</h1>
          <div className="w-20 h-1 bg-luxury-taupe mx-auto"></div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="space-y-2">
            <Link to="/profile" className="block px-4 py-3 bg-luxury-charcoal text-white font-light">
              Thông tin tài khoản
            </Link>
            <Link to="/orders" className="block px-4 py-3 border border-luxury-beige text-luxury-brown hover:bg-luxury-ivory font-light transition">
              Đơn hàng của tôi
            </Link>
            <Link to="/wishlist" className="block px-4 py-3 border border-luxury-beige text-luxury-brown hover:bg-luxury-ivory font-light transition">
              Sản phẩm yêu thích
            </Link>
            <button className="block w-full text-left px-4 py-3 border border-luxury-beige text-red-600 hover:bg-red-50 font-light transition">
              Đăng xuất
            </button>
          </div>

          {/* Content */}
          <div className="md:col-span-3">
            <div className="bg-white border border-luxury-beige p-8">
              <div className="flex items-center gap-6 mb-8 pb-8 border-b border-luxury-beige">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
                  <img src={user.avatar} alt={user.fullName} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h2 className="text-2xl font-light text-luxury-charcoal mb-2">{user.fullName}</h2>
                  <button className="text-sm text-luxury-taupe hover:text-luxury-charcoal font-light">
                    Thay đổi ảnh đại diện
                  </button>
                </div>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-luxury-charcoal font-light mb-2">Họ và tên</label>
                    <input
                      type="text"
                      defaultValue={user.fullName}
                      className="w-full border border-luxury-beige px-4 py-3 focus:outline-none focus:border-luxury-taupe font-light"
                    />
                  </div>
                  <div>
                    <label className="block text-luxury-charcoal font-light mb-2">Số điện thoại</label>
                    <input
                      type="tel"
                      defaultValue={user.phone}
                      className="w-full border border-luxury-beige px-4 py-3 focus:outline-none focus:border-luxury-taupe font-light"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-luxury-charcoal font-light mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue={user.email}
                    className="w-full border border-luxury-beige px-4 py-3 focus:outline-none focus:border-luxury-taupe font-light"
                  />
                </div>

                <div className="pt-6 border-t border-luxury-beige">
                  <h3 className="text-lg font-light text-luxury-charcoal mb-4">Đổi mật khẩu</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-luxury-charcoal font-light mb-2">Mật khẩu hiện tại</label>
                      <input
                        type="password"
                        className="w-full border border-luxury-beige px-4 py-3 focus:outline-none focus:border-luxury-taupe font-light"
                        placeholder="••••••••"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-luxury-charcoal font-light mb-2">Mật khẩu mới</label>
                        <input
                          type="password"
                          className="w-full border border-luxury-beige px-4 py-3 focus:outline-none focus:border-luxury-taupe font-light"
                          placeholder="••••••••"
                        />
                      </div>
                      <div>
                        <label className="block text-luxury-charcoal font-light mb-2">Xác nhận mật khẩu mới</label>
                        <input
                          type="password"
                          className="w-full border border-luxury-beige px-4 py-3 focus:outline-none focus:border-luxury-taupe font-light"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-luxury-charcoal text-white px-12 py-4 text-sm font-light tracking-wider hover:bg-luxury-brown transition-all duration-300"
                  >
                    LƯU THAY ĐỔI
                  </button>
                  <button
                    type="button"
                    className="border-2 border-luxury-beige text-luxury-brown px-12 py-4 text-sm font-light tracking-wider hover:border-luxury-taupe transition-all duration-300"
                  >
                    HỦY
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
