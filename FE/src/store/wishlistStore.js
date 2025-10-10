import { create } from 'zustand';
import api from '../services/api';

const useWishlistStore = create((set, get) => ({
  items: [],
  loading: false,
  error: null,

  // Fetch wishlist from API
  fetchWishlist: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get('/api/users/wishlist');
      set({ 
        items: response.data.wishlist || [], 
        loading: false 
      });
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      set({ 
        loading: false, 
        error: error.response?.data?.message || 'Failed to fetch wishlist',
        items: [] // Fallback to empty array on error
      });
    }
  },

  // Add to wishlist
  addToWishlist: async (product) => {
    set({ loading: true, error: null });
    try {
      await api.post(`/api/users/wishlist/${product._id}`);
      const { items } = get();
      const exists = items.find(item => item.product._id === product._id);
      
      if (!exists) {
        set({ 
          items: [...items, { product }], 
          loading: false 
        });
      } else {
        set({ loading: false });
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      set({ 
        loading: false, 
        error: error.response?.data?.message || 'Failed to add to wishlist' 
      });
      throw error;
    }
  },

  // Remove from wishlist
  removeFromWishlist: async (productId) => {
    set({ loading: true, error: null });
    try {
      await api.delete(`/api/users/wishlist/${productId}`);
      const { items } = get();
      set({ 
        items: items.filter(item => item.product._id !== productId),
        loading: false 
      });
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      set({ 
        loading: false, 
        error: error.response?.data?.message || 'Failed to remove from wishlist' 
      });
      throw error;
    }
  },

  // Check if product is in wishlist
  isInWishlist: (productId) => {
    const { items } = get();
    return items.some(item => item.product._id === productId);
  },

  // Clear wishlist
  clearWishlist: () => {
    set({ items: [], error: null });
  },

  // Get wishlist count
  getWishlistCount: () => {
    const { items } = get();
    return items.length;
  },
}));

export default useWishlistStore;
