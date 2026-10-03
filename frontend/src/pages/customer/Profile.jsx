import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '', city: user?.city || '', address: user?.address || '' });
  const [loading, setLoading] = useState(false);
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(form);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container py-5">
      <h1>My Profile</h1>
      <form onSubmit={submit} className="card border-0 shadow-sm p-4">
        <div className="row g-3">
          <div className="col-md-6"><label className="form-label">Name</label><input name="name" value={form.name} onChange={change} required className="form-control" /></div>
          <div className="col-md-6"><label className="form-label">Email</label><input name="email" type="email" value={form.email} onChange={change} required className="form-control" /></div>
          <div className="col-md-6"><label className="form-label">Phone</label><input name="phone" value={form.phone} onChange={change} className="form-control" /></div>
          <div className="col-md-6"><label className="form-label">City</label><input name="city" value={form.city} onChange={change} className="form-control" /></div>
          <div className="col-12"><label className="form-label">Address</label><textarea name="address" value={form.address} onChange={change} rows="3" className="form-control" /></div>
          <div className="col-12"><button disabled={loading} className="btn btn-success">{loading ? 'Saving...' : 'Save Changes'}</button></div>
        </div>
      </form>
    </section>
  );
};

export default Profile;
