import { Link } from 'react-router-dom';
import { useState } from 'react';
import useWishlistStore from '../../store/wishlistStore';
import useAuthStore from '../../store/authStore';

const ProductCard = ({ product, onQuickView }) => {
  const { user } = useAuthStore();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlistStore();
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const displayPrice = product.priceSale || product.price;
  const hasDiscount = product.priceSale && product.priceSale < product.price;
  const inWishlist = isInWishlist(product._id);

  const handleWishlistToggle = async (e) => {
    e.preventDefault(); // Prevent navigation to product detail
    e.stopPropagation();
    
    if (!user) {
      // Could show login modal or redirect to login
      return;
    }

    setWishlistLoading(true);
    try {
      if (inWishlist) {
        await removeFromWishlist(product._id);
      } else {
        await addToWishlist(product);
      }
    } catch (error) {
      console.error('Wishlist error:', error);
    } finally {
      setWishlistLoading(false);
    }
  };

  return (
    <div className="group relative card-luxury">
      <Link to={`/products/${product.id}`} className="block">
        <div className="aspect-square overflow-hidden bg-luxury-pearl">
          <img 
            src={product.images?.[0] || product.img} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-6">
          <p className="text-luxury-gray text-xs tracking-widest mb-2 uppercase">{product.category}</p>
          <h3 className="font-serif text-luxury-black font-light text-lg tracking-wide mb-3 group-hover:text-luxury-darkGray transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mb-2">
            {hasDiscount && (
              <span className="text-luxury-lightGray line-through text-sm">{formatPrice(product.price)}</span>
            )}
            <span className={`font-medium ${hasDiscount ? 'text-luxury-black' : 'text-luxury-darkGray'}`}>
              {formatPrice(displayPrice)}
            </span>
          </div>
          {product.rating && (
            <div className="flex items-center gap-1 text-luxury-darkGray text-sm">
              {'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}
              <span className="text-luxury-gray ml-1">({product.reviews})</span>
            </div>
          )}
        </div>
      </Link>
      
      {/* Wishlist Heart Button */}
      {user && (
        <button
          onClick={handleWishlistToggle}
          disabled={wishlistLoading}
          className={`absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
            inWishlist 
              ? 'bg-red-500 text-white shadow-lg' 
              : 'bg-luxury-white/90 text-luxury-darkGray hover:bg-red-50 hover:text-red-500'
          } ${wishlistLoading ? 'opacity-50 cursor-not-allowed' : 'opacity-0 group-hover:opacity-100'}`}
          title={inWishlist ? 'Xóa khỏi yêu thích' : 'Thêm vào yêu thích'}
        >
          {wishlistLoading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
          ) : (
            <svg 
              className="w-5 h-5" 
              fill={inWishlist ? "currentColor" : "none"} 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
              />
            </svg>
          )}
        </button>
      )}

      {/* Quick View Button */}
      {onQuickView && (
        <button
          onClick={() => onQuickView(product)}
          className="absolute top-4 right-4 bg-luxury-white/90 p-2 opacity-0 group-hover:opacity-100 transition-all border-1 border-luxury-platinum hover:bg-luxury-black hover:text-luxury-white"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ProductCard;
