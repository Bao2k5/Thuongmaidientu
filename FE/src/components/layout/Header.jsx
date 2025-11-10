import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import useCartStore from '../../store/cartStore';
import useWishlistStore from '../../store/wishlistStore';
import UserDropdown from '../common/UserDropdown';

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
    { name: 'Trang chủ', path: '/' },
    { name: 'Sản phẩm', path: '/products?featured=true' },
    { name: 'Giới thiệu', path: '/about' },
    { name: 'Liên hệ', path: '/contact' },
  ];

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-luxury-cream/95 backdrop-blur-sm border-b border-luxury-sage/30 ${
          isScrolled ? 'shadow-sm' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left Actions - User & Search */}
            <div className="flex items-center space-x-6">
              {/* Search Icon */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-luxury-brown hover:text-luxury-charcoal transition-colors duration-300"
                aria-label="Search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* User Avatar/Login */}
              {user ? (
                <UserDropdown user={user} onLogout={handleLogout} />
              ) : (
                <Link
                  to="/login"
                  className="text-luxury-brown hover:text-luxury-charcoal transition-colors duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </Link>
              )}
            </div>

            {/* Center Logo - Mộc Miên Style */}
            <Link to="/" className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center group">
              <div className="font-serif text-luxury-charcoal text-base md:text-lg font-medium tracking-[0.3em] transition-colors hover:text-luxury-taupe uppercase">
                HM Jewelry
              </div>
              <div className="h-px w-16 bg-luxury-sage mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>

            {/* Right Actions - Wishlist & Cart */}
            <div className="flex items-center space-x-6">
              {/* Wishlist Icon */}
              <Link to="/wishlist" className="relative text-luxury-brown hover:text-luxury-charcoal transition-colors duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-luxury-charcoal text-luxury-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-medium">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              {/* Cart Icon */}
              <Link to="/cart" className="relative text-luxury-brown hover:text-luxury-charcoal transition-colors duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-luxury-charcoal text-luxury-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-medium">
                    {cartItemsCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-luxury-brown hover:text-luxury-charcoal transition-colors"
                aria-label="Menu"
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

          {/* Desktop Navigation - Below header */}
          <nav className="hidden md:flex items-center justify-center space-x-10 py-3 border-t border-luxury-sage/20">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-luxury-brown text-xs font-medium tracking-[0.15em] hover:text-luxury-charcoal transition-colors relative group uppercase"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-luxury-charcoal group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-x-0 top-[152px] bg-luxury-cream/95 backdrop-blur-sm border-b border-luxury-sage/30 z-40 md:hidden">
          <nav className="max-w-7xl mx-auto px-4 flex flex-col space-y-2 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3 text-luxury-brown text-xs tracking-[0.15em] hover:text-luxury-charcoal transition-colors uppercase"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* Search Modal */}
      {isSearchOpen && (
        <>
          <div
            onClick={() => setIsSearchOpen(false)}
            className="fixed inset-0 bg-luxury-black/20 z-40 backdrop-blur-sm"
          />
          <div className="fixed top-28 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-luxury-cream shadow-sm z-50 mx-4 border border-luxury-beige">
            <form onSubmit={handleSearch} className="p-6">
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-luxury-taupe" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm sản phẩm..."
                  className="flex-1 text-lg text-luxury-brown outline-none bg-transparent placeholder:text-luxury-taupe"
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
