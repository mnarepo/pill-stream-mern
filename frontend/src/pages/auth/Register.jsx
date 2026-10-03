import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', address: '', city: '' });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) return toast.error('Password must be at least 6 characters');
    setLoading(true);
    try {
      await register(form);
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-section">
      <form onSubmit={submit} className="auth-card auth-card-wide">
        <h2>Create Account</h2>
        <p className="text-muted">Register as a customer to order medicines.</p>
        <div className="row g-3">
          <div className="col-md-6"><label className="form-label">Name</label><input name="name" value={form.name} onChange={change} required className="form-control" /></div>
          <div className="col-md-6"><label className="form-label">Email</label><input name="email" type="email" value={form.email} onChange={change} required className="form-control" /></div>
          <div className="col-md-6"><label className="form-label">Password</label><input name="password" type="password" value={form.password} onChange={change} required minLength="6" className="form-control" /></div>
          <div className="col-md-6"><label className="form-label">Phone</label><input name="phone" value={form.phone} onChange={change} className="form-control" /></div>
          <div className="col-md-6"><label className="form-label">City</label><input name="city" value={form.city} onChange={change} className="form-control" /></div>
          <div className="col-md-6"><label className="form-label">Address</label><input name="address" value={form.address} onChange={change} className="form-control" /></div>
          <div className="col-12"><button disabled={loading} className="btn btn-success w-100">{loading ? 'Creating...' : 'Register'}</button></div>
        </div>
        <p className="mt-3 small text-center">Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </section>
  );
};

export default Register;
