import { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { api } from '../../services/api';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    priceSale: '',
    category: 'Nhẫn',
    material: 'Vàng 18K',
    description: '',
    stock: '',
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

  const loadProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data.products || response.data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        price: parseFloat(formData.price),
        priceSale: formData.priceSale ? parseFloat(formData.priceSale) : null,
        stock: parseInt(formData.stock)
      };

      if (editingProduct) {
        await api.put(`/products/${editingProduct._id}`, data);
      } else {
        await api.post('/products', data);
      }
      
      setShowModal(false);
      resetForm();
      loadProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Lỗi khi lưu sản phẩm: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Bạn có chắc muốn xóa sản phẩm này?')) return;
    try {
      await api.delete(`/products/${id}`);
      loadProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      priceSale: product.priceSale || '',
      category: product.category,
      material: product.material,
      description: product.description,
      stock: product.stock,
      specifications: product.specifications || {
        material: '',
        gemstone: '',
        weight: '',
        size: ''
      }
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      price: '',
      priceSale: '',
      category: 'Nhẫn',
      material: 'Vàng 18K',
      description: '',
      stock: '',
      specifications: {
        material: '',
        gemstone: '',
        weight: '',
        size: ''
      }
    });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-luxury-black"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-4xl text-luxury-black mb-2 tracking-wide">Quản Lý Sản Phẩm</h1>
            <p className="text-luxury-gray">Thêm, sửa, xóa sản phẩm trang sức</p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="btn-luxury px-6 py-3"
          >
            + Thêm Sản Phẩm
          </button>
        </div>

        {/* Products Table */}
        <div className="card-luxury overflow-hidden">
          <table className="w-full">
            <thead className="bg-luxury-pearl border-b border-luxury-platinum">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-luxury-darkGray uppercase tracking-widest">Sản Phẩm</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-luxury-darkGray uppercase tracking-widest">Danh Mục</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-luxury-darkGray uppercase tracking-widest">Giá</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-luxury-darkGray uppercase tracking-widest">Kho</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-luxury-darkGray uppercase tracking-widest">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="bg-luxury-white divide-y divide-luxury-platinum">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-luxury-pearl transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {product.images?.[0] && (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded border border-luxury-platinum"
                        />
                      )}
                      <span className="text-sm font-medium text-luxury-black">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-luxury-gray">{product.category}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-luxury-black">
                      {(product.price / 1000000).toFixed(1)}M đ
                      {product.priceSale && (
                        <div className="text-xs text-green-600">Sale: {(product.priceSale / 1000000).toFixed(1)}M đ</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm ${product.stock > 5 ? 'text-green-600' : 'text-red-600'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      {showModal && (
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
                  Tên Sản Phẩm *
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
                    Giá *
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
                    Danh Mục *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="input-luxury w-full"
                  >
                    <option value="Nhẫn">Nhẫn</option>
                    <option value="Dây Chuyền">Dây Chuyền</option>
                    <option value="Bông Tai">Bông Tai</option>
                    <option value="Vòng Tay">Vòng Tay</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-luxury-darkGray mb-2 uppercase tracking-widest">
                    Số Lượng *
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
                  Chất Liệu *
                </label>
                <select
                  required
                  value={formData.material}
                  onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                  className="input-luxury w-full"
                >
                  <option value="Vàng 18K">Vàng 18K</option>
                  <option value="Vàng trắng 18K">Vàng trắng 18K</option>
                  <option value="Bạch kim">Bạch kim</option>
                  <option value="Bạch kim 950">Bạch kim 950</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-luxury-darkGray mb-2 uppercase tracking-widest">
                  Mô Tả *
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
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminProducts;
