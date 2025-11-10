import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/authSlice';
import { toast } from 'react-toastify';
import api from '../services/api';

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = searchParams.get('token');
    const error = searchParams.get('error');

    if (error) {
      toast.error('Đăng nhập OAuth thất bại!');
      navigate('/login');
      return;
    }

    if (token) {
      // Save token to localStorage
      localStorage.setItem('token', token);
      
      // Fetch user profile with the new token
      api.get('/user/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((response) => {
          dispatch(setCredentials({ user: response.data, token }));
          toast.success('Đăng nhập thành công!');
          navigate('/');
        })
        .catch(() => {
          toast.error('Không thể lấy thông tin người dùng!');
          navigate('/login');
        });
    } else {
      toast.error('Không tìm thấy token!');
      navigate('/login');
    }
  }, [searchParams, navigate, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-100">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pink-500 mb-4"></div>
        <h2 className="text-2xl font-bold text-gray-800">Đang xử lý đăng nhập...</h2>
        <p className="text-gray-600 mt-2">Vui lòng chờ một chút</p>
      </div>
    </div>
  );
};

export default AuthCallback;
