import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ForgotPassword = () => {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage('');
    setError('');

    try {
      forgotPassword(email);
      setMessage('If this email exists, a reset link has been sent.');
    } catch (requestError) {
      setError(requestError.message || 'Unable to process request.');
    }
  };

  return (
    <section className="auth-wrapper">
      <div className="auth-card card border-0 shadow-sm p-4 p-md-5 mx-auto">
        <h1 className="h4 mb-2">Forgot Password</h1>
        <p className="text-muted">This is a UI flow demo for password recovery.</p>
        {message ? <div className="alert alert-success py-2">{message}</div> : null}
        {error ? <div className="alert alert-danger py-2">{error}</div> : null}

        <form onSubmit={handleSubmit} className="d-grid gap-3">
          <input
            type="email"
            className="form-control"
            placeholder="Registered email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="btn btn-primary">Send reset link</button>
        </form>

        <p className="small mt-3 mb-0">
          Back to <Link to="/login">Login</Link>
        </p>
      </div>
    </section>
  );
};

export default ForgotPassword;
