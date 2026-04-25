import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/products', label: 'Products' },
  { path: '/wishlist', label: 'Wishlist' },
  { path: '/about', label: 'About' },
];

const Navbar = ({ onCartClick }) => {
  const { cartCount } = useCart();
  const { items } = useWishlist();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold text-primary" to="/">
          Smart Marketplace
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {navItems.map((item) => (
              <li className="nav-item" key={item.path}>
                <NavLink to={item.path} className={({ isActive }) => `nav-link ${isActive ? 'active fw-semibold text-primary' : ''}`}>
                  {item.label}
                </NavLink>
              </li>
            ))}
            {isAdmin ? (
              <li className="nav-item">
                <NavLink to="/admin" className={({ isActive }) => `nav-link ${isActive ? 'active fw-semibold text-primary' : ''}`}>
                  Admin
                </NavLink>
              </li>
            ) : null}
          </ul>

          <div className="d-flex align-items-center flex-wrap gap-2">
            {!isAuthenticated ? (
              <>
                <Link className="btn btn-outline-secondary btn-sm" to="/login">Login</Link>
                <Link className="btn btn-primary btn-sm" to="/register">Register</Link>
              </>
            ) : (
              <>
                <Link className="btn btn-outline-secondary btn-sm" to="/my-account">My Account</Link>
                <span className="small text-muted me-1">Hi, <strong>{user.name}</strong>{user.mode === 'guest' ? ' (Guest)' : ''}</span>
                <button className="btn btn-outline-danger btn-sm" onClick={logout}>Logout</button>
              </>
            )}

            <Link className="btn btn-outline-dark position-relative" to="/wishlist">
              Wishlist
              {items.length > 0 && <span className="badge rounded-pill text-bg-danger ms-2">{items.length}</span>}
            </Link>
            <button className="btn btn-primary position-relative" onClick={onCartClick}>
              Cart
              {cartCount > 0 && <span className="badge rounded-pill text-bg-warning text-dark ms-2">{cartCount}</span>}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
