import { Link } from 'react-router-dom';
import EmptyState from '../../components/EmptyState/EmptyState';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import { useWishlist } from '../../context/WishlistContext';

const Wishlist = () => {
  const { items, clearWishlist } = useWishlist();

  if (items.length === 0) {
    return (
      <EmptyState
        title="No wishlist items yet"
        message="Save products to your wishlist to revisit them quickly."
        action={
          <Link className="btn btn-primary" to="/products">
            Browse products
          </Link>
        }
      />
    );
  }

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h4 mb-0">Wishlist ({items.length})</h2>
        <button className="btn btn-outline-danger" onClick={clearWishlist}>
          Clear wishlist
        </button>
      </div>
      <ProductGrid products={items} />
    </section>
  );
};

export default Wishlist;
