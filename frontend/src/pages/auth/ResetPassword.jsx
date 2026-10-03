import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { resetPassword } from '../../api/authApi';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await resetPassword({ token, password });
      toast.success('Password reset successful');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Reset failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-section">
      <form onSubmit={submit} className="auth-card">
        <h2>Reset Password</h2>
        <input type="password" className="form-control mb-3" minLength="6" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="New password" />
        <button disabled={loading} className="btn btn-success w-100">{loading ? 'Saving...' : 'Reset Password'}</button>
      </form>
    </section>
  );
};

export default ResetPassword;
