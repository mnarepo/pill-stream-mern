import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeartbeat, FaShieldAlt, FaTruck, FaUserMd } from 'react-icons/fa';
import { getCategories } from '../../api/categoryApi';
import { getFeaturedProducts } from '../../api/productApi';
import Loader from '../../components/common/Loader';
import ProductList from '../../components/product/ProductList';
import SearchBar from '../../components/product/SearchBar';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getCategories(), getFeaturedProducts()])
      .then(([catRes, prodRes]) => {
        setCategories(catRes.data.data.categories);
        setProducts(prodRes.data.data.products);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-7">
              <span className="badge bg-success-subtle text-success mb-3">BISMILLAH Pharmacy</span>
              <h1 className="display-5 fw-bold">Order medicines safely with Pill Stream</h1>
              <p className="lead text-muted">Browse medicines, check categories, upload prescriptions when needed, and track your order from one modern pharmacy platform.</p>
              <SearchBar large />
              <p className="small text-muted mt-3">Some medicines may require a valid prescription. Please consult a doctor or pharmacist before using any medicine.</p>
            </div>
            <div className="col-lg-5">
              <div className="hero-card shadow-lg">
                <FaHeartbeat size={62} />
                <h3 className="mt-3">Medicine ordering made simple</h3>
                <p>Clean catalog, secure accounts, cart checkout, and admin-reviewed orders.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="section-title">Shop by Category</h2>
          <Link to="/products" className="btn btn-outline-success">View all products</Link>
        </div>
        {loading ? <Loader /> : (
          <div className="row g-3">
            {categories.map((category) => (
              <div className="col-sm-6 col-md-4 col-lg-3" key={category._id}>
                <Link to={`/category/${category.slug}`} className="category-card text-decoration-none">
                  <h6>{category.name}</h6>
                  <p>{category.description}</p>
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="section-title">Featured Medicines</h2>
          <Link to="/products" className="btn btn-success">Shop Now</Link>
        </div>
        {loading ? <Loader /> : <ProductList products={products} />}
      </section>

      <section className="container py-5">
        <div className="row g-4">
          <div className="col-md-4"><div className="feature-card"><FaTruck /><h5>Fast Delivery</h5><p>Local pharmacy delivery workflow with order status tracking.</p></div></div>
          <div className="col-md-4"><div className="feature-card"><FaShieldAlt /><h5>Safe Ordering</h5><p>Prescription flag support and admin order review for pharmacy-specific demo needs.</p></div></div>
          <div className="col-md-4"><div className="feature-card"><FaUserMd /><h5>Pharmacist Friendly</h5><p>Admin can manage stock, categories, sales and customer messages from one panel.</p></div></div>
        </div>
      </section>
    </>
  );
};

export default Home;
