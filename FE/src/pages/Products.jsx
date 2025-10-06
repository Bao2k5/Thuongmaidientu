import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/common/ProductCard';
import { mockProducts, categories, materials } from '../utils/mockData';

const Products = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState([0, 50000000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showQuickView, setShowQuickView] = useState(null);

  const toggleCategory = (cat) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  // Filter products
  let filteredProducts = mockProducts.filter(p => {
    const price = p.priceSale || p.price;
    if (selectedCategories.length > 0 && !selectedCategories.includes(p.category)) return false;
    if (price < priceRange[0] || price > priceRange[1]) return false;
    return true;
  });

  // Sort products
  if (sortBy === 'price-asc') filteredProducts.sort((a, b) => (a.priceSale || a.price) - (b.priceSale || b.price));
  if (sortBy === 'price-desc') filteredProducts.sort((a, b) => (b.priceSale || b.price) - (a.priceSale || a.price));
  if (sortBy === 'name') filteredProducts.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-gradient-to-b from-sky-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-light mb-4 text-sky-900 tracking-wide text-center">SẢN PHẨM</h1>
          <div className="w-20 h-1 bg-sky-500 mx-auto mb-6"></div>
          <p className="text-sky-700 text-lg font-light text-center">Khám phá bộ sưu tập trang sức cao cấp</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              {/* Categories */}
              <div className="border border-sky-100 p-6">
                <h3 className="text-lg font-light text-sky-900 mb-4 tracking-wide">DANH MỤC</h3>
                <div className="space-y-3">
                  {categories.map(cat => (
                    <label key={cat} className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => toggleCategory(cat)}
                        className="w-4 h-4 text-sky-600 border-sky-300 focus:ring-sky-500"
                      />
                      <span className="ml-3 text-sky-700 font-light group-hover:text-sky-900">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="border border-sky-100 p-6">
                <h3 className="text-lg font-light text-sky-900 mb-4 tracking-wide">GIÁ</h3>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="50000000"
                    step="1000000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full h-2 bg-sky-100 rounded-lg appearance-none cursor-pointer accent-sky-600"
                  />
                  <div className="flex justify-between text-sm text-sky-700 font-light">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>
              </div>

              {/* Materials */}
              <div className="border border-sky-100 p-6">
                <h3 className="text-lg font-light text-sky-900 mb-4 tracking-wide">CHẤT LIỆU</h3>
                <div className="space-y-3">
                  {materials.map(mat => (
                    <label key={mat} className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-sky-600 border-sky-300 focus:ring-sky-500"
                      />
                      <span className="ml-3 text-sky-700 font-light group-hover:text-sky-900">{mat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Reset Filters */}
              <button
                onClick={() => {
                  setSelectedCategories([]);
                  setPriceRange([0, 50000000]);
                }}
                className="w-full border-2 border-sky-900 text-sky-900 py-3 text-sm font-light tracking-wider hover:bg-sky-900 hover:text-white transition-all duration-300"
              >
                XÓA BỘ LỌC
              </button>
            </div>
          </aside>

          {/* Products Area */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-sky-100">
              <div className="text-sky-700 font-light">
                Hiển thị {filteredProducts.length} sản phẩm
              </div>

              <div className="flex items-center gap-6">
                {/* Sort */}
                <div className="flex items-center gap-3">
                  <label className="text-sm text-sky-700 font-light">Sắp xếp:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-sky-200 px-4 py-2 text-sm text-sky-900 font-light focus:outline-none focus:border-sky-500"
                  >
                    <option value="newest">Mới nhất</option>
                    <option value="price-asc">Giá tăng dần</option>
                    <option value="price-desc">Giá giảm dần</option>
                    <option value="name">Tên A-Z</option>
                  </select>
                </div>

                {/* View Toggle */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 border ${viewMode === 'grid' ? 'bg-sky-900 text-white' : 'border-sky-200 text-sky-700'}`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 border ${viewMode === 'list' ? 'bg-sky-900 text-white' : 'border-sky-200 text-sky-700'}`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" 
              : "space-y-6"}>
              {filteredProducts.map((product) => (
                viewMode === 'grid' ? (
                  <ProductCard key={product.id} product={product} onQuickView={setShowQuickView} />
                ) : (
                  // List View
                  <div key={product.id} className="group bg-white hover:shadow-xl transition-all duration-500 border border-gray-200 flex gap-6">
                    <div className="w-64 h-64 flex-shrink-0 relative overflow-hidden bg-gray-50">
                      <img 
                        src={product.images?.[0]} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div>
                        <Link to={`/products/${product.id}`}>
                          <h3 className="text-2xl font-light text-sky-900 mb-3 group-hover:text-sky-600 transition">
                            {product.name}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-1 mb-3">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`w-4 h-4 ${i < product.rating ? 'text-sky-500' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="text-sm text-sky-600 ml-2">({product.reviews} đánh giá)</span>
                        </div>
                        <p className="text-sky-700 font-light mb-3">
                          <span className="text-sm">Chất liệu:</span> {product.material}
                        </p>
                        <p className="text-sky-700 font-light mb-3">
                          <span className="text-sm">Danh mục:</span> {product.category}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          {product.priceSale && product.priceSale < product.price && (
                            <span className="text-sky-400 line-through text-sm block mb-1">{formatPrice(product.price)}</span>
                          )}
                          <p className="text-sky-900 font-light text-2xl">{formatPrice(product.priceSale || product.price)}</p>
                        </div>
                        <Link
                          to={`/products/${product.id}`}
                          className="border-2 border-sky-900 text-sky-900 px-8 py-3 text-xs font-light tracking-wider hover:bg-sky-900 hover:text-white transition-all duration-300"
                        >
                          XEM CHI TIẾT
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center gap-2">
              {[1, 2, 3].map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 border ${
                    currentPage === page 
                      ? 'bg-sky-900 text-white border-sky-900' 
                      : 'border-sky-200 text-sky-700 hover:border-sky-900'
                  } font-light transition-all`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {showQuickView && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowQuickView(null)}>
          <div className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="relative">
              <button
                onClick={() => setShowQuickView(null)}
                className="absolute top-4 right-4 bg-white text-sky-900 p-2 hover:bg-sky-900 hover:text-white transition z-10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="aspect-square bg-gray-50">
                  <img src={showQuickView.img} alt={showQuickView.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-8">
                  <h2 className="text-3xl font-light text-sky-900 mb-4">{showQuickView.name}</h2>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-5 h-5 ${i < showQuickView.rating ? 'text-sky-500' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-sm text-sky-600 ml-2">({showQuickView.reviews} đánh giá)</span>
                  </div>
                  <p className="text-3xl font-light text-sky-900 mb-6">{formatPrice(showQuickView.price)}</p>
                  <p className="text-sky-700 font-light mb-4">Chất liệu: {showQuickView.material}</p>
                  <p className="text-sky-700 font-light mb-6">Danh mục: {showQuickView.category}</p>
                  <div className="space-y-4">
                    <Link
                      to={`/products/${showQuickView.id}`}
                      className="block w-full bg-sky-900 text-white py-4 text-center text-sm font-light tracking-wider hover:bg-sky-800 transition-all duration-300"
                    >
                      XEM CHI TIẾT
                    </Link>
                    <button className="w-full border-2 border-sky-900 text-sky-900 py-4 text-sm font-light tracking-wider hover:bg-sky-900 hover:text-white transition-all duration-300">
                      THÊM VÀO GIỎ HÀNG
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
