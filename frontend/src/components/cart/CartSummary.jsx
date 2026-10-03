import { Link } from 'react-router-dom';
import formatCurrency from '../../utils/formatCurrency';

const CartSummary = ({ total }) => {
  const deliveryFee = total >= 3000 || total === 0 ? 0 : 150;
  return (
    <div className="card border-0 shadow-sm sticky-summary">
      <div className="card-body">
        <h5>Order Summary</h5>
        <div className="d-flex justify-content-between"><span>Items total</span><strong>{formatCurrency(total)}</strong></div>
        <div className="d-flex justify-content-between"><span>Delivery fee</span><strong>{formatCurrency(deliveryFee)}</strong></div>
        <hr />
        <div className="d-flex justify-content-between fs-5"><span>Total</span><strong>{formatCurrency(total + deliveryFee)}</strong></div>
        <Link to="/checkout" className={`btn btn-success w-100 mt-3 ${total === 0 ? 'disabled' : ''}`}>Proceed to Checkout</Link>
      </div>
    </div>
  );
};

export default CartSummary;
