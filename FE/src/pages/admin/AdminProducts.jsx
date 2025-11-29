import { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { api } from '../../services/api';
import useAuthStore from '../../store/authStore';
import { useNavigate } from 'react-router-dom';

const AdminProducts = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user?.role === 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    priceSale: '',
    category: '',
    material: '',
    description: '',
    stock: '',
    images: [],
    specifications: {
      material: '',
      gemstone: '',
      weight: '',
      size: ''
    }
  });

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (showModal) {

      setTimeout(() => {
        const modalContent = document.querySelector('.max-h-\\[90vh\\]');
        if (modalContent) {
          modalContent.scrollTop = 0;
        }
      }, 100);
    }
  }, [showModal]);

  const loadProducts = async () => {
    try {

      const response = await api.get('/products?limit=1000');
      const productsData = response.data.products || response.data;

      setProducts(productsData.reverse());
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      let uploadedImages = [];
      if (selectedFiles.length > 0) {
        uploadedImages = await uploadImages();
      }

      const data = {
        name: formData.name,
        price: parseFloat(formData.price),
        priceSale: formData.priceSale ? parseFloat(formData.priceSale) : null,
        category: formData.category,
        material: formData.material,
        description: formData.description,
        stock: parseInt(formData.stock),
        specifications: formData.specifications,

        images: [...uploadedImages, ...formData.images]
      };

      if (editingProduct) {
        await api.put(`/products/${editingProduct._id}`, data);
      } else {
        await api.post('/products', data);
      }

      setShowModal(false);
      resetForm();
      loadProducts();
          </table >
        </div >
      </div >

  { showModal && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-luxury-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-luxury-platinum sticky top-0 bg-luxury-white">
          <h2 className="font-display text-2xl text-luxury-black tracking-wide">
            {editingProduct ? 'Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-luxury-darkGray mb-2 uppercase tracking-widest">
              Tên Sản Phẩm
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input-luxury w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-luxury-darkGray mb-2 uppercase tracking-widest">
                Giá
              </label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="input-luxury w-full"
                placeholder="15000000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-luxury-darkGray mb-2 uppercase tracking-widest">
                Giá Sale
              </label>
              <input
                type="number"
                value={formData.priceSale}
                onChange={(e) => setFormData({ ...formData, priceSale: e.target.value })}
                className="input-luxury w-full"
                placeholder="12000000"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-luxury-darkGray mb-2 uppercase tracking-widest">
                Danh Mục
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="input-luxury w-full"
              >
                <option value="">-- Chọn danh mục --</option>
                <option value="Nhẫn">Nhẫn</option>
                <option value="Dây Chuyền">Dây Chuyền</option>
                <option value="Bông Tai">Bông Tai</option>
                <option value="Vòng Tay">Vòng Tay</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-luxury-darkGray mb-2 uppercase tracking-widest">
                Số Lượng
              </label>
              <input
                type="number"
                required
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="input-luxury w-full"
                placeholder="10"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-luxury-darkGray mb-2 uppercase tracking-widest">
              Chất Liệu
            </label>
            <select
              required
              value={formData.material}
              onChange={(e) => setFormData({ ...formData, material: e.target.value })}
              className="input-luxury w-full"
            >
              <option value="Bạc 925">Bạc 925</option>
              <option value="Bạc Ý">Bạc Ý</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-luxury-darkGray mb-2 uppercase tracking-widest">
              Mô Tả
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input-luxury w-full"
              rows="3"
              placeholder="Mô tả chi tiết sản phẩm..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-luxury-darkGray mb-2 uppercase tracking-widest">
              Hình Ảnh Sản Phẩm
            </label>

            <div className="space-y-2">
              {editingProduct && formData.images.length > 0 && (
                <div>
                  <h4 className="text-sm text-luxury-gray mb-2">Ảnh hiện tại:</h4>
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    {formData.images.map((img, index) => {
                      const imgUrl = typeof img === 'string' ? img : img.url;
                      return (
                        <div key={index} className="relative group">
                          <img
                            src={imgUrl}
                            alt={`Current ${index + 1}`}
                            className="w-full h-20 object-cover rounded border border-luxury-platinum"
                          />
                          <div className="absolute -top-2 -right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              type="button"
                              title="Đặt làm ảnh chính"
                              onClick={() => {
                                const selected = formData.images[index];
                                const rest = formData.images.filter((_, i) => i !== index);
                                setFormData({ ...formData, images: [selected, ...rest] });
                              }}
                              className="bg-luxury-ivory text-luxury-charcoal rounded-full w-6 h-6 flex items-center justify-center text-xs border"
                            >
                              ↑
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const newImages = formData.images.filter((_, i) => i !== index);
                                setFormData({ ...formData, images: newImages });
                              }}
                              className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                className="input-luxury w-full"
              />

              {imagePreviews.length > 0 && (
                <div>
                    ))}
                </div>
                </div>
              )}

            {uploadingImages && (
              <div className="text-sm text-luxury-brown">
                Đang upload ảnh...
              </div>
            )}
          </div>
      </div>

      <div className="border-t border-luxury-platinum pt-4 mt-4">
        <h3 className="text-sm font-medium text-luxury-darkGray mb-3 uppercase tracking-widest">
          Thông Số Kỹ Thuật
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-luxury-gray mb-1">Đá quý</label>
            <input
              type="text"
              value={formData.specifications.gemstone}
              onChange={(e) => setFormData({
                ...formData,
                specifications: { ...formData.specifications, gemstone: e.target.value }
              })}
              className="input-luxury w-full"
              placeholder="Kim cương tự nhiên"
            />
          </div>
          <div>
            <label className="block text-xs text-luxury-gray mb-1">Trọng lượng</label>
            <input
              type="text"
              value={formData.specifications.weight}
              onChange={(e) => setFormData({
                ...formData,
                specifications: { ...formData.specifications, weight: e.target.value }
              })}
              className="input-luxury w-full"
              placeholder="3.5g"
            />
          </div>
          <div>
            <label className="block text-xs text-luxury-gray mb-1">Size</label>
            <input
              type="text"
              value={formData.specifications.size}
              onChange={(e) => setFormData({
                ...formData,
                specifications: { ...formData.specifications, size: e.target.value }
              })}
              className="input-luxury w-full"
              placeholder="5-7"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-luxury-platinum">
        <button type="submit" className="btn-luxury px-6 py-3 flex-1">
          {editingProduct ? 'Cập Nhật' : 'Thêm Sản Phẩm'}
        </button>
        <button
          type="button"
          onClick={() => {
            setShowModal(false);
            resetForm();
          }}
          className="px-6 py-3 border border-luxury-platinum text-luxury-darkGray hover:bg-luxury-pearl transition-colors flex-1"
        >
          Hủy
        </button>
      </div>
    </form>
      </div >
    </div >
  )}
    </AdminLayout >
  );
};

export default AdminProducts;
