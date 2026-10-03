import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getProductBySlug } from '../../api/productApi';
import Loader from '../../components/common/Loader';
import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';
import imageUrl from '../../utils/imageUrl';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const ProductDetails = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    getProductBySlug(slug)
      .then(({ data }) => setProduct(data.data.product))
      .catch(() => toast.error('Product not found'))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleAdd = async () => {
    if (!isAuthenticated) return navigate('/login');
    try {
      await addToCart(product._id, qty);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not add product');
    }
  };

  if (loading) return <Loader />;
  if (!product) return <section className="container py-5"><div className="alert alert-danger">Product not found</div></section>;

  return (
    <section className="container py-5">
      <div className="row g-5">
        <div className="col-lg-5"><img src={imageUrl(product.image)} alt={product.name} className="img-fluid rounded-4 shadow-sm detail-img" /></div>
        <div className="col-lg-7">
          <Link to={`/category/${product.category?.slug}`} className="badge bg-success-subtle text-success text-decoration-none mb-3">{product.category?.name}</Link>
          <h1>{product.name}</h1>
          <p className="lead text-muted">{product.description}</p>
          {product.requiresPrescription && <div className="alert alert-warning">Prescription required. Please upload a valid prescription during checkout.</div>}
          <h3 className="text-success">{formatCurrency(product.price)}</h3>
          {product.oldPrice > product.price && <p className="text-muted"><del>{formatCurrency(product.oldPrice)}</del></p>}
          <div className="row g-3 my-3">
            <div className="col-sm-6"><strong>Dosage:</strong> {product.dosage || 'N/A'}</div>
            <div className="col-sm-6"><strong>Pack Size:</strong> {product.packSize || 'N/A'}</div>
            <div className="col-sm-6"><strong>Brand:</strong> {product.brand || 'N/A'}</div>
            <div className="col-sm-6"><strong>Manufacturer:</strong> {product.manufacturer || 'N/A'}</div>
            <div className="col-sm-6"><strong>Batch Number:</strong> {product.batchNumber || 'N/A'}</div>
            <div className="col-sm-6"><strong>Expiry Date:</strong> {formatDate(product.expiryDate)}</div>
            <div className="col-sm-6"><strong>Stock:</strong> {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}</div>
          </div>
          <div className="d-flex gap-3 align-items-center mt-4">
            <input type="number" min="1" max={product.stock} value={qty} onChange={(e) => setQty(Number(e.target.value))} className="form-control qty-input" />
            <button disabled={product.stock < 1} onClick={handleAdd} className="btn btn-success btn-lg">Add to Cart</button>
          </div>
          <p className="small text-muted mt-4">Pill Stream does not provide medical advice. Please consult a doctor or pharmacist before using any medicine.</p>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
