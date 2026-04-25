import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const CartDrawer = ({ show, onClose }) => {
  const { items, cartTotal, removeFromCart } = useCart();

  return (
    <div className={`offcanvas offcanvas-end ${show ? 'show' : ''}`} tabIndex="-1" style={{ visibility: show ? 'visible' : 'hidden' }}>
      <div className="offcanvas-header border-bottom">
        <h5 className="offcanvas-title">Your Cart</h5>
        <button type="button" className="btn-close" onClick={onClose} aria-label="Close" />
      </div>
      <div className="offcanvas-body d-flex flex-column">
        {items.length === 0 ? (
          <p className="text-muted">Your cart is empty.</p>
        ) : (
          <ul className="list-group list-group-flush mb-3">
            {items.map((item) => (
              <li className="list-group-item d-flex justify-content-between align-items-start" key={item.id}>
                <div className="me-2">
                  <div className="fw-semibold small">{item.title}</div>
                  <small className="text-muted">Qty: {item.quantity}</small>
                </div>
                <div>
                  <span className="small me-2">${(item.price * item.quantity).toFixed(2)}</span>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => removeFromCart(item.id)}>
                    x
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto border-top pt-3">
          <p className="fw-semibold mb-2">Total: ${cartTotal.toFixed(2)}</p>
          <Link className="btn btn-primary w-100" to="/cart" onClick={onClose}>
            Go to Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
