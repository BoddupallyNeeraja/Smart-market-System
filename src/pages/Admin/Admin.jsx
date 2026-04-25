import { useMemo, useState } from 'react';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { useProducts } from '../../context/ProductContext';
import { useOrders } from '../../context/OrderContext';
import { useAuth } from '../../context/AuthContext';

const initialForm = {
  title: '',
  description: '',
  price: '',
  category: '',
  image: '',
  stock: '',
  rating: 4,
};

const Admin = () => {
  const { customProducts, addProduct, updateProduct, deleteProduct } = useProducts();
  const { orders, stats } = useOrders();
  const { users } = useAuth();

  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  const topProducts = useMemo(() => {
    const soldMap = {};
    orders.forEach((order) => {
      order.items.forEach((item) => {
        soldMap[item.title] = (soldMap[item.title] || 0) + item.quantity;
      });
    });
    return Object.entries(soldMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [orders]);

  const onSubmit = (event) => {
    event.preventDefault();
    if (editingId) {
      updateProduct(editingId, form);
      setEditingId(null);
    } else {
      addProduct(form);
    }
    setForm(initialForm);
  };

  return (
    <section>
      <Breadcrumbs items={[{ label: 'Admin Dashboard' }]} />
      <div className="row g-4 mb-4">
        <div className="col-md-3"><div className="card p-3 border-0 shadow-sm"><p className="small text-muted mb-1">Total Orders</p><h4>{stats.ordersCount}</h4></div></div>
        <div className="col-md-3"><div className="card p-3 border-0 shadow-sm"><p className="small text-muted mb-1">Total Revenue</p><h4>${stats.totalRevenue.toFixed(2)}</h4></div></div>
        <div className="col-md-3"><div className="card p-3 border-0 shadow-sm"><p className="small text-muted mb-1">Units Sold</p><h4>{stats.totalItems}</h4></div></div>
        <div className="col-md-3"><div className="card p-3 border-0 shadow-sm"><p className="small text-muted mb-1">Registered Users</p><h4>{users.length}</h4></div></div>
      </div>

      <div className="row g-4">
        <div className="col-lg-5">
          <div className="bg-white rounded-4 p-4 shadow-sm">
            <h2 className="h5 mb-3">{editingId ? 'Edit Product' : 'Add Product'}</h2>
            <form className="d-grid gap-2" onSubmit={onSubmit}>
              <input className="form-control" placeholder="Title" required value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} />
              <textarea className="form-control" placeholder="Description" required value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} />
              <input className="form-control" placeholder="Category" required value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))} />
              <input className="form-control" placeholder="Image URL" required value={form.image} onChange={(e) => setForm((p) => ({ ...p, image: e.target.value }))} />
              <input className="form-control" type="number" step="0.01" placeholder="Price" required value={form.price} onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))} />
              <input className="form-control" type="number" placeholder="Stock" required value={form.stock} onChange={(e) => setForm((p) => ({ ...p, stock: e.target.value }))} />
              <button className="btn btn-primary">{editingId ? 'Update Product' : 'Add Product'}</button>
            </form>
          </div>
        </div>

        <div className="col-lg-7">
          <div className="bg-white rounded-4 p-4 shadow-sm mb-4">
            <h2 className="h5 mb-3">Custom Products</h2>
            {customProducts.length === 0 ? <p className="text-muted mb-0">No custom products yet.</p> : (
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead><tr><th>Title</th><th>Price</th><th>Stock</th><th /></tr></thead>
                  <tbody>
                    {customProducts.map((product) => (
                      <tr key={product.id}>
                        <td>{product.title}</td>
                        <td>${Number(product.price).toFixed(2)}</td>
                        <td>{product.stock}</td>
                        <td className="text-end">
                          <button className="btn btn-sm btn-outline-primary me-2" onClick={() => { setEditingId(product.id); setForm({ title: product.title, description: product.description, category: product.category, image: product.image, price: product.price, stock: product.stock, rating: product.rating }); }}>Edit</button>
                          <button className="btn btn-sm btn-outline-danger" onClick={() => deleteProduct(product.id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="bg-white rounded-4 p-4 shadow-sm">
            <h2 className="h5 mb-3">Top Bought Products</h2>
            {topProducts.length === 0 ? <p className="text-muted mb-0">No purchases yet.</p> : (
              <ul className="mb-0">
                {topProducts.map(([name, qty]) => <li key={name}>{name} - {qty} units</li>)}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Admin;
