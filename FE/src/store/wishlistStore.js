import { create } from 'zustand';

const useWishlistStore = create((set, get) => ({
  items: [],
  loading: false,

  // Add to wishlist
  addToWishlist: (product) => {
    const { items } = get();
    const exists = items.find(item => item.id === product.id);
    
    if (!exists) {
      set({ items: [...items, product] });
    }
  },

  // Remove from wishlist
  removeFromWishlist: (productId) => {
    const { items } = get();
    set({ items: items.filter(item => item.id !== productId) });
  },

  // Check if product is in wishlist
  isInWishlist: (productId) => {
    const { items } = get();
    return items.some(item => item.id === productId);
  },

  // Clear wishlist
  clearWishlist: () => {
    set({ items: [] });
  },

  // Get wishlist count
  getWishlistCount: () => {
    const { items } = get();
    return items.length;
  },
}));

export default useWishlistStore;
