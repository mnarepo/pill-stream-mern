import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { cancelOrderAdmin, getAllOrders, updateOrderStatus, updatePaymentStatus } from '../../api/orderApi';
import DataTable from '../../components/admin/DataTable';
import Loader from '../../components/common/Loader';
import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';

const orderStatuses = ['Pending', 'Approved', 'Packed', 'Dispatched', 'Delivered', 'Cancelled'];
const paymentStatuses = ['Pending', 'Paid', 'Failed', 'Refunded'];

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filters, setFilters] = useState({ status: '', search: '' });
  const [loading, setLoading] = useState(true);

  const load = async () => { setLoading(true); try { const { data } = await getAllOrders(filters); setOrders(data.data.orders); } finally { setLoading(false); } };
  useEffect(() => { load(); }, []);

  const changeOrder = async (row, status) => { await updateOrderStatus(row._id, status); toast.success('Order status updated'); load(); };
  const changePayment = async (row, status) => { await updatePaymentStatus(row._id, status); toast.success('Payment status updated'); load(); };
  const cancel = async (id) => { if (!window.confirm('Cancel this order?')) return; await cancelOrderAdmin(id); toast.success('Order cancelled'); load(); };

  return (
    <div>
      <h1>Manage Orders</h1>
      <div className="card border-0 shadow-sm p-3">
        <form className="row g-2 mb-3" onSubmit={(e) => { e.preventDefault(); load(); }}>
          <div className="col-md-4"><input className="form-control" placeholder="Search order/customer" value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} /></div>
          <div className="col-md-3"><select className="form-select" value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}><option value="">All Status</option>{orderStatuses.map((s) => <option key={s}>{s}</option>)}</select></div>
          <div className="col-md-2"><button className="btn btn-outline-success w-100">Filter</button></div>
        </form>
        {loading ? <Loader /> : <DataTable rows={orders} columns={[
          { key: '_id', label: 'Order', render: (row) => <span className="small">{row._id.slice(-8)}</span> },
          { key: 'customer', label: 'Customer', render: (row) => row.user?.name || row.shippingAddress?.fullName },
          { key: 'date', label: 'Date', render: (row) => formatDate(row.createdAt) },
          { key: 'totalPrice', label: 'Total', render: (row) => formatCurrency(row.totalPrice) },
          { key: 'orderStatus', label: 'Order Status', render: (row) => <select className="form-select form-select-sm" value={row.orderStatus} onChange={(e) => changeOrder(row, e.target.value)}>{orderStatuses.map((s) => <option key={s}>{s}</option>)}</select> },
          { key: 'paymentStatus', label: 'Payment', render: (row) => <select className="form-select form-select-sm" value={row.paymentStatus} onChange={(e) => changePayment(row, e.target.value)}>{paymentStatuses.map((s) => <option key={s}>{s}</option>)}</select> },
          { key: 'actions', label: 'Actions', render: (row) => <div className="btn-group"><Link className="btn btn-sm btn-outline-primary" to={`/admin/orders/${row._id}`}>View</Link><button className="btn btn-sm btn-outline-danger" onClick={() => cancel(row._id)}>Cancel</button></div> }
        ]} />}
      </div>
    </div>
  );
};

export default ManageOrders;
