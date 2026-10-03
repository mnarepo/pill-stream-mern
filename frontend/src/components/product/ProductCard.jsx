import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import formatCurrency from '../../utils/formatCurrency';
import imageUrl from '../../utils/imageUrl';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAdd = async () => {
    if (!isAuthenticated) {
      toast.info('Please login to add products to cart');
      navigate('/login');
      return;
    }
    try {
      await addToCart(product._id, 1);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not add product');
    }
  };

  return (
    <div className="card product-card h-100 border-0 shadow-sm">
      <Link to={`/products/${product.slug}`}>
        <img src={imageUrl(product.image)} className="card-img-top product-img" alt={product.name} />
      </Link>
      <div className="card-body d-flex flex-column">
        <span className="badge bg-light text-success align-self-start mb-2">{product.category?.name}</span>
        <h6 className="card-title"><Link to={`/products/${product.slug}`} className="text-decoration-none text-dark">{product.name}</Link></h6>
        <p className="small text-muted flex-grow-1">{product.description?.slice(0, 85)}...</p>
        {product.requiresPrescription && <span className="badge bg-warning text-dark mb-2">Prescription Required</span>}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <strong className="text-success">{formatCurrency(product.price)}</strong>
          <span className={`small ${product.stock > 0 ? 'text-muted' : 'text-danger'}`}>{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</span>
        </div>
        <div className="d-flex gap-2">
          <Link to={`/products/${product.slug}`} className="btn btn-outline-primary btn-sm flex-fill">Details</Link>
          <button disabled={product.stock < 1} onClick={handleAdd} className="btn btn-success btn-sm flex-fill">Add</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
