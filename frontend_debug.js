
(function() {
  console.log('🔍 Debug script loaded');
  
  // Theo dõi tất cả console errors
  const originalError = console.error;
  console.error = function(...args) {
    originalError.apply(console, args);
    
    // Gửi lỗi đến server hoặc lưu vào localStorage
    const errorData = {
      timestamp: new Date().toISOString(),
      message: args.join(' '),
      stack: new Error().stack
    };
    
    // Lưu vào localStorage để debug
    const existingErrors = JSON.parse(localStorage.getItem('debugErrors') || '[]');
    existingErrors.push(errorData);
    localStorage.setItem('debugErrors', JSON.stringify(existingErrors));
    
    // Hiển thị alert cho lỗi wishlist
    if (args[0] && args[0].includes && args[0].includes('wishlist')) {
      alert('🚨 Wishlist Error: ' + args[0]);
    }
  };
  
  // Theo dõi tất cả network requests
  const originalFetch = window.fetch;
  window.fetch = function(...args) {
    const url = args[0];
    if (url && url.includes && url.includes('wishlist')) {
      console.log('📡 Wishlist Request:', args[0], args[1]);
    }
    return originalFetch.apply(this, args).then(response => {
      if (url && url.includes && url.includes('wishlist')) {
        console.log('📡 Wishlist Response:', response.status, response.statusText);
      }
      return response;
    }).catch(error => {
      if (url && url.includes && url.includes('wishlist')) {
        console.error('📡 Wishlist Error:', error);
      }
      throw error;
    });
  };
  
  // Theo dõi axios requests
  window.addEventListener('load', function() {
    if (window.axios) {
      window.axios.interceptors.request.use(function(config) {
        if (config.url && config.url.includes('wishlist')) {
          console.log('📡 Axios Wishlist Request:', config.method?.toUpperCase(), config.url, config.data);
        }
        return config;
      });
      
      window.axios.interceptors.response.use(function(response) {
        if (response.config.url && response.config.url.includes('wishlist')) {
          console.log('📡 Axios Wishlist Response:', response.status, response.data);
        }
        return response;
      }, function(error) {
        if (error.config && error.config.url && error.config.url.includes('wishlist')) {
          console.error('📡 Axios Wishlist Error:', error.response?.status, error.response?.data);
        }
        return Promise.reject(error);
      });
    }
  });
  
  // Tạo nút debug
  const debugBtn = document.createElement('button');
  debugBtn.innerHTML = '🔍 Debug Errors';
  debugBtn.style.cssText = 'position:fixed;top:10px;right:10px;z-index:9999;background:red;color:white;padding:5px;border-radius:5px';
  debugBtn.onclick = function() {
    const errors = JSON.parse(localStorage.getItem('debugErrors') || '[]');
    console.log('📊 All Errors:', errors);
    alert('Total errors: ' + errors.length + '\nCheck console for details');
  };
  document.body.appendChild(debugBtn);
})();
