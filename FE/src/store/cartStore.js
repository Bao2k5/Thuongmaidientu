import { create } from 'zustand';

const useCartStore = create((set, get) => ({
  items: [],
  loading: false,

  // Add to cart
  addToCart: (product, qty = 1) => {
    const { items } = get();
    const existingItem = items.find(item => item.id === product.id);
    
    if (existingItem) {
      set({
        items: items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        ),
      });
    } else {
      set({ items: [...items, { ...product, quantity: qty }] });
    }
  },

  // Remove from cart
  removeFromCart: (productId) => {
    const { items } = get();
    set({ items: items.filter(item => item.id !== productId) });
  },

  // Update quantity
  updateQuantity: (productId, qty) => {
    const { items } = get();
    set({
      items: items.map(item =>
        item.id === productId ? { ...item, quantity: qty } : item
      ),
    });
  },

  // Clear cart
  clearCart: () => {
    set({ items: [] });
  },

  // Get cart count
  getCartCount: () => {
    const { items } = get();
    return items.reduce((total, item) => total + item.quantity, 0);
  },

  // Get cart total
  getCartTotal: () => {
    const { items } = get();
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  },
}));

export default useCartStore;
