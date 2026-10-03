import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import Navbar from '../components/common/Navbar';

const AdminLayout = () => (
  <>
    <Navbar />
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-content"><Outlet /></main>
    </div>
  </>
);

export default AdminLayout;
