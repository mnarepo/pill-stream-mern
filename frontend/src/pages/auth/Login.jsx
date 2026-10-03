import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(form);
      const redirect = location.state?.from?.pathname || (user.role === 'admin' ? '/admin/dashboard' : '/');
      navigate(redirect);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-section">
      <form onSubmit={submit} className="auth-card">
        <h2>Login</h2>
        <p className="text-muted">Access your Pill Stream account.</p>
        <label className="form-label">Email</label>
        <input type="email" className="form-control mb-3" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <label className="form-label">Password</label>
        <input type="password" className="form-control mb-3" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <button disabled={loading} className="btn btn-success w-100">{loading ? 'Logging in...' : 'Login'}</button>
        <div className="d-flex justify-content-between mt-3 small">
          <Link to="/forgot-password">Forgot password?</Link>
          <Link to="/register">Create account</Link>
        </div>
      </form>
    </section>
  );
};

export default Login;
