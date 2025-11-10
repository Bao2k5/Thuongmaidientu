// src/services/addressService.js
import api from './api';

// Lấy danh sách địa chỉ của user
export const getAddresses = async () => {
  const response = await api.get('/address');
  return response.data;
};

// Tạo địa chỉ mới
export const createAddress = async (addressData) => {
  const response = await api.post('/address', addressData);
  return response.data;
};

// Cập nhật địa chỉ
export const updateAddress = async (id, addressData) => {
  const response = await api.put(`/address/${id}`, addressData);
  return response.data;
};

// Xóa địa chỉ
export const deleteAddress = async (id) => {
  const response = await api.delete(`/address/${id}`);
  return response.data;
};

// Đặt địa chỉ làm mặc định
export const setDefaultAddress = async (id) => {
  const response = await api.put(`/address/${id}/set-default`);
  return response.data;
};

export default {
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress
};
