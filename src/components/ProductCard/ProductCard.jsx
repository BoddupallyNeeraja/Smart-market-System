import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const ProductCard = ({ product, onCartClick }) => {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  return (
    <article className="card h-100 product-card border-0 shadow-sm">
      <div className="ratio ratio-1x1 bg-white p-3">
        <img src={product.image} alt={product.title} className="object-fit-contain" />
      </div>
      <div className="card-body d-flex flex-column">
        <span className="badge text-bg-light text-capitalize align-self-start mb-2">
          {product.category}
        </span>
        <h6 className="card-title text-truncate-2">{product.title}</h6>
        <p className="small text-muted mb-3">Rating: {product.rating.toFixed(1)} / 5</p>
        <div className="d-flex justify-content-between align-items-center mt-auto mb-3">
          <strong className="text-primary">${product.price.toFixed(2)}</strong>
          <Link to={`/product/${product.id}`} className="btn btn-sm btn-outline-secondary">
            View
          </Link>
        </div>

        <div className="d-flex gap-2">
          <button
            className="btn btn-sm btn-primary flex-grow-1"
            onClick={() => {
              addToCart(product);
              onCartClick?.();
            }}
          >
            Add to cart
          </button>
          <button
            className={`btn btn-sm ${
              isWishlisted(product.id) ? 'btn-danger' : 'btn-outline-danger'
            }`}
            onClick={() => toggleWishlist(product)}
          >
            ❤️
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
