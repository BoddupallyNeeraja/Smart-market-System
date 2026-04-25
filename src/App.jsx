import { useMemo, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import CartDrawer from './components/CartDrawer/CartDrawer';
import Loader from './components/Loader/Loader';
import ToastNotifier from './components/ToastNotifier/ToastNotifier';
import TopPromoStrip from './components/TopPromoStrip/TopPromoStrip';
import Footer from './components/Footer/Footer';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Cart from './pages/Cart/Cart';
import Wishlist from './pages/Wishlist/Wishlist';
import About from './pages/About/About';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import MyAccount from './pages/MyAccount/MyAccount';
import Admin from './pages/Admin/Admin';

function App() {
  const [isCartDrawerOpen, setCartDrawerOpen] = useState(false);

  const appActions = useMemo(
    () => ({
      openCartDrawer: () => setCartDrawerOpen(true),
      closeCartDrawer: () => setCartDrawerOpen(false),
    }),
    []
  );

  return (
    <div className="app-shell bg-light min-vh-100 d-flex flex-column">
      <TopPromoStrip />
      <Navbar onCartClick={appActions.openCartDrawer} />
      <main className="container py-4 flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products onCartClick={appActions.openCartDrawer} />} />
            <Route path="/product/:id" element={<ProductDetails onCartClick={appActions.openCartDrawer} />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
            <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
            <Route path="/my-account" element={<ProtectedRoute><MyAccount /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute adminOnly><Admin /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
      </main>

      <Footer />
      <CartDrawer show={isCartDrawerOpen} onClose={appActions.closeCartDrawer} />
      <ToastNotifier />
    </div>
  );
}

export default App;
