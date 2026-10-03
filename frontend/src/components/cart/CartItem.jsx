import formatCurrency from '../../utils/formatCurrency';
import imageUrl from '../../utils/imageUrl';

const CartItem = ({ item, onUpdate, onRemove }) => {
  const product = item.product;
  return (
    <div className="card border-0 shadow-sm mb-3">
      <div className="card-body d-flex gap-3 align-items-center flex-wrap">
        <img src={imageUrl(product?.image)} alt={product?.name} className="cart-img" />
        <div className="flex-grow-1">
          <h6 className="mb-1">{product?.name}</h6>
          <p className="small text-muted mb-1">{product?.dosage} • {product?.packSize}</p>
          <p className="mb-0 text-success fw-bold">{formatCurrency(item.priceAtTime)}</p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <input className="form-control qty-input" type="number" min="1" max={product?.stock || 1} value={item.quantity} onChange={(e) => onUpdate(product._id, Number(e.target.value))} />
          <button className="btn btn-outline-danger" onClick={() => onRemove(product._id)}>Remove</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
