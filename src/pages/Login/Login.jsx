import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, continueAsGuest } = useAuth();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const from = location.state?.from?.pathname || '/products';

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    try {
      login(form);
      navigate(from, { replace: true });
    } catch (authError) {
      setError(authError.message || 'Unable to login right now.');
    }
  };

  return (
    <section className="auth-wrapper">
      <div className="auth-card card border-0 shadow-sm p-4 p-md-5 mx-auto">
        <h1 className="h3 mb-2">Welcome back</h1>
        <p className="text-muted mb-4">
          Login to manage your orders, cart, and wishlist.
        </p>

        <div className="alert alert-secondary py-2 small">
          Admin demo: <strong>admin@smartmarketplace.com</strong> / <strong>admin123</strong>
        </div>

        {error ? <div className="alert alert-danger py-2">{error}</div> : null}

        {/* LOGIN FORM */}
        <form onSubmit={handleSubmit} className="d-grid gap-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            required
            value={form.email}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, email: e.target.value }))
            }
          />

          <input
            type="password"
            className="form-control"
            placeholder="Password"
            required
            minLength={6}
            value={form.password}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, password: e.target.value }))
            }
          />

          <button type="submit" className="btn btn-primary btn-lg">
            Login
          </button>
        </form>

        {/* CONTINUE AS GUEST */}
        <button
          type="button"
          className="btn btn-outline-secondary mt-3"
          onClick={() => {
            continueAsGuest();
            navigate('/products', { replace: true });
          }}
        >
          Continue as Guest
        </button>

        {/* LINKS */}
        <div className="d-flex justify-content-between small text-muted mt-4">
          <Link to="/forgot-password">Forgot password?</Link>
          <span>
            New here? <Link to="/register">Create account</Link>
          </span>
        </div>
      </div>
    </section>
  );
};

export default Login;