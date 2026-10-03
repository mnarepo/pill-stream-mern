import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const SalesChart = ({ data = [] }) => (
  <div className="card border-0 shadow-sm">
    <div className="card-body">
      <h5>Monthly Sales</h5>
      <div style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#0ea47a" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

export default SalesChart;
