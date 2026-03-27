export default function Sidebar({ searchTerm, setSearchTerm, maxPrice, setMaxPrice }) {
  return (
    <aside className="sidebar">
      <h3>Filters</h3>

      <div className="filter-group">
        <label>Search</label>
        <div className="search-box">
          🔍
          <input
            type="text"
            placeholder="Search caterer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="filter-group">
        <label>Max Price</label>
        <div className="filter-box">
          💰
          <input
            type="number"
            placeholder="Any"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>
    </aside>
  );
}