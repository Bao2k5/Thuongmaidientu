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

const paymentService = {
  createMomoPayment,
  queryMomoPaymentStatus,
  createVNPayPayment,
  queryVNPayPaymentStatus,
};

export default paymentService;
