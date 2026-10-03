import { useEffect, useState } from 'react';
import { getMonthlySales, getSalesReport, getTopProducts } from '../../api/reportApi';
import DataTable from '../../components/admin/DataTable';
import SalesChart from '../../components/admin/SalesChart';
import Loader from '../../components/common/Loader';
import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';

const Reports = () => {
  const [filters, setFilters] = useState({ startDate: '', endDate: '' });
  const [sales, setSales] = useState(null);
  const [monthly, setMonthly] = useState([]);
  const [top, setTop] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const [salesRes, monthlyRes, topRes] = await Promise.all([getSalesReport(filters), getMonthlySales(), getTopProducts()]);
      setSales(salesRes.data.data);
      setMonthly(monthlyRes.data.data.monthlySales);
      setTop(topRes.data.data.products);
    } finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  return (
    <div>
      <h1>Reports</h1>
      <div className="card border-0 shadow-sm p-3 mb-4">
        <form className="row g-2" onSubmit={(e) => { e.preventDefault(); load(); }}>
          <div className="col-md-4"><label className="form-label">Start Date</label><input type="date" className="form-control" value={filters.startDate} onChange={(e) => setFilters({ ...filters, startDate: e.target.value })} /></div>
          <div className="col-md-4"><label className="form-label">End Date</label><input type="date" className="form-control" value={filters.endDate} onChange={(e) => setFilters({ ...filters, endDate: e.target.value })} /></div>
          <div className="col-md-2 d-flex align-items-end"><button className="btn btn-success w-100">Apply</button></div>
          <div className="col-md-2 d-flex align-items-end"><button type="button" className="btn btn-outline-secondary w-100" onClick={() => window.print()}>Print</button></div>
        </form>
      </div>
      {loading ? <Loader /> : <>
        <div className="row g-4 mb-4">
          <div className="col-md-3"><div className="report-box"><span>Total Orders</span><strong>{sales.summary.totalOrders}</strong></div></div>
          <div className="col-md-3"><div className="report-box"><span>Total Sales</span><strong>{formatCurrency(sales.summary.totalSales)}</strong></div></div>
          <div className="col-md-3"><div className="report-box"><span>Items Revenue</span><strong>{formatCurrency(sales.summary.itemsRevenue)}</strong></div></div>
          <div className="col-md-3"><div className="report-box"><span>Avg Order</span><strong>{formatCurrency(sales.summary.averageOrderValue || 0)}</strong></div></div>
        </div>
        <div className="row g-4">
          <div className="col-lg-7"><SalesChart data={monthly} /></div>
          <div className="col-lg-5"><div className="card border-0 shadow-sm p-3"><h5>Top Products</h5><DataTable rows={top} columns={[{ key: 'name', label: 'Name' }, { key: 'soldQuantity', label: 'Sold' }, { key: 'revenue', label: 'Revenue', render: (row) => formatCurrency(row.revenue) }]} /></div></div>
          <div className="col-12"><div className="card border-0 shadow-sm p-3"><h5>Sales Orders</h5><DataTable rows={sales.orders} columns={[{ key: '_id', label: 'Order', render: (row) => row._id.slice(-8) }, { key: 'customer', label: 'Customer', render: (row) => row.user?.name || row.shippingAddress?.fullName }, { key: 'date', label: 'Date', render: (row) => formatDate(row.createdAt) }, { key: 'totalPrice', label: 'Total', render: (row) => formatCurrency(row.totalPrice) }, { key: 'status', label: 'Status', render: (row) => row.orderStatus }]} /></div></div>
        </div>
      </>}
    </div>
  );
};

export default Reports;
