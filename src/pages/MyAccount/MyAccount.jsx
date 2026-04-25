import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';

const MyAccount = () => {
  const { user } = useAuth();
  const { orders } = useOrders();

  const myOrders = orders.filter((order) => order.customerEmail === user?.email);

  return (
    <section>
      <Breadcrumbs items={[{ label: 'My Account' }]} />
      <div className="bg-white rounded-4 p-4 shadow-sm mb-4">
        <h1 className="h4 mb-3">My Account</h1>
        <p className="mb-1"><strong>Name:</strong> {user?.name}</p>
        <p className="mb-1"><strong>Email:</strong> {user?.email}</p>
        <p className="mb-0"><strong>Role:</strong> {user?.role}</p>
      </div>

      <div className="bg-white rounded-4 p-4 shadow-sm">
        <h2 className="h5 mb-3">Recent Orders</h2>
        {myOrders.length === 0 ? (
          <p className="text-muted mb-0">No orders placed yet.</p>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {myOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.itemCount}</td>
                    <td>${Number(order.total).toFixed(2)}</td>
                    <td><span className="badge text-bg-success">{order.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyAccount;
