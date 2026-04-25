import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    try {
      register(form);
      navigate('/products', { replace: true });
    } catch (authError) {
      setError(authError.message || 'Unable to create account right now.');
    }
  };

  return (
    <section className="auth-wrapper">
      <div className="auth-card card border-0 shadow-sm p-4 p-md-5 mx-auto">
        <h1 className="h3 mb-2">Create account</h1>
        <p className="text-muted mb-4">Join Smart Marketplace and personalize your shopping.</p>

        {error ? <div className="alert alert-danger py-2">{error}</div> : null}

        <form onSubmit={handleSubmit} className="d-grid gap-3">
          <input
            type="text"
            className="form-control"
            placeholder="Full name"
            required
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          />
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            required
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
          />
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            required
            minLength={6}
            value={form.password}
            onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
          />
          <button type="submit" className="btn btn-primary btn-lg">
            Register
          </button>
        </form>

        <p className="small text-muted mt-4 mb-0">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
