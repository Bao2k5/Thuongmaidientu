import api from './api';
import { storage } from '../utils/helpers';

// Register
export const register = async (userData) => {
  const response = await api.post('/api/auth/register', userData);
  return response.data;
};

// Login
export const login = async (credentials) => {
  const response = await api.post('/api/auth/login', credentials);
  if (response.data.token) {
    storage.set('token', response.data.token);
    storage.set('user', response.data.user);
  }
  return response.data;
};

// Logout
export const logout = () => {
  storage.remove('token');
  storage.remove('user');
};

// Forgot Password
export const forgotPassword = async (email) => {
  const response = await api.post('/api/auth/forgot-password', { email });
  return response.data;
};

// Get current user
export const getCurrentUser = () => {
  return storage.get('user');
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!storage.get('token');
};

// Check if user is admin
export const isAdmin = () => {
  const user = storage.get('user');
  return user?.role === 'admin';
};

const authService = {
  register,
  login,
  logout,
  forgotPassword,
  getCurrentUser,
  isAuthenticated,
  isAdmin,
};

export default authService;
