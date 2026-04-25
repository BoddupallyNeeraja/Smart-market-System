import { Link } from 'react-router-dom';
import EmptyState from '../../components/EmptyState/EmptyState';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { useCart } from '../../context/CartContext';
import { useOrders } from '../../context/OrderContext';
import { useAuth } from '../../context/AuthContext';

const Cart = () => {
  const { items, increaseQty, decreaseQty, removeFromCart, subtotal, discountTotal, cartTotal, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const { user } = useAuth();

  if (items.length === 0) {
    return (
      <EmptyState
        title="Your cart is empty"
        message="Add products to begin your checkout flow."
        action={
          <Link className="btn btn-primary" to="/products">
            Continue shopping
          </Link>
        }
      />
    );
  }

  const shipping = cartTotal > 200 ? 0 : 15;
  const total = cartTotal + shipping;

  const handleCheckout = () => {
    placeOrder({ items, total, customerEmail: user?.email || 'guest@marketplace.local' });
    clearCart();
  };

  return (
    <section>
      <Breadcrumbs items={[{ label: 'Cart' }]} />
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h4 mb-0">Shopping Cart</h2>
        <button className="btn btn-outline-danger" onClick={clearCart}>
          Clear cart
        </button>
      </div>

      <div className="alert alert-info py-2 small">Bulk discount: 5+ qty gives 10% off, 10+ qty gives 15% off per item.</div>

      <div className="table-responsive bg-white rounded-3 shadow-sm">
        <table className="table align-middle mb-0">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                  <div className="btn-group btn-group-sm">
                    <button className="btn btn-outline-secondary" onClick={() => decreaseQty(item.id)}>-</button>
                    <button className="btn btn-light" disabled>{item.quantity}</button>
                    <button className="btn btn-outline-secondary" onClick={() => increaseQty(item.id)}>+</button>
                  </div>
                </td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => removeFromCart(item.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card border-0 shadow-sm mt-4 ms-auto" style={{ maxWidth: '380px' }}>
        <div className="card-body">
          <div className="d-flex justify-content-between"><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div>
          <div className="d-flex justify-content-between my-2"><span>Bulk Discount</span><strong className="text-success">-${discountTotal.toFixed(2)}</strong></div>
          <div className="d-flex justify-content-between"><span>Discounted Subtotal</span><strong>${cartTotal.toFixed(2)}</strong></div>
          <div className="d-flex justify-content-between my-2"><span>Shipping</span><strong>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</strong></div>
          <hr />
          <div className="d-flex justify-content-between mb-3"><span>Total</span><strong className="text-primary">${total.toFixed(2)}</strong></div>
          <button className="btn btn-primary w-100" onClick={handleCheckout}>Proceed to checkout</button>
        </div>
      </div>
    </section>
  );
};

export default Cart;
