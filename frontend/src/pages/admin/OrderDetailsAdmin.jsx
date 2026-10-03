import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getOrderById, updateOrderStatus, updatePaymentStatus } from '../../api/orderApi';
import { getInvoiceUrl } from '../../api/reportApi';
import Loader from '../../components/common/Loader';
import formatCurrency from '../../utils/formatCurrency';
import imageUrl from '../../utils/imageUrl';

const orderStatuses = ['Pending', 'Approved', 'Packed', 'Dispatched', 'Delivered', 'Cancelled'];
const paymentStatuses = ['Pending', 'Paid', 'Failed', 'Refunded'];

const OrderDetailsAdmin = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const load = () => getOrderById(id).then(({ data }) => setOrder(data.data.order)).finally(() => setLoading(false));
  useEffect(() => { load(); }, [id]);

  const changeOrder = async (status) => { await updateOrderStatus(id, status); toast.success('Order status updated'); load(); };
  const changePayment = async (status) => { await updatePaymentStatus(id, status); toast.success('Payment status updated'); load(); };

  if (loading) return <Loader />;
  if (!order) return <div className="alert alert-danger">Order not found</div>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4"><div><h1>Order Details</h1><p className="text-muted mb-0">{order._id}</p></div><a className="btn btn-outline-primary" target="_blank" rel="noreferrer" href={getInvoiceUrl(order._id)}>Invoice PDF</a></div>
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm p-4 mb-4"><h5>Customer Info</h5><p><strong>Name:</strong> {order.user?.name}</p><p><strong>Email:</strong> {order.user?.email}</p><p><strong>Phone:</strong> {order.shippingAddress.phone}</p><p><strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}</p></div>
          <div className="card border-0 shadow-sm p-4"><h5>Order Items</h5>{order.orderItems.map((item) => <div className="d-flex align-items-center gap-3 border-bottom py-3" key={item.product}><img src={imageUrl(item.image)} alt={item.name} className="cart-img" /><div className="flex-grow-1"><h6>{item.name}</h6><p className="mb-0">Qty: {item.quantity}</p></div><strong>{formatCurrency(item.quantity * item.price)}</strong></div>)}</div>
        </div>
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm p-4 mb-4">
            <h5>Update Status</h5>
            <label className="form-label">Order Status</label><select className="form-select mb-3" value={order.orderStatus} onChange={(e) => changeOrder(e.target.value)}>{orderStatuses.map((s) => <option key={s}>{s}</option>)}</select>
            <label className="form-label">Payment Status</label><select className="form-select" value={order.paymentStatus} onChange={(e) => changePayment(e.target.value)}>{paymentStatuses.map((s) => <option key={s}>{s}</option>)}</select>
          </div>
          {order.prescriptionImage && <div className="card border-0 shadow-sm p-4 mb-4"><h5>Prescription</h5><a href={imageUrl(order.prescriptionImage)} target="_blank" rel="noreferrer"><img src={imageUrl(order.prescriptionImage)} className="img-fluid rounded" alt="Prescription" /></a></div>}
          <div className="card border-0 shadow-sm p-4"><h5>Total</h5><div className="d-flex justify-content-between"><span>Items</span><strong>{formatCurrency(order.itemsPrice)}</strong></div><div className="d-flex justify-content-between"><span>Delivery</span><strong>{formatCurrency(order.deliveryFee)}</strong></div><div className="d-flex justify-content-between fs-5"><span>Total</span><strong>{formatCurrency(order.totalPrice)}</strong></div></div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsAdmin;
