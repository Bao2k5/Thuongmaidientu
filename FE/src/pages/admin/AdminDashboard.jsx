import { useEffect, useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { api } from '../../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await api.get('/admin/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
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
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-display text-4xl text-luxury-black mb-2 tracking-wide">Dashboard</h1>
          <p className="text-luxury-gray">Tổng quan hệ thống BTHN Jewelry</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Revenue */}
          <div className="card-luxury p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-luxury-pearl rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-luxury-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-light text-luxury-black mb-1">
              {stats?.totalRevenue ? `${(stats.totalRevenue / 1000000).toFixed(1)}M` : '0'}đ
            </h3>
            <p className="text-sm text-luxury-gray uppercase tracking-widest">Doanh Thu</p>
          </div>

          {/* Total Orders */}
          <div className="card-luxury p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-luxury-pearl rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-luxury-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-light text-luxury-black mb-1">{stats?.totalOrders || 0}</h3>
            <p className="text-sm text-luxury-gray uppercase tracking-widest">Đơn Hàng</p>
          </div>

          {/* Total Products */}
          <div className="card-luxury p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-luxury-pearl rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-luxury-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-light text-luxury-black mb-1">{stats?.totalProducts || 0}</h3>
            <p className="text-sm text-luxury-gray uppercase tracking-widest">Sản Phẩm</p>
          </div>

          {/* Total Users */}
          <div className="card-luxury p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-luxury-pearl rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-luxury-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-light text-luxury-black mb-1">{stats?.totalUsers || 0}</h3>
            <p className="text-sm text-luxury-gray uppercase tracking-widest">Người Dùng</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <div className="card-luxury p-6">
            <h2 className="font-display text-2xl text-luxury-black mb-6 tracking-wide">Đơn Hàng Mới</h2>
            <div className="space-y-4">
              {stats?.recentOrders?.slice(0, 5).map((order) => (
                <div key={order._id} className="flex items-center justify-between py-3 border-b border-luxury-platinum last:border-0">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-luxury-black">#{order._id.slice(-6)}</p>
                    <p className="text-xs text-luxury-gray mt-1">{new Date(order.createdAt).toLocaleDateString('vi-VN')}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-luxury-black">{(order.total / 1000000).toFixed(1)}M đ</p>
                    <span className={`text-xs px-2 py-1 rounded ${
                      order.status === 'completed' ? 'bg-green-100 text-green-700' :
                      order.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="card-luxury p-6">
            <h2 className="font-display text-2xl text-luxury-black mb-6 tracking-wide">Thống Kê Nhanh</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-luxury-platinum">
                <span className="text-sm text-luxury-gray uppercase tracking-widest">Đơn Chờ Xử Lý</span>
                <span className="text-lg font-light text-luxury-black">{stats?.pendingOrders || 0}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-luxury-platinum">
                <span className="text-sm text-luxury-gray uppercase tracking-widest">Đơn Đang Giao</span>
                <span className="text-lg font-light text-luxury-black">{stats?.shippingOrders || 0}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-luxury-platinum">
                <span className="text-sm text-luxury-gray uppercase tracking-widest">Sản Phẩm Hết Hàng</span>
                <span className="text-lg font-light text-luxury-black">{stats?.outOfStock || 0}</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-sm text-luxury-gray uppercase tracking-widest">Đánh Giá Mới</span>
                <span className="text-lg font-light text-luxury-black">{stats?.newReviews || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
