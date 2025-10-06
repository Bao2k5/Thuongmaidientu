import api from './api';

// Create order
export const createOrder = async (orderData) => {
  const response = await api.post('/api/orders', orderData);
  return response.data;
};

// Get user orders
export const getMyOrders = async () => {
  const response = await api.get('/api/orders');
  return response.data;
};

// Get order by ID
export const getOrderById = async (orderId) => {
  const response = await api.get(`/api/orders/${orderId}`);
  return response.data;
};

// Mock payment (COD)
export const mockPayment = async (orderId) => {
  const response = await api.post(`/api/orders/${orderId}/pay`);
  return response.data;
};

// Create Stripe payment intent
export const createPaymentIntent = async (orderData) => {
  const response = await api.post('/api/orders/create-payment-intent', orderData);
  return response.data;
};

const orderService = {
  createOrder,
  getMyOrders,
  getOrderById,
  mockPayment,
  createPaymentIntent,
};

export default orderService;
