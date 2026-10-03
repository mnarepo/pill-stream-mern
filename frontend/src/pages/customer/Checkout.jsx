import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createOrder } from '../../api/orderApi';
import formatCurrency from '../../utils/formatCurrency';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Checkout = () => {
  const { user } = useAuth();
  const { cartItems, cartTotal, setCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [prescriptionImage, setPrescriptionImage] = useState(null);
  const [form, setForm] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    postalCode: '',
    paymentMethod: 'Cash on Delivery',
    notes: ''
  });

  const requiresPrescription = useMemo(() => cartItems.some((item) => item.product?.requiresPrescription), [cartItems]);
  const deliveryFee = cartTotal >= 3000 || cartTotal === 0 ? 0 : 150;

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!cartItems.length) return toast.error('Cart is empty');
    if (requiresPrescription && !prescriptionImage) return toast.error('Please upload prescription image for prescription medicines');
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => formData.append(key, value));
      if (prescriptionImage) formData.append('prescriptionImage', prescriptionImage);
      const { data } = await createOrder(formData);
      setCart({ items: [], totalAmount: 0 });
      toast.success('Order placed successfully');
      navigate(`/my-orders/${data.data.order._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Checkout failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container py-5">
      <h1>Checkout</h1>
      <form onSubmit={submit} className="row g-4">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm p-4 mb-4">
            <h5>Shipping Information</h5>
            <div className="row g-3">
              <div className="col-md-6"><label className="form-label">Full Name</label><input name="fullName" value={form.fullName} onChange={change} required className="form-control" /></div>
              <div className="col-md-6"><label className="form-label">Phone</label><input name="phone" value={form.phone} onChange={change} required className="form-control" /></div>
              <div className="col-md-6"><label className="form-label">City</label><input name="city" value={form.city} onChange={change} required className="form-control" /></div>
              <div className="col-md-6"><label className="form-label">Postal Code</label><input name="postalCode" value={form.postalCode} onChange={change} className="form-control" /></div>
              <div className="col-12"><label className="form-label">Address</label><textarea name="address" value={form.address} onChange={change} required rows="3" className="form-control" /></div>
            </div>
          </div>
          <div className="card border-0 shadow-sm p-4">
            <h5>Payment and Prescription</h5>
            <label className="form-label">Payment Method</label>
            <select name="paymentMethod" value={form.paymentMethod} onChange={change} className="form-select mb-3">
              <option>Cash on Delivery</option><option>Card</option><option>Bank Transfer</option>
            </select>
            {requiresPrescription && <div className="alert alert-warning">Your cart contains prescription medicines. Upload a prescription image before placing order.</div>}
            <label className="form-label">Prescription Image {requiresPrescription ? '(required)' : '(optional)'}</label>
            <input type="file" accept="image/png,image/jpeg,image/jpg,image/webp" className="form-control mb-3" onChange={(e) => setPrescriptionImage(e.target.files[0])} />
            <label className="form-label">Notes</label>
            <textarea name="notes" value={form.notes} onChange={change} rows="3" className="form-control" />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm p-4 sticky-summary">
            <h5>Order Summary</h5>
            {cartItems.map((item) => <div className="d-flex justify-content-between small mb-2" key={item.product?._id}><span>{item.product?.name} × {item.quantity}</span><strong>{formatCurrency(item.quantity * item.priceAtTime)}</strong></div>)}
            <hr />
            <div className="d-flex justify-content-between"><span>Items</span><strong>{formatCurrency(cartTotal)}</strong></div>
            <div className="d-flex justify-content-between"><span>Delivery</span><strong>{formatCurrency(deliveryFee)}</strong></div>
            <div className="d-flex justify-content-between fs-5 mt-2"><span>Total</span><strong>{formatCurrency(cartTotal + deliveryFee)}</strong></div>
            <button disabled={loading || !cartItems.length} className="btn btn-success w-100 mt-3">{loading ? 'Placing...' : 'Place Order'}</button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Checkout;
