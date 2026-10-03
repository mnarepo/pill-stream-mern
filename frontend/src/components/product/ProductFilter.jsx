const ProductFilter = ({ categories, filters, setFilters, onApply }) => {
  const change = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body">
        <h6 className="mb-3">Filter Medicines</h6>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Category</label>
            <select className="form-select" value={filters.category || ''} onChange={(e) => change('category', e.target.value)}>
              <option value="">All Categories</option>
              {categories.map((category) => <option key={category._id} value={category.slug}>{category.name}</option>)}
            </select>
          </div>
          <div className="col-md-2">
            <label className="form-label">Min Price</label>
            <input className="form-control" type="number" value={filters.minPrice || ''} onChange={(e) => change('minPrice', e.target.value)} />
          </div>
          <div className="col-md-2">
            <label className="form-label">Max Price</label>
            <input className="form-control" type="number" value={filters.maxPrice || ''} onChange={(e) => change('maxPrice', e.target.value)} />
          </div>
          <div className="col-md-2">
            <label className="form-label">Sort</label>
            <select className="form-select" value={filters.sort || 'newest'} onChange={(e) => change('sort', e.target.value)}>
              <option value="newest">Newest</option>
              <option value="priceLow">Price low to high</option>
              <option value="priceHigh">Price high to low</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
          <div className="col-md-2 d-flex align-items-end">
            <button className="btn btn-success w-100" onClick={onApply}>Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
