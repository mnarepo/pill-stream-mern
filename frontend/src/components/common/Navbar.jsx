import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUserShield } from 'react-icons/fa';
import { getCategories } from '../../api/categoryApi';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import logo from '../../assets/logo/pill-stream-logo.svg';

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    getCategories().then(({ data }) => setCategories(data.data.categories)).catch(() => setCategories([]));
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white sticky-top border-bottom shadow-sm">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="Pill Stream" height="42" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/products">Products</NavLink></li>
            <li className="nav-item dropdown">
              <button className="nav-link dropdown-toggle btn btn-link" data-bs-toggle="dropdown">Categories</button>
              <ul className="dropdown-menu">
                {categories.map((category) => (
                  <li key={category._id}><Link className="dropdown-item" to={`/category/${category.slug}`}>{category.name}</Link></li>
                ))}
              </ul>
            </li>
            <li className="nav-item"><NavLink className="nav-link" to="/about">About</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/contact">Contact</NavLink></li>
          </ul>
          <div className="d-flex align-items-center gap-2">
            <NavLink className="btn btn-outline-success position-relative" to="/cart">
              <FaShoppingCart /> Cart
              {cartCount > 0 && <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{cartCount}</span>}
            </NavLink>
            {isAdmin && <NavLink className="btn btn-primary" to="/admin/dashboard"><FaUserShield /> Admin</NavLink>}
            {!isAuthenticated ? (
              <>
                <NavLink className="btn btn-outline-primary" to="/login">Login</NavLink>
                <NavLink className="btn btn-success" to="/register">Register</NavLink>
              </>
            ) : (
              <div className="dropdown">
                <button className="btn btn-light dropdown-toggle" data-bs-toggle="dropdown">{user?.name}</button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                  <li><Link className="dropdown-item" to="/my-orders">My Orders</Link></li>
                  <li><button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button></li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
