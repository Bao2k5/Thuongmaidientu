import { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

function AdminHeroBanners() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: 'HOÀNG MY JEWELRY',
    subtitle: 'Trang sức kim cương cao cấp',
    description: 'Thiết kế tinh xảo - Đẳng cấp vượt thời gian',
    image: '',
    buttonText: 'Khám phá ngay',
    buttonLink: '/products',
    isActive: false,
    startDate: '',
    endDate: '',
    order: 0
  });

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BACKEND_URL}/api/hero-banners/admin`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      console.log('Banners response:', response.data);
      
      // Try different data structures
      const bannersData = response.data?.data || response.data || [];
      setBanners(Array.isArray(bannersData) ? bannersData : []);
    } catch (error) {
      console.error('Error fetching banners:', error.response?.data || error);
      // Silently handle errors - no alerts
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Vui lòng chọn file ảnh');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Kích thước ảnh tối đa 5MB');
      return;
    }

    setUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append('image', file);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${BACKEND_URL}/api/upload/image`, formDataUpload, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      setFormData(prev => ({ ...prev, image: response.data.url }));
    } catch (error) {
      console.error('Upload error:', error);
      // Silently handle upload errors
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      
      // Check token trước khi gửi
      if (!token) {
        console.error('No token found in localStorage');
        alert('Vui lòng đăng nhập lại');
        window.location.href = '/admin/login';
        return;
      }
      
      console.log('Token being sent:', token.substring(0, 20) + '...');
      const url = editingBanner
        ? `${BACKEND_URL}/api/hero-banners/${editingBanner._id}`
        : `${BACKEND_URL}/api/hero-banners`;

      const method = editingBanner ? 'put' : 'post';

      const dataToSend = {
        ...formData,
        title: formData.title || 'Hero Banner ' + new Date().toLocaleDateString('vi-VN'),
        image: formData.image || '' // Ensure image không undefined
      };

      console.log('Submitting banner data:', dataToSend); // Debug log

      await axios[method](url, dataToSend, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setShowForm(false);
      setEditingBanner(null);
      resetForm();
      fetchBanners();
      
      // Redirect về admin dashboard
      // window.location.href = '/admin'; // Comment để ở lại trang này tạo thêm banner
    } catch (error) {
      console.error('Error saving banner:', error);
      console.error('Error status:', error.response?.status);
      console.error('Error data:', error.response?.data);
      console.error('Token exists:', !!localStorage.getItem('token'));
      
      // Handle 401 Unauthorized
      if (error.response?.status === 401) {
        console.log('401 detected - token expired or invalid');
        alert('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại!');
        localStorage.removeItem('token');
        window.location.href = '/admin/login';
        return;
      }
      
      alert('Lỗi: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleEdit = (banner) => {
    setEditingBanner(banner);
    setFormData({
      title: banner.title || '',
      subtitle: banner.subtitle || '',
      description: banner.description || '',
      image: banner.image || '',
      buttonText: banner.buttonText || 'Khám phá ngay',
      buttonLink: banner.buttonLink || '/products',
      isActive: banner.isActive || false,
      startDate: banner.startDate ? banner.startDate.split('T')[0] : '',
      endDate: banner.endDate ? banner.endDate.split('T')[0] : '',
      order: banner.order || 0
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Bạn có chắc muốn xóa banner này?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${BACKEND_URL}/api/hero-banners/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchBanners();
    } catch (error) {
      console.error('Error deleting banner:', error);
      alert('Lỗi khi xóa banner');
    }
  };

  const toggleStatus = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`${BACKEND_URL}/api/hero-banners/${id}/toggle`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchBanners();
    } catch (error) {
      console.error('Error toggling status:', error);
      alert('Lỗi khi thay đổi trạng thái');
    }
  };

  const resetForm = () => {
    setFormData({
      title: 'HOÀNG MY JEWELRY',
      subtitle: 'Trang sức kim cương cao cấp',
      description: 'Thiết kế tinh xảo - Đẳng cấp vượt thời gian',
      image: '',
      buttonText: 'Khám phá ngay',
      buttonLink: '/products',
      isActive: false,
      startDate: '',
      endDate: '',
      order: 0
    });
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingBanner(null);
    resetForm();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6" style={{ pointerEvents: 'auto' }}>
        <h1 className="text-3xl font-bold">Quản lý Hero Banner</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer z-10 relative"
          style={{ pointerEvents: 'auto' }}
        >
          {showForm ? 'Đóng Form' : '+ Tạo Banner Mới'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-4">
              {editingBanner ? 'Chỉnh sửa Banner' : 'Upload Banner Mới'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Chọn ảnh Banner <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-4 py-3 border-2 border-dashed rounded-lg hover:border-blue-500 transition"
                  disabled={uploading}
                />
                {uploading && (
                  <p className="text-sm text-blue-600 mt-2 flex items-center gap-2">
                    <span className="animate-spin">⏳</span> Đang upload lên Cloudinary...
                  </p>
                )}
                {formData.image && (
                  <div className="mt-4">
                    <img 
                      src={formData.image} 
                      alt="Preview" 
                      className="w-full max-h-64 object-cover rounded-lg shadow-md" 
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Tiêu đề chính
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="HOÀNG MY JEWELRY"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Tiêu đề phụ
                </label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Trang sức kim cương cao cấp"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Mô tả
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                  placeholder="Thiết kế tinh xảo - Đẳng cấp vượt thời gian"
                />
              </div>

              <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-5 h-5 text-blue-600"
                />
                <label htmlFor="isActive" className="text-base font-medium cursor-pointer">
                  Hiển thị banner này trên trang chủ
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Text nút bấm
                </label>
                <input
                  type="text"
                  value={formData.buttonText}
                  onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Khám phá ngay"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Link nút bấm
                </label>
                <input
                  type="text"
                  value={formData.buttonLink}
                  onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="/products"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
                >
                  {editingBanner ? '💾 Lưu thay đổi' : '✨ Tạo Banner'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
                >
                  Hủy
                </button>
              </div>
            </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ảnh Banner</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {banners.length === 0 ? (
              <tr>
                <td colSpan="3" className="px-6 py-8 text-center text-gray-500">
                  Chưa có banner nào. Upload banner đầu tiên! 🎨
                </td>
              </tr>
            ) : (
              banners.map((banner) => (
                <tr key={banner._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <img
                      src={banner.image}
                      alt="Banner"
                      className="w-full max-w-md h-32 object-cover rounded-lg shadow"
                    />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => toggleStatus(banner._id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                        banner.isActive
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {banner.isActive ? '✅ Đang hiển thị' : '⏸️ Đã tắt'}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={() => handleEdit(banner)}
                        className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg font-medium"
                      >
                        📝 Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(banner._id)}
                        className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium"
                      >
                        🗑️ Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminHeroBanners;
