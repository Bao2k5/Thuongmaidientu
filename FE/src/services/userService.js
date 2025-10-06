import api from './api';

// Get user profile
export const getProfile = async () => {
  const response = await api.get('/api/users/profile');
  return response.data;
};

// Update user profile
export const updateProfile = async (userData) => {
  const response = await api.put('/api/users/profile', userData);
  return response.data;
};

// Get wishlist
export const getWishlist = async () => {
  const response = await api.get('/api/users/wishlist');
  return response.data;
};

// Add to wishlist
export const addToWishlist = async (productId) => {
  const response = await api.post(`/api/users/wishlist/${productId}`);
  return response.data;
};

// Remove from wishlist
export const removeFromWishlist = async (productId) => {
  const response = await api.delete(`/api/users/wishlist/${productId}`);
  return response.data;
};

// Get collections
export const getCollections = async () => {
  const response = await api.get('/api/collections');
  return response.data;
};

// Get collection by slug
export const getCollectionBySlug = async (slug) => {
  const response = await api.get(`/api/collections/${slug}`);
  return response.data;
};

// Get active promos
export const getActivePromos = async () => {
  const response = await api.get('/api/promos/active');
  return response.data;
};

const userService = {
  getProfile,
  updateProfile,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  getCollections,
  getCollectionBySlug,
  getActivePromos,
};

export default userService;
