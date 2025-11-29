import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import useAuthStore from './store/authStore';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ZaloChat from './components/common/ZaloChat';
import ScrollToTop from './components/common/ScrollToTop';
import HomeSimple from './pages/HomeSimple';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Collections from './pages/Collections';
import CollectionProducts from './pages/CollectionProducts';
import About from './pages/About';

import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminCollections from './pages/admin/AdminCollections';
import AdminHeroBanners from './pages/admin/AdminHeroBanners';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';

const ComingSoon = ({ title }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-luxury-ivory via-luxury-cream to-luxury-sand">
    <div className="text-center max-w-lg p-8">
      <h1 className="text-6xl font-serif font-bold text-luxury-taupe mb-4">💎</h1>
      <h2 className="text-4xl font-serif font-bold text-luxury-charcoal mb-2">HM Jewelry</h2>
      <p className="text-xl text-gray-600 mb-8">{title}</p>
      <p className="text-luxury-brown font-medium">Đang xây dựng...</p>
    </div>
  </div>
);

function App() {
  const { initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <Footer />
      <ZaloChat />
    </>
        } />
  < Route path = "/products" element = {
          <>
            <Header />
            <main className="flex-1 pt-32">
              <Products />
            </main>
            <Footer />
            <ZaloChat />
          </>
        } />
  < Route path = "/products/:id" element = {
          <>
            <Header />
            <main className="flex-1 pt-32">
              <ProductDetail />
            </main>
            <Footer />
            <ZaloChat />
          </>
        } />
  < Route path = "/collections" element = {
          <>
            <Header />
            <main className="flex-1 pt-32">
              <Collections />
            </main>
            <Footer />
            <ZaloChat />
          </>
        } />
  < Route path = "/collections/:slug" element = {
          <>
            <Header />
            <main className="flex-1 pt-32">
              <CollectionProducts />
            </main>
            <Footer />
            <ZaloChat />
          </>
        } />
  < Route path = "/about" element = {
          <>
            <Header />
            <main className="flex-1 pt-32">
              <About />
            </main>
            <Footer />
            <ZaloChat />
          </>
        } />
  < Route path = "/contact" element = {
          <>
            <Header />
            <main className="flex-1 pt-32">
              <Contact />
            </main>
            <Footer />
            <ZaloChat />
          </>
        } />
  < Route path = "/cart" element = {
          <>
            <Header />
            <main className="flex-1 pt-32">
              <Cart />
            </main>
            <Footer />
            <ZaloChat />
          </>
        } />
  < Route path = "/checkout" element = {
          <>
            <Header />
            <main className="flex-1 pt-32">
              <Checkout />
            </main>
            <Footer />
            <ZaloChat />
          </>
        } />
  < Route path = "/payment/success" element = {
          <>
            <Header />
            <main className="flex-1 pt-32">
              <PaymentSuccess />
            </main>
            <Footer />
            <ZaloChat />
          </>
        } />
  < Route path = "/payment/cancel" element = {
          <>
            <Header />
            <main className="flex-1 pt-32">
              <PaymentCancel />
            </main>
            <Footer />
            <ZaloChat />
          </>
        } />
  < Route path = "/payment/momo/simulator" element = {
          <>
            <Header />
            <main className="flex-1 pt-32">
              <MomoSimulator />
            </main>
            <Footer />
            <ZaloChat />
          </>
        } />
  < Route path = "/payment/vnpay/simulator" element = {
          <>
            <Header />
            <main className="flex-1 pt-32">
              <VnpaySimulator />
            </main>
            <Footer />
            <ZaloChat />
          </>
        } />
  < Route path = "/login" element = {
          <>
            <Header />
            <main className="flex-1 pt-32">
              <Login />
            </main>
            <Footer />
            <ZaloChat />
          </>
        } />
  < Route path = "/register" element = {
          <>
            <Header />
            <main className="flex-1 pt-32">
              <Register />
            </main>
            <Footer />
            <ZaloChat />
          </>
        } />
  < Route path = "/forgot-password" element = {
          <>
            <Header />
            <main className="flex-1 pt-32">
              <ForgotPassword />
            </main>
            <Footer />
            <ZaloChat />
          </>
        } />
  < Route path = "/reset-password" element = {
          <>
            <Header />
            <main className="flex-1 pt-32">
              <ResetPassword />
            </main>
            <Footer />
            <ZaloChat />
          </>
        } />
  < Route path = "/auth/callback" element = {< AuthCallback />} />
    < Route path = "/profile" element = {
          <>
            <Header />
            <main className="flex-1 pt-32">
              <Profile />
            </main>
            <Footer />
            <ZaloChat />
          </>
        } />
  < Route path = "/wishlist" element = {
          <>
            <Header />
            <main className="flex-1 pt-32">
              <Wishlist />
            </main>
            <Footer />
            <ZaloChat />
          </>
        } />
  < Route path = "/address" element = {
          <>
            <Header />
            <main className="flex-1 pt-32">
              <Address />
            </main>
            <Footer />
            <ZaloChat />
          </>
        } />
  < Route path = "/account" element = {
          <>
            <Header />
            <main className="flex-1 pt-32">
              <AccountLayout />
            </main>
            <Footer />
            <ZaloChat />
          </>
        }>
          <Route index element={<AccountInfo />} />
          <Route path="orders" element={<AccountOrders />} />
          <Route path="orders/:id" element={<OrderDetail />} />
          <Route path="addresses" element={<Address />} />
          <Route path="settings" element={<AccountSettings />} />
        </Route >
        <Route path="/orders" element={
          <>
            <Header />
            <main className="flex-1 pt-32">
              <OrderHistory />
            </main>
            <Footer />
            <ZaloChat />
          </>
        } />
        <Route path="*" element={
          <>
            <Header />
            <main className="flex-1 pt-32">
              <ComingSoon title="404 - Không Tìm Thấy" />
            </main>
            <Footer />
            <ZaloChat />
          </>
        } />
      </Routes >
    </div >
  );
}

export default App;

