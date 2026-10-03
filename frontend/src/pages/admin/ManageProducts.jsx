import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteProduct, getAdminProducts } from '../../api/productApi';
import DataTable from '../../components/admin/DataTable';
import Loader from '../../components/common/Loader';
import formatCurrency from '../../utils/formatCurrency';
import imageUrl from '../../utils/imageUrl';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const load = async (term = search) => {
    setLoading(true);
    try {
      const { data } = await getAdminProducts(term);
      setProducts(data.data.products);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(''); }, []);

  const remove = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await deleteProduct(id);
      toast.success('Product deleted');
      load();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not delete product');
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div><h1>Manage Products</h1><p className="text-muted mb-0">Add, edit, delete and track medicine stock.</p></div>
        <Link to="/admin/products/add" className="btn btn-success">Add Product</Link>
      </div>
      <div className="card border-0 shadow-sm p-3">
        <form onSubmit={(e) => { e.preventDefault(); load(search); }} className="input-group mb-3">
          <input className="form-control" placeholder="Search products" value={search} onChange={(e) => setSearch(e.target.value)} />
          <button className="btn btn-outline-success">Search</button>
        </form>
        {loading ? <Loader /> : <DataTable rows={products} columns={[
          { key: 'image', label: 'Image', render: (row) => <img src={imageUrl(row.image)} className="table-img" alt={row.name} /> },
          { key: 'name', label: 'Name' },
          { key: 'category', label: 'Category', render: (row) => row.category?.name || 'N/A' },
          { key: 'price', label: 'Price', render: (row) => formatCurrency(row.price) },
          { key: 'stock', label: 'Stock', render: (row) => <span className={row.stock <= 10 ? 'text-danger fw-bold' : ''}>{row.stock}</span> },
          { key: 'isActive', label: 'Status', render: (row) => <span className={`badge ${row.isActive ? 'bg-success' : 'bg-secondary'}`}>{row.isActive ? 'Active' : 'Inactive'}</span> },
          { key: 'actions', label: 'Actions', render: (row) => <div className="btn-group"><Link className="btn btn-sm btn-outline-primary" to={`/admin/products/edit/${row._id}`}>Edit</Link><button className="btn btn-sm btn-outline-danger" onClick={() => remove(row._id)}>Delete</button></div> }
        ]} />}
      </div>
    </div>
  );
};

export default ManageProducts;
