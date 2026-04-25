import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="footer border-top mt-5 bg-white">
    <div className="container py-4">
      <div className="row g-3">
        <div className="col-md-4">
          <h6 className="mb-2">Smart Marketplace</h6>
          <p className="small text-muted mb-0">Modern shopping dashboard with admin management.</p>
        </div>
        <div className="col-md-4">
          <h6 className="mb-2">Quick Links</h6>
          <div className="d-flex flex-column gap-1 small">
            <Link to="/products">Products</Link>
            <Link to="/about">About</Link>
            <Link to="/my-account">My Account</Link>
          </div>
        </div>
        <div className="col-md-4">
          <h6 className="mb-2">Policies</h6>
          <p className="small text-muted mb-0">Privacy Policy | Terms | Returns | Support</p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
