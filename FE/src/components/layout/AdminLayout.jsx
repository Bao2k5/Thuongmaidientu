import { Link, useLocation, Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const { user } = useAuthStore();

  // Redirect if not admin
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { path: '/admin/products', label: 'Sản Phẩm', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
    { path: '/admin/orders', label: 'Đơn Hàng', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    { path: '/admin/users', label: 'Người Dùng', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
  ];

  return (
    <div className="min-h-screen bg-luxury-pearl flex">
      {/* Sidebar */}
      <aside className="w-64 bg-luxury-white border-r border-luxury-platinum fixed h-full">
        <div className="p-6 border-b border-luxury-platinum">
          <h1 className="font-display text-2xl text-luxury-black tracking-wide">Admin Panel</h1>
          <p className="text-xs text-luxury-gray mt-1 uppercase tracking-widest">BTHN Jewelry</p>
        </div>
        <nav className="p-4">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 mb-2 rounded transition-colors ${
                  isActive
                    ? 'bg-luxury-black text-luxury-white'
                    : 'text-luxury-darkGray hover:bg-luxury-pearl'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={item.icon} />
                </svg>
                <span className="text-sm font-medium tracking-wide">{item.label}</span>
              </Link>
            );
          })}
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 mt-8 text-luxury-gray hover:text-luxury-black hover:bg-luxury-pearl rounded transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-sm font-medium tracking-wide">Về Trang Chủ</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
