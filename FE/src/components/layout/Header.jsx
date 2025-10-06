import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import useCartStore from '../../store/cartStore';
import useWishlistStore from '../../store/wishlistStore';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { items: cartItems } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'TRANG CHỦ', path: '/' },
    { name: 'SẢN PHẨM', path: '/products' },
    { name: 'BỘ SƯU TẬP', path: '/collections' },
    { name: 'LIÊN HỆ', path: '/contact' },
  ];

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-luxury-white border-b border-luxury-platinum ${
          isScrolled ? 'shadow-sm' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            {/* Logo - BTHN JEWELRY */}
            <Link to="/" className="flex items-center group">
              <div className="font-display text-luxury-black text-4xl tracking-wide transition-colors hover:text-luxury-darkGray">
                <span className="font-light">BTHN</span>
                <span className="font-normal text-2xl ml-2 tracking-widest">JEWELRY</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-10">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-luxury-darkGray text-xs font-medium tracking-widest hover:text-luxury-black transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-luxury-black group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-7">
              {/* Search Icon */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-luxury-darkGray hover:text-luxury-black transition-colors duration-300"
                aria-label="Search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Wishlist Icon */}
              <Link to="/wishlist" className="relative text-luxury-darkGray hover:text-luxury-black transition-colors duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-luxury-black text-luxury-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-medium">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              {/* Cart Icon */}
              <Link to="/cart" className="relative text-luxury-darkGray hover:text-luxury-black transition-colors duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-luxury-black text-luxury-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-medium">
                    {cartItemsCount}
                  </span>
                )}
              </Link>

              {/* User Menu */}
              {user ? (
                <div className="relative group">
                  <button className="text-luxury-darkGray hover:text-luxury-black transition-colors duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-luxury-white border-1 border-luxury-platinum shadow-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <Link to="/profile" className="block px-4 py-3 text-sm text-luxury-darkGray hover:bg-luxury-pearl hover:text-luxury-black transition-colors">
                      Tài khoản
                    </Link>
                    <Link to="/orders" className="block px-4 py-3 text-sm text-luxury-darkGray hover:bg-luxury-pearl hover:text-luxury-black transition-colors">
                      Đơn hàng
                    </Link>
                    {user.role === 'admin' && (
                      <Link to="/admin" className="block px-4 py-3 text-sm text-luxury-darkGray hover:bg-luxury-pearl hover:text-luxury-black transition-colors">
                        Quản trị
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-sm text-luxury-darkGray hover:bg-luxury-pearl hover:text-luxury-black transition-colors"
                    >
                      Đăng xuất
                    </button>
                  </div>
                </div>
              ) : (
                <Link to="/login" className="btn-luxury-small">
                  ĐĂNG NHẬP
                </Link>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-luxury-darkGray hover:text-luxury-black transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden pb-4 border-t border-luxury-platinum">
              <nav className="flex flex-col space-y-2 mt-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-3 text-luxury-darkGray text-sm tracking-widest hover:text-luxury-black transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Search Modal */}
      {isSearchOpen && (
        <>
          <div
            onClick={() => setIsSearchOpen(false)}
            className="fixed inset-0 bg-luxury-black/20 z-40 backdrop-blur-sm"
          />
          <div className="fixed top-28 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-luxury-white shadow-sm z-50 mx-4 border-1 border-luxury-platinum">
            <form onSubmit={handleSearch} className="p-6">
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-luxury-lightGray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm sản phẩm..."
                  className="flex-1 text-lg text-luxury-darkGray outline-none bg-transparent placeholder:text-luxury-lightGray"
                  autoFocus
                />
                <button
                  type="submit"
                  className="btn-luxury-small"
                >
                  TÌM KIẾM
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
