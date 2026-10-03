const DashboardCard = ({ title, value, icon, note }) => (
  <div className="card border-0 shadow-sm dashboard-card h-100">
    <div className="card-body d-flex align-items-center justify-content-between">
      <div>
        <p className="text-muted mb-1">{title}</p>
        <h3 className="mb-0">{value}</h3>
        {note && <small className="text-muted">{note}</small>}
      </div>
      <div className="dashboard-icon">{icon}</div>
    </div>
  </div>
);

export default DashboardCard;
