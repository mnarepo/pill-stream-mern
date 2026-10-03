import { useEffect, useState } from 'react';
import { FaBox, FaClipboardList, FaDollarSign, FaTags, FaTruck, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getDashboardReport, getMonthlySales, getTopProducts } from '../../api/reportApi';
import DashboardCard from '../../components/admin/DashboardCard';
import DataTable from '../../components/admin/DataTable';
import SalesChart from '../../components/admin/SalesChart';
import Loader from '../../components/common/Loader';
import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [monthlySales, setMonthlySales] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getDashboardReport(), getMonthlySales(), getTopProducts()])
      .then(([dashRes, monthlyRes, topRes]) => {
        setDashboard(dashRes.data.data);
        setMonthlySales(monthlyRes.data.data.monthlySales);
        setTopProducts(topRes.data.data.products);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  const cards = [
    ['Total Users', dashboard.totalUsers, <FaUsers />],
    ['Total Products', dashboard.totalProducts, <FaBox />],
    ['Total Categories', dashboard.totalCategories, <FaTags />],
    ['Total Orders', dashboard.totalOrders, <FaClipboardList />],
    ['Total Sales', formatCurrency(dashboard.totalSales), <FaDollarSign />],
    ['Pending Orders', dashboard.pendingOrders, <FaClipboardList />],
    ['Delivered Orders', dashboard.deliveredOrders, <FaTruck />],
    ['Low Stock Items', dashboard.lowStockProducts?.length || 0, <FaBox />]
  ];

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p className="text-muted">Overview of users, medicines, orders, sales, and stock.</p>
      <div className="row g-4 mb-4">
        {cards.map(([title, value, icon]) => <div className="col-sm-6 col-xl-3" key={title}><DashboardCard title={title} value={value} icon={icon} /></div>)}
      </div>
      <div className="row g-4">
        <div className="col-xl-8"><SalesChart data={monthlySales} /></div>
        <div className="col-xl-4">
          <div className="card border-0 shadow-sm h-100"><div className="card-body"><h5>Top Products</h5>{topProducts.length === 0 ? <p className="text-muted">No sales yet.</p> : topProducts.map((p) => <div className="d-flex justify-content-between border-bottom py-2" key={p._id}><span>{p.name}</span><strong>{p.soldQuantity}</strong></div>)}</div></div>
        </div>
        <div className="col-12">
          <div className="card border-0 shadow-sm p-3">
            <h5>Recent Orders</h5>
            <DataTable rows={dashboard.recentOrders || []} columns={[
              { key: '_id', label: 'Order ID', render: (row) => <span className="small">{row._id}</span> },
              { key: 'customer', label: 'Customer', render: (row) => row.user?.name || row.shippingAddress?.fullName },
              { key: 'date', label: 'Date', render: (row) => formatDate(row.createdAt) },
              { key: 'totalPrice', label: 'Total', render: (row) => formatCurrency(row.totalPrice) },
              { key: 'status', label: 'Status', render: (row) => <span className="badge bg-primary">{row.orderStatus}</span> },
              { key: 'actions', label: 'Actions', render: (row) => <Link className="btn btn-sm btn-outline-success" to={`/admin/orders/${row._id}`}>View</Link> }
            ]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
