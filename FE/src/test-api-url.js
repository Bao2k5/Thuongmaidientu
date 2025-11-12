
console.log('=== API Configuration Test ===');
console.log('VITE_API_URL from env:', import.meta.env.VITE_API_URL);
console.log('Expected:', 'http://localhost:3000/api');

import api from './services/api';
console.log('API baseURL:', api.defaults.baseURL);
console.log('Upload URL would be:', api.defaults.baseURL + '/upload/image');
console.log('Auth URL would be:', api.defaults.baseURL + '/auth/login');
