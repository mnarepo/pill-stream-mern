import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../../api/orderApi';
import { getInvoiceUrl } from '../../api/reportApi';
import Loader from '../../components/common/Loader';
import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';
import imageUrl from '../../utils/imageUrl';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrderById(id).then(({ data }) => setOrder(data.data.order)).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (!order) return <section className="container py-5"><div className="alert alert-danger">Order not found</div></section>;

  return (
    <section className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div><h1>Order Details</h1><p className="text-muted mb-0">{order._id}</p></div>
        <a href={getInvoiceUrl(order._id)} target="_blank" rel="noreferrer" className="btn btn-outline-primary">View Invoice PDF</a>
      </div>
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm p-4">
            <h5>Items</h5>
            {order.orderItems.map((item) => (
              <div className="d-flex align-items-center gap-3 border-bottom py-3" key={item.product}>
                <img src={imageUrl(item.image)} className="cart-img" alt={item.name} />
                <div className="flex-grow-1"><h6>{item.name}</h6><p className="mb-0 text-muted">Qty: {item.quantity}</p></div>
                <strong>{formatCurrency(item.quantity * item.price)}</strong>
              </div>
            ))}
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm p-4 mb-4">
            <h5>Status</h5>
            <p><strong>Order:</strong> {order.orderStatus}</p>
            <p><strong>Payment:</strong> {order.paymentStatus}</p>
            <p><strong>Date:</strong> {formatDate(order.createdAt)}</p>
          </div>
          <div className="card border-0 shadow-sm p-4">
            <h5>Shipping</h5>
            <p>{order.shippingAddress.fullName}</p>
            <p>{order.shippingAddress.phone}</p>
            <p>{order.shippingAddress.address}, {order.shippingAddress.city}</p>
            <hr />
            <div className="d-flex justify-content-between"><span>Items</span><strong>{formatCurrency(order.itemsPrice)}</strong></div>
            <div className="d-flex justify-content-between"><span>Delivery</span><strong>{formatCurrency(order.deliveryFee)}</strong></div>
            <div className="d-flex justify-content-between fs-5"><span>Total</span><strong>{formatCurrency(order.totalPrice)}</strong></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;
