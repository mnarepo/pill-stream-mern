import { NavLink } from 'react-router-dom';
import { FaBox, FaChartBar, FaClipboardList, FaEnvelope, FaHome, FaTags, FaUsers } from 'react-icons/fa';

const links = [
  ['Dashboard', '/admin/dashboard', FaHome],
  ['Products', '/admin/products', FaBox],
  ['Categories', '/admin/categories', FaTags],
  ['Users', '/admin/users', FaUsers],
  ['Orders', '/admin/orders', FaClipboardList],
  ['Reports', '/admin/reports', FaChartBar],
  ['Messages', '/admin/contact-messages', FaEnvelope]
];

const AdminSidebar = () => (
  <aside className="admin-sidebar">
    <h5 className="px-3 py-3 mb-0">Pill Stream Admin</h5>
    <nav className="nav flex-column">
      {links.map(([label, to, Icon]) => (
        <NavLink key={to} to={to} className="nav-link admin-link"><Icon /> <span>{label}</span></NavLink>
      ))}
    </nav>
  </aside>
);

export default AdminSidebar;
