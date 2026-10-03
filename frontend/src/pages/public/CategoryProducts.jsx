import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCategoryBySlug } from '../../api/categoryApi';
import { getProducts } from '../../api/productApi';
import Loader from '../../components/common/Loader';
import ProductList from '../../components/product/ProductList';

const CategoryProducts = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getCategoryBySlug(slug), getProducts({ category: slug })])
      .then(([catRes, prodRes]) => {
        setCategory(catRes.data.data.category);
        setProducts(prodRes.data.data.products);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <section className="container py-5">
      {loading ? <Loader /> : (
        <>
          <h1>{category?.name}</h1>
          <p className="text-muted">{category?.description}</p>
          <ProductList products={products} />
        </>
      )}
    </section>
  );
};

export default CategoryProducts;
