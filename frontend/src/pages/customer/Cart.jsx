import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import CartItem from '../../components/cart/CartItem';
import CartSummary from '../../components/cart/CartSummary';
import Loader from '../../components/common/Loader';
import { useCart } from '../../context/CartContext';

const Cart = () => {
  const { cartItems, cartTotal, loading, updateCartItem, removeFromCart } = useCart();

  const update = async (productId, quantity) => {
    try {
      await updateCartItem(productId, Math.max(quantity, 1));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not update cart');
    }
  };

  const remove = async (productId) => {
    try {
      await removeFromCart(productId);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not remove item');
    }
  };

  if (loading) return <Loader />;

  return (
    <section className="container py-5">
      <h1>My Cart</h1>
      <div className="row g-4">
        <div className="col-lg-8">
          {cartItems.length === 0 ? (
            <div className="alert alert-info">Your cart is empty. <Link to="/products">Browse medicines</Link></div>
          ) : cartItems.map((item) => <CartItem key={item.product?._id} item={item} onUpdate={update} onRemove={remove} />)}
        </div>
        <div className="col-lg-4"><CartSummary total={cartTotal} /></div>
      </div>
    </section>
  );
};

export default Cart;
