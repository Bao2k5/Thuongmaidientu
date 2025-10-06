import api from './api';

// Get all products with filters
export const getProducts = async (params = {}) => {
  const response = await api.get('/api/products', { params });
  return response.data;
};

// Get product by ID
export const getProductById = async (id) => {
  const response = await api.get(`/api/products/${id}`);
  return response.data;
};

// Get product by slug
export const getProductBySlug = async (slug) => {
  const response = await api.get(`/api/products/slug/${slug}`);
  return response.data;
};

// Search products
export const searchProducts = async (query) => {
  const response = await api.get('/api/products', {
    params: { search: query },
  });
  return response.data;
};

// Get product reviews
export const getProductReviews = async (productId) => {
  const response = await api.get(`/api/products/${productId}/reviews`);
  return response.data;
};

// Create product review
export const createReview = async (productId, reviewData) => {
  const response = await api.post(`/api/products/${productId}/reviews`, reviewData);
  return response.data;
};

const productService = {
  getProducts,
  getProductById,
  getProductBySlug,
  searchProducts,
  getProductReviews,
  createReview,
};

export default productService;
