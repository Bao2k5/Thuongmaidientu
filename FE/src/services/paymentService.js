import api from './api';

// Create MoMo payment
export const createMomoPayment = async (orderId) => {
  const response = await api.post('/payment/momo/create', { orderId });
  return response.data;
};

// Query MoMo payment status (active verification)
export const queryMomoPaymentStatus = async (orderId) => {
  const response = await api.post('/payment/momo/query', { orderId });
  return response.data;
};

// Create VNPay payment
export const createVNPayPayment = async (orderId, bankCode = null) => {
  const response = await api.post('/payment/vnpay/create', { orderId, bankCode });
  return response.data;
};

// Query VNPay payment status (active verification)
export const queryVNPayPaymentStatus = async (orderId) => {
  const response = await api.post('/payment/vnpay/query', { orderId });
  return response.data;
};

// Simulate MoMo callback (SANDBOX ONLY)
export const simulateMomoCallback = async (callbackData) => {
  const response = await api.post('/payment/momo/simulate-callback', callbackData);
  return response.data;
};

// Simulate VNPay callback (SANDBOX ONLY)
export const simulateVnpayCallback = async (callbackData) => {
  const response = await api.post('/payment/vnpay/simulate-callback', callbackData);
  return response.data;
};

const paymentService = {
  createMomoPayment,
  queryMomoPaymentStatus,
  createVNPayPayment,
  queryVNPayPaymentStatus,
  simulateMomoCallback,
  simulateVnpayCallback,
};

export default paymentService;
