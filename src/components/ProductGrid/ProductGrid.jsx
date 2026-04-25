import ProductCard from '../ProductCard/ProductCard';

const ProductGrid = ({ products, onCartClick }) => (
  <section className="row g-4">
    {products.map((product) => (
      <div className="col-sm-6 col-md-4 col-xl-3" key={product.id}>
        <ProductCard product={product} onCartClick={onCartClick} />
      </div>
    ))}
  </section>
);

export default ProductGrid;
