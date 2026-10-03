import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { createCategory, deleteCategory, getAdminCategories, updateCategory } from '../../api/categoryApi';
import DataTable from '../../components/admin/DataTable';
import Loader from '../../components/common/Loader';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', isActive: true });
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try { const { data } = await getAdminCategories(); setCategories(data.data.categories); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const reset = () => { setForm({ name: '', description: '', isActive: true }); setEditing(null); };
  const submit = async (e) => {
    e.preventDefault();
    try {
      if (editing) { await updateCategory(editing, form); toast.success('Category updated'); }
      else { await createCategory(form); toast.success('Category created'); }
      reset(); load();
    } catch (error) { toast.error(error.response?.data?.message || 'Could not save category'); }
  };
  const edit = (row) => { setEditing(row._id); setForm({ name: row.name, description: row.description || '', isActive: row.isActive }); };
  const remove = async (id) => { if (!window.confirm('Delete or deactivate this category?')) return; await deleteCategory(id); toast.success('Category removed/deactivated'); load(); };

  return (
    <div>
      <h1>Manage Categories</h1>
      <div className="row g-4">
        <div className="col-lg-4">
          <form onSubmit={submit} className="card border-0 shadow-sm p-4">
            <h5>{editing ? 'Edit Category' : 'Add Category'}</h5>
            <label className="form-label">Name</label><input className="form-control mb-3" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <label className="form-label">Description</label><textarea className="form-control mb-3" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows="4" />
            <div className="form-check mb-3"><input type="checkbox" className="form-check-input" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} /><label className="form-check-label">Active</label></div>
            <button className="btn btn-success">{editing ? 'Update' : 'Create'}</button>{editing && <button type="button" className="btn btn-light ms-2" onClick={reset}>Cancel</button>}
          </form>
        </div>
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm p-3">
            {loading ? <Loader /> : <DataTable rows={categories} columns={[
              { key: 'name', label: 'Name' },
              { key: 'description', label: 'Description' },
              { key: 'isActive', label: 'Status', render: (row) => <span className={`badge ${row.isActive ? 'bg-success' : 'bg-secondary'}`}>{row.isActive ? 'Active' : 'Inactive'}</span> },
              { key: 'actions', label: 'Actions', render: (row) => <div className="btn-group"><button className="btn btn-sm btn-outline-primary" onClick={() => edit(row)}>Edit</button><button className="btn btn-sm btn-outline-danger" onClick={() => remove(row._id)}>Delete</button></div> }
            ]} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCategories;
