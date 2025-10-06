import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isAdmin: false,

  // Initialize from localStorage
  initialize: () => {
    try {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      if (token && userStr) {
        const user = JSON.parse(userStr);
        set({
          user,
          isAuthenticated: true,
          isAdmin: user?.role === 'admin',
        });
      }
    } catch (error) {
      console.error('Error initializing auth store:', error);
    }
  },

  // Login
  login: async (email, password) => {
    try {
      // Sẽ tích hợp API sau
      const mockUser = { id: 1, email, name: 'User', role: 'user' };
      const mockToken = 'mock-token-123';
      
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      set({
        user: mockUser,
        isAuthenticated: true,
        isAdmin: false,
      });
      
      return { user: mockUser, token: mockToken };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Register
  register: async (userData) => {
    try {
      // Sẽ tích hợp API sau
      console.log('Register:', userData);
      return { success: true };
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  },

  // Logout
  logout: () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      set({
        user: null,
        isAuthenticated: false,
        isAdmin: false,
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  // Update user
  updateUser: (user) => {
    set({ user });
  },
}));

export { useAuthStore };
export default useAuthStore;
