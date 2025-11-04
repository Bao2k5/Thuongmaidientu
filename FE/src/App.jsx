import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import useAuthStore from './store/authStore';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ZaloChat from './components/common/ZaloChat';
import ScrollToTop from './components/common/ScrollToTop';
import HomeSimple from './pages/HomeSimple';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Collections from './pages/Collections';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Wishlist from './pages/Wishlist';
import OrderHistory from './pages/OrderHistory';
import OrderDetail from './pages/OrderDetail';
// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';

// Temporary placeholder component
const ComingSoon = ({ title }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-luxury-ivory via-luxury-cream to-luxury-sand">
    <div className="text-center max-w-lg p-8">
      <h1 className="text-6xl font-serif font-bold text-luxury-taupe mb-4">💎</h1>
      <h2 className="text-4xl font-serif font-bold text-luxury-charcoal mb-2">Jewelry Hoàng My</h2>
      <p className="text-xl text-gray-600 mb-8">{title}</p>
      <p className="text-luxury-brown font-medium">Đang xây dựng...</p>
    </div>
  </div>
);

function App() {
  const { initialize } = useAuthStore();

  // Initialize auth state from localStorage on app load
  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Routes>
        {/* Admin Routes - No Header/Footer */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/users" element={<AdminUsers />} />

        {/* Public Routes - With Header/Footer */}
        <Route path="/" element={
          <>
            <Header />
            <main className="flex-1 pt-24">
              <HomeSimple />
            </main>
            <Footer />
            <ZaloChat />
          </>
        } />
        <Route path="/products" element={
          <>
            <Header />
            <main className="flex-1 pt-24">
              <Products />
            </main>
            <Footer />
            <ZaloChat />
          </>
        } />
        <Route path="/products/:id" element={
          <>
            <Header />
            <main className="flex-1 pt-24">
              <ProductDetail />
            </main>
            <Footer />
            <ZaloChat />
          </>
        } />
        <Route path="/collections" element={
          <>
            <Header />
            <main className="flex-1 pt-24">
              <Collections />
            </main>
            <Footer />
            <ZaloChat />
          </>
        } />
        <Route path="/contact" element={
          <>
            <Header />
            <main className="flex-1 pt-24">
              <Contact />
            </main>
            <Footer />
            <ZaloChat />
          </>
        } />
        <Route path="/cart" element={
          <>
            <Header />
            <main className="flex-1 pt-24">
              <Cart />
            </main>
            <Footer />
            <ZaloChat />
          </>
        } />
        <Route path="/checkout" element={
          <>
            <Header />
            <main className="flex-1 pt-24">
              <Checkout />
            </main>
            <Footer />
            <ZaloChat />
          </>
        } />
        <Route path="/login" element={
          <>
            <Header />
            <main className="flex-1 pt-24">
              <Login />
            </main>
            <Footer />
            <ZaloChat />
          </>
        } />
        <Route path="/register" element={
          <>
            <Header />
            <main className="flex-1 pt-24">
              <Register />
            </main>
            <Footer />
            <ZaloChat />
          </>
        } />
        <Route path="/profile" element={
          <>
            <Header />
            <main className="flex-1 pt-24">
              <Profile />
            </main>
            <Footer />
            <ZaloChat />
          </>
        } />
        <Route path="/wishlist" element={
          <>
            <Header />
            <main className="flex-1 pt-24">
              <Wishlist />
            </main>
            <Footer />
            <ZaloChat />
          </>
        } />
        <Route path="/orders" element={
          <>
            <Header />
            <main className="flex-1 pt-24">
              <OrderHistory />
            </main>
            <Footer />
            <ZaloChat />
          </>
        } />
        <Route path="/orders/:id" element={
          <>
            <Header />
            <main className="flex-1 pt-24">
              <OrderDetail />
            </main>
            <Footer />
            <ZaloChat />
          </>
        } />
        <Route path="*" element={
          <>
            <Header />
            <main className="flex-1 pt-24">
              <ComingSoon title="404 - Không Tìm Thấy" />
            </main>
            <Footer />
            <ZaloChat />
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;

