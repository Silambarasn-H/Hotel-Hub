function Sidebar({ minPrice, maxPrice, onPriceChange }) {
  return (
    <aside className="sidebar">
      <h3>Filters</h3>

      <div className="filter-section">
        <h4>Price Range</h4>

        <label>Minimum Price</label>
        <input
          type="number"
          placeholder="Min price"
          min="0"
          value={minPrice}
          onChange={(e) =>
            onPriceChange("min", e.target.value)
          }
        />

        <label>Maximum Price</label>
        <input
          type="number"
          placeholder="Max price"
          min="0"
          value={maxPrice}
          onChange={(e) =>
            onPriceChange("max", e.target.value)
          }
        />
      </div>
    </aside>
  );
}

export default Sidebar;
