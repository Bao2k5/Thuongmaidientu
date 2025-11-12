import { create } from 'zustand';
import api from '../services/api';

const useWishlistStore = create((set, get) => ({
  items: [],
  loading: false,
  error: null,

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

  addToWishlist: async (product) => {
    set({ loading: true, error: null });
    try {
      await api.post('/api/users/wishlist', { productId: product._id });
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

  isInWishlist: (productId) => {
    const { items } = get();
    return items.some(item => item.product._id === productId);
  },

  clearWishlist: () => {
    set({ items: [], error: null });
  },

  getWishlistCount: () => {
    const { items } = get();
    return items.length;
  },
}));

export default useWishlistStore;
