import api from './api';

// Get cart
export const getCart = async () => {
  const response = await api.get('/api/cart');
  return response.data;
};

// Add to cart
export const addToCart = async (productId, qty = 1) => {
  const response = await api.post('/api/cart', { productId, qty });
  return response.data;
};

// Update cart item
export const updateCartItem = async (productId, qty) => {
  const response = await api.put('/api/cart', { productId, qty });
  return response.data;
};

// Remove from cart
export const removeFromCart = async (productId) => {
  const response = await api.delete('/api/cart', {
    data: { productId },
  });
  return response.data;
};

// Clear cart
export const clearCart = async () => {
  const response = await api.delete('/api/cart');
  return response.data;
};

const cartService = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};

export default cartService;
