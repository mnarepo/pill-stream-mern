import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { deleteUserAdmin, getUsers, updateUserAdmin } from '../../api/authApi';
import DataTable from '../../components/admin/DataTable';
import Loader from '../../components/common/Loader';
import formatDate from '../../utils/formatDate';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const load = async (term = search) => { setLoading(true); try { const { data } = await getUsers(term); setUsers(data.data.users); } finally { setLoading(false); } };
  useEffect(() => { load(''); }, []);

  const changeRole = async (user, role) => {
    try { await updateUserAdmin(user._id, { role }); toast.success('User role updated'); load(); } catch (error) { toast.error(error.response?.data?.message || 'Could not update user'); }
  };
  const remove = async (id) => { if (!window.confirm('Delete this user?')) return; try { await deleteUserAdmin(id); toast.success('User deleted'); load(); } catch (error) { toast.error(error.response?.data?.message || 'Could not delete user'); } };

  return (
    <div>
      <h1>Manage Users</h1>
      <div className="card border-0 shadow-sm p-3">
        <form className="input-group mb-3" onSubmit={(e) => { e.preventDefault(); load(search); }}><input className="form-control" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, email or phone" /><button className="btn btn-outline-success">Search</button></form>
        {loading ? <Loader /> : <DataTable rows={users} columns={[
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'phone', label: 'Phone' },
          { key: 'role', label: 'Role', render: (row) => <select className="form-select form-select-sm" value={row.role} onChange={(e) => changeRole(row, e.target.value)}><option value="customer">customer</option><option value="admin">admin</option></select> },
          { key: 'createdAt', label: 'Joined', render: (row) => formatDate(row.createdAt) },
          { key: 'actions', label: 'Actions', render: (row) => <button className="btn btn-sm btn-outline-danger" onClick={() => remove(row._id)}>Delete</button> }
        ]} />}
      </div>
    </div>
  );
};

export default ManageUsers;
