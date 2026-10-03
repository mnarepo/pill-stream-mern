import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../../api/productApi';
import Loader from '../../components/common/Loader';
import ProductList from '../../components/product/ProductList';
import SearchBar from '../../components/product/SearchBar';

const SearchResults = () => {
  const [params] = useSearchParams();
  const q = params.get('q') || '';
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProducts({ search: q })
      .then(({ data }) => setProducts(data.data.products))
      .finally(() => setLoading(false));
  }, [q]);

  return (
    <section className="container py-5">
      <div className="d-flex justify-content-between flex-wrap gap-3 mb-4">
        <div><h1>Search Results</h1><p className="text-muted mb-0">Showing results for: <strong>{q}</strong></p></div>
        <SearchBar initial={q} />
      </div>
      {loading ? <Loader /> : <ProductList products={products} />}
    </section>
  );
};

export default SearchResults;
