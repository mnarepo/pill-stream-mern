import { useEffect, useState } from 'react';
import { getCategories } from '../../api/categoryApi';
import { getProducts } from '../../api/productApi';
import Loader from '../../components/common/Loader';
import ProductFilter from '../../components/product/ProductFilter';
import ProductList from '../../components/product/ProductList';
import SearchBar from '../../components/product/SearchBar';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({ sort: 'newest' });
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProducts = async (nextFilters = filters) => {
    setLoading(true);
    try {
      const { data } = await getProducts(nextFilters);
      setProducts(data.data.products);
      setPagination(data.data.pagination);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories().then(({ data }) => setCategories(data.data.categories));
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changePage = (page) => {
    const next = { ...filters, page };
    setFilters(next);
    loadProducts(next);
  };

  return (
    <section className="container py-5">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <div><h1>All Medicines</h1><p className="text-muted mb-0">Browse medicines and pharmacy products.</p></div>
        <SearchBar />
      </div>
      <ProductFilter categories={categories} filters={filters} setFilters={setFilters} onApply={() => loadProducts({ ...filters, page: 1 })} />
      {loading ? <Loader /> : <ProductList products={products} />}
      {pagination?.pages > 1 && (
        <div className="d-flex justify-content-center gap-2 mt-4">
          {Array.from({ length: pagination.pages }).map((_, index) => (
            <button key={index} className={`btn btn-sm ${pagination.page === index + 1 ? 'btn-success' : 'btn-outline-success'}`} onClick={() => changePage(index + 1)}>{index + 1}</button>
          ))}
        </div>
      )}
    </section>
  );
};

export default Products;
