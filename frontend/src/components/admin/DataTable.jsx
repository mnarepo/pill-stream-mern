const DataTable = ({ columns = [], rows = [], empty = 'No data found' }) => (
  <div className="table-responsive">
    <table className="table table-hover align-middle">
      <thead className="table-light">
        <tr>{columns.map((column) => <th key={column.key}>{column.label}</th>)}</tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <tr><td colSpan={columns.length} className="text-center text-muted py-4">{empty}</td></tr>
        ) : rows.map((row, index) => (
          <tr key={row._id || index}>
            {columns.map((column) => <td key={column.key}>{column.render ? column.render(row, index) : row[column.key]}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default DataTable;
