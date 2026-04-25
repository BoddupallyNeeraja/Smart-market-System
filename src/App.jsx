import { lazy, Suspense, useMemo, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import CartDrawer from './components/CartDrawer/CartDrawer';
import Loader from './components/Loader/Loader';
import ToastNotifier from './components/ToastNotifier/ToastNotifier';
import TopPromoStrip from './components/TopPromoStrip/TopPromoStrip';
import Footer from './components/Footer/Footer';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

const Home = lazy(() => import('./pages/Home/Home'));
const Products = lazy(() => import('./pages/Products/Products'));
const ProductDetails = lazy(() => import('./pages/ProductDetails/ProductDetails'));
const Cart = lazy(() => import('./pages/Cart/Cart'));
const Wishlist = lazy(() => import('./pages/Wishlist/Wishlist'));
const About = lazy(() => import('./pages/About/About'));
const Login = lazy(() => import('./pages/Login/Login'));
const Register = lazy(() => import('./pages/Register/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword/ForgotPassword'));
const MyAccount = lazy(() => import('./pages/MyAccount/MyAccount'));
const Admin = lazy(() => import('./pages/Admin/Admin'));

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
        <Suspense fallback={<Loader type="page" />}>
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
        </Suspense>
      </main>

      <Footer />
      <CartDrawer show={isCartDrawerOpen} onClose={appActions.closeCartDrawer} />
      <ToastNotifier />
    </div>
  );
}

export default App;
