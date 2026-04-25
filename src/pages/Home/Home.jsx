import { Link } from 'react-router-dom';

const categories = [
  { name: 'Electronics', offers: '120+ products', growth: '+18%' },
  { name: 'Fashion', offers: '240+ styles', growth: '+12%' },
  { name: 'Home & Living', offers: '80+ collections', growth: '+22%' },
  { name: 'Accessories', offers: '150+ picks', growth: '+16%' },
];

const features = [
  'Secure guest and member shopping flow',
  'Fast delivery tracking and order updates',
  'Wishlist sync with cookie-based sessions',
  'Smart filtering and dynamic product discovery',
  'Admin dashboard for product and order operations',
  'Bulk quantity discounts for wholesale-friendly carts',
];

const testimonials = [
  { name: 'Arjun S.', text: 'The dashboard is fast and super easy to navigate.' },
  { name: 'Priya K.', text: 'Guest checkout and wishlist sync are very useful.' },
  { name: 'Rahul M.', text: 'Admin analytics gave us better sales visibility.' },
];

const Home = () => (
  <div className="d-grid gap-4">
    <section className="bg-white rounded-4 p-4 p-md-5 shadow-sm landing-hero">
      <div className="row align-items-center g-4">
        <div className="col-lg-7">
          <span className="badge text-bg-primary mb-3">New Season Offers Live</span>
          <h1 className="display-6 fw-bold mb-3">A smarter way to discover and shop daily deals</h1>
          <p className="lead text-muted mb-4">
            Explore curated collections, compare products instantly, and manage cart + wishlist in one modern marketplace dashboard.
          </p>
          <div className="d-flex flex-wrap gap-2">
            <Link to="/products" className="btn btn-primary btn-lg">Start shopping</Link>
            <Link to="/register" className="btn btn-outline-secondary btn-lg">Create account</Link>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="bg-light rounded-4 border p-4">
            <h5 className="mb-3">Live marketplace stats</h5>
            <div className="row g-3">
              <div className="col-6"><p className="small text-muted mb-1">Active users</p><h4 className="mb-0">32k+</h4></div>
              <div className="col-6"><p className="small text-muted mb-1">Products</p><h4 className="mb-0">5.2k</h4></div>
              <div className="col-6"><p className="small text-muted mb-1">Avg delivery</p><h4 className="mb-0">2.4 days</h4></div>
              <div className="col-6"><p className="small text-muted mb-1">Satisfaction</p><h4 className="mb-0">4.8/5</h4></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="bg-white rounded-4 p-4 shadow-sm">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
        <h2 className="h4 mb-0">Shop by categories</h2>
        <Link to="/products" className="small text-primary fw-semibold">View all products</Link>
      </div>
      <div className="row g-3">
        {categories.map((category) => (
          <div key={category.name} className="col-12 col-sm-6 col-lg-3">
            <div className="category-card border rounded-3 p-3 h-100">
              <h6 className="mb-1">{category.name}</h6>
              <p className="text-muted small mb-1">{category.offers}</p>
              <span className="badge text-bg-success">{category.growth} this week</span>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section className="bg-white rounded-4 p-4 shadow-sm">
      <h2 className="h4 mb-3">Why shoppers choose us</h2>
      <div className="row g-3">
        {features.map((item) => (
          <div key={item} className="col-md-6">
            <div className="d-flex gap-2 align-items-start"><span className="text-success fw-bold">?</span><p className="mb-0 text-muted">{item}</p></div>
          </div>
        ))}
      </div>
    </section>

    <section className="bg-white rounded-4 p-4 shadow-sm">
      <h2 className="h4 mb-3">Customer love</h2>
      <div className="row g-3">
        {testimonials.map((testimonial) => (
          <div key={testimonial.name} className="col-md-4">
            <div className="border rounded-3 p-3 h-100">
              <p className="text-muted mb-2">"{testimonial.text}"</p>
              <p className="mb-0 fw-semibold">- {testimonial.name}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section className="bg-primary text-white rounded-4 p-4 p-md-5 shadow-sm">
      <div className="row align-items-center g-3">
        <div className="col-md-8">
          <h3 className="mb-2">Ready to build your cart?</h3>
          <p className="mb-0 text-white-50">Join as a member for saved preferences or continue instantly as a guest.</p>
        </div>
        <div className="col-md-4 text-md-end">
          <Link to="/login" className="btn btn-light btn-lg">Login or Guest Access</Link>
        </div>
      </div>
    </section>
  </div>
);

export default Home;
