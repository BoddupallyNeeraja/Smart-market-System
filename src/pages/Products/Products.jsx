import { useEffect, useMemo, useState } from 'react';
import EmptyState from '../../components/EmptyState/EmptyState';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import FilterSidebar from '../../components/FilterSidebar/FilterSidebar';
import Loader from '../../components/Loader/Loader';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import SearchBar from '../../components/SearchBar/SearchBar';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { getCategories } from '../../services/api';
import { useProducts } from '../../context/ProductContext';
import useDebounce from '../../utils/useDebounce';

const defaultFilters = {
  category: 'All',
  minPrice: 0,
  maxPrice: 1000,
  minRating: 0,
  sortBy: 'newest',
};

const PAGE_SIZE = 8;

const Products = ({ onCartClick }) => {
  const { products, isLoading, error, loadProducts } = useProducts();
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState(defaultFilters);
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    loadProducts();
  }, []);

  const categories = useMemo(() => getCategories(products), [products]);

  const filteredProducts = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();

    const result = products
      .filter((product) => (query.length ? product.title.toLowerCase().includes(query) : true))
      .filter((product) => (filters.category === 'All' ? true : product.category === filters.category))
      .filter(
        (product) =>
          product.price >= filters.minPrice &&
          product.price <= filters.maxPrice &&
          product.rating >= filters.minRating
      );

    return [...result].sort((a, b) => {
      switch (filters.sortBy) {
        case 'priceLowHigh':
          return a.price - b.price;
        case 'priceHighLow':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
        default:
          return b.createdAt - a.createdAt;
      }
    });
  }, [products, debouncedSearch, filters]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, filters]);

  const paginatedProducts = filteredProducts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <section>
      <Breadcrumbs items={[{ label: 'Products' }]} />
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <h1 className="h3 mb-0">Products</h1>
        <div style={{ minWidth: '280px' }}>
          <SearchBar value={search} onChange={setSearch} />
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-3">
          <FilterSidebar
            categories={categories}
            selectedCategory={filters.category}
            minPrice={filters.minPrice}
            maxPrice={filters.maxPrice}
            minRating={filters.minRating}
            sortBy={filters.sortBy}
            onCategoryChange={(value) => setFilters((prev) => ({ ...prev, category: value }))}
            onFilterChange={(key, value) => setFilters((prev) => ({ ...prev, [key]: value }))}
            onClear={() => {
              setSearch('');
              setFilters(defaultFilters);
            }}
          />
        </div>

        <div className="col-lg-9">
          {isLoading ? <Loader /> : null}

          {!isLoading && error ? (
            <ErrorMessage title="Failed to load products" message={error} onRetry={loadProducts} />
          ) : null}

          {!isLoading && !error && filteredProducts.length === 0 ? (
            <EmptyState title="No products found" message="Try changing your search or filters." />
          ) : null}

          {!isLoading && !error && filteredProducts.length > 0 ? (
            <>
              <ProductGrid products={paginatedProducts} onCartClick={onCartClick} />
              <nav className="mt-4">
                <ul className="pagination justify-content-center mb-0">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}>Previous</button>
                  </li>
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}>Next</button>
                  </li>
                </ul>
              </nav>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Products;
