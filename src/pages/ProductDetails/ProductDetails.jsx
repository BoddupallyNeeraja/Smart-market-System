import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useProducts } from '../../context/ProductContext';
import { fetchProductById } from '../../services/api';

const ProductDetails = ({ onCartClick }) => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { getProductById } = useProducts();

  const [product, setProduct] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setError('');

      const localProduct = getProductById(id);
      if (localProduct) {
        setProduct(localProduct);
        setLoading(false);
        return;
      }

      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch {
        setError('Unable to fetch product details from any source.');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, getProductById]);

  const inStock = useMemo(() => Number(product?.stock ?? 0) > 0, [product]);

  if (isLoading) return <Loader type="page" />;
  if (error || !product) return <ErrorMessage title="Product unavailable" message={error || 'Not found'} />;

  return (
    <section className="bg-white rounded-4 p-4 shadow-sm">
      <Breadcrumbs items={[{ label: 'Products', to: '/products' }, { label: product.title }]} />
      <Link to="/products" className="btn btn-sm btn-outline-secondary mb-4">Back to products</Link>

      <div className="row g-4">
        <div className="col-md-5">
          <div className="ratio ratio-1x1 border rounded-4 p-3">
            <img src={product.image} alt={product.title} className="object-fit-contain" />
          </div>
        </div>
        <div className="col-md-7">
          <span className="badge text-bg-light text-capitalize mb-2">{product.category}</span>
          <h1 className="h3">{product.title}</h1>
          <p className="text-muted">{product.description}</p>
          <p className="mb-2">Rating: {Number(product.rating).toFixed(1)} / 5</p>
          <p className={`fw-semibold ${inStock ? 'text-success' : 'text-danger'}`}>
            {inStock ? `${product.stock} in stock` : 'Out of stock'}
          </p>
          <h3 className="text-primary mb-3">${Number(product.price).toFixed(2)}</h3>
          <div className="d-flex flex-wrap gap-2">
            <button
              className="btn btn-primary"
              disabled={!inStock}
              onClick={() => {
                addToCart(product);
                onCartClick?.();
              }}
            >
              Add to cart
            </button>
            <button
              className={`btn ${isWishlisted(product.id) ? 'btn-danger' : 'btn-outline-danger'}`}
              onClick={() => toggleWishlist(product)}
            >
              {isWishlisted(product.id) ? 'Remove wishlist' : 'Add wishlist'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
