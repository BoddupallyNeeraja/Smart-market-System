const FilterSidebar = ({
  categories,
  selectedCategory,
  onCategoryChange,
  minPrice,
  maxPrice,
  minRating,
  sortBy,
  onFilterChange,
  onClear,
}) => (
  <aside className="card border-0 shadow-sm p-3 h-100">
    <h5 className="mb-3">Filters</h5>

    <label className="form-label">Category</label>
    <select
      className="form-select mb-3"
      value={selectedCategory}
      onChange={(e) => onCategoryChange(e.target.value)}
    >
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>

    <label className="form-label">Min Price (${minPrice})</label>
    <input
      type="range"
      className="form-range mb-3"
      min="0"
      max="1000"
      value={minPrice}
      onChange={(e) => onFilterChange('minPrice', Number(e.target.value))}
    />

    <label className="form-label">Max Price (${maxPrice})</label>
    <input
      type="range"
      className="form-range mb-3"
      min="0"
      max="1000"
      value={maxPrice}
      onChange={(e) => onFilterChange('maxPrice', Number(e.target.value))}
    />

    <label className="form-label">Minimum Rating ({minRating}+)</label>
    <input
      type="range"
      className="form-range mb-3"
      min="0"
      max="5"
      step="0.5"
      value={minRating}
      onChange={(e) => onFilterChange('minRating', Number(e.target.value))}
    />

    <label className="form-label">Sort By</label>
    <select
      className="form-select mb-3"
      value={sortBy}
      onChange={(e) => onFilterChange('sortBy', e.target.value)}
    >
      <option value="newest">Newest products</option>
      <option value="priceLowHigh">Price low to high</option>
      <option value="priceHighLow">Price high to low</option>
      <option value="rating">Rating</option>
    </select>

    <button className="btn btn-outline-secondary" onClick={onClear}>
      Reset filters
    </button>
  </aside>
);

export default FilterSidebar;
