import { useState } from 'react';
import { toast } from 'react-toastify';
import { forgotPassword } from '../../api/authApi';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await forgotPassword({ email });
      setResult(data.data);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Request failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-section">
      <form onSubmit={submit} className="auth-card">
        <h2>Forgot Password</h2>
        <p className="text-muted">Enter your email to receive reset instructions.</p>
        <input type="email" className="form-control mb-3" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button disabled={loading} className="btn btn-success w-100">{loading ? 'Sending...' : 'Send Reset Link'}</button>
        {result?.resetUrl && <div className="alert alert-info mt-3 small">Development reset link: <a href={result.resetUrl}>{result.resetUrl}</a></div>}
      </form>
    </section>
  );
};

export default ForgotPassword;
