import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';
import ProtectedRoute from '../components/common/ProtectedRoute';
import AdminRoute from '../components/common/AdminRoute';
import Home from '../pages/public/Home';
import About from '../pages/public/About';
import Contact from '../pages/public/Contact';
import Products from '../pages/public/Products';
import ProductDetails from '../pages/public/ProductDetails';
import CategoryProducts from '../pages/public/CategoryProducts';
import SearchResults from '../pages/public/SearchResults';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';
import Cart from '../pages/customer/Cart';
import Checkout from '../pages/customer/Checkout';
import MyOrders from '../pages/customer/MyOrders';
import OrderDetails from '../pages/customer/OrderDetails';
import Profile from '../pages/customer/Profile';
import Dashboard from '../pages/admin/Dashboard';
import ManageProducts from '../pages/admin/ManageProducts';
import AddProduct from '../pages/admin/AddProduct';
import EditProduct from '../pages/admin/EditProduct';
import ManageCategories from '../pages/admin/ManageCategories';
import ManageUsers from '../pages/admin/ManageUsers';
import ManageOrders from '../pages/admin/ManageOrders';
import OrderDetailsAdmin from '../pages/admin/OrderDetailsAdmin';
import Reports from '../pages/admin/Reports';
import ContactMessages from '../pages/admin/ContactMessages';

const AppRoutes = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:slug" element={<ProductDetails />} />
      <Route path="/category/:slug" element={<CategoryProducts />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
      <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
      <Route path="/my-orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
      <Route path="/my-orders/:id" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
    </Route>
    <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
      <Route index element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="products" element={<ManageProducts />} />
      <Route path="products/add" element={<AddProduct />} />
      <Route path="products/edit/:id" element={<EditProduct />} />
      <Route path="categories" element={<ManageCategories />} />
      <Route path="users" element={<ManageUsers />} />
      <Route path="orders" element={<ManageOrders />} />
      <Route path="orders/:id" element={<OrderDetailsAdmin />} />
      <Route path="reports" element={<Reports />} />
      <Route path="contact-messages" element={<ContactMessages />} />
    </Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;
