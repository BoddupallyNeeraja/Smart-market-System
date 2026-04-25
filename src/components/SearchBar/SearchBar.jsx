const SearchBar = ({ value, onChange }) => (
  <div className="input-group">
    <span className="input-group-text">Search</span>
    <input
      type="search"
      className="form-control"
      placeholder="Search by product name"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default SearchBar;
