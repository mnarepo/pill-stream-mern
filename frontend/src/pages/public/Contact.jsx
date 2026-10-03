import { useState } from 'react';
import { toast } from 'react-toastify';
import { submitContact } from '../../api/contactApi';

const initialForm = { name: '', email: '', subject: '', message: '' };

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitContact(form);
      toast.success('Message sent successfully');
      setForm(initialForm);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container py-5">
      <div className="row g-4">
        <div className="col-lg-5">
          <h1>Contact BISMILLAH Pharmacy</h1>
          <p className="text-muted">Send your query to pharmacy admin. Admin can view and update contact message status from the admin panel.</p>
          <div className="card border-0 shadow-sm p-4">
            <p><strong>Email:</strong> info@pillstream.com</p>
            <p><strong>Phone:</strong> +92 300 0000000</p>
            <p><strong>Address:</strong> BISMILLAH Pharmacy, Lahore, Pakistan</p>
          </div>
        </div>
        <div className="col-lg-7">
          <form onSubmit={submit} className="card border-0 shadow-sm p-4">
            <div className="row g-3">
              <div className="col-md-6"><label className="form-label">Name</label><input name="name" value={form.name} onChange={change} required className="form-control" /></div>
              <div className="col-md-6"><label className="form-label">Email</label><input name="email" value={form.email} onChange={change} type="email" required className="form-control" /></div>
              <div className="col-12"><label className="form-label">Subject</label><input name="subject" value={form.subject} onChange={change} required className="form-control" /></div>
              <div className="col-12"><label className="form-label">Message</label><textarea name="message" value={form.message} onChange={change} required minLength="10" rows="5" className="form-control" /></div>
              <div className="col-12"><button disabled={loading} className="btn btn-success">{loading ? 'Sending...' : 'Send Message'}</button></div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
