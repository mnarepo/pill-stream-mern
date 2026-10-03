import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyOrders } from '../../api/orderApi';
import Loader from '../../components/common/Loader';
import DataTable from '../../components/admin/DataTable';
import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyOrders().then(({ data }) => setOrders(data.data.orders)).finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <section className="container py-5">
      <h1>My Orders</h1>
      <div className="card border-0 shadow-sm p-3">
        <DataTable rows={orders} columns={[
          { key: '_id', label: 'Order No.', render: (row) => <span className="small">{row._id}</span> },
          { key: 'createdAt', label: 'Date', render: (row) => formatDate(row.createdAt) },
          { key: 'totalPrice', label: 'Total', render: (row) => formatCurrency(row.totalPrice) },
          { key: 'paymentStatus', label: 'Payment' },
          { key: 'orderStatus', label: 'Status', render: (row) => <span className="badge bg-primary">{row.orderStatus}</span> },
          { key: 'actions', label: 'Actions', render: (row) => <Link className="btn btn-sm btn-outline-success" to={`/my-orders/${row._id}`}>View</Link> }
        ]} />
      </div>
    </section>
  );
};

export default MyOrders;
