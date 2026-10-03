import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { deleteContactMessage, getContactMessages, updateContactStatus } from '../../api/contactApi';
import DataTable from '../../components/admin/DataTable';
import Loader from '../../components/common/Loader';
import formatDate from '../../utils/formatDate';

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const load = async () => { setLoading(true); try { const { data } = await getContactMessages(); setMessages(data.data.messages); } finally { setLoading(false); } };
  useEffect(() => { load(); }, []);
  const updateStatus = async (id, status) => { await updateContactStatus(id, status); toast.success('Status updated'); load(); };
  const remove = async (id) => { if (!window.confirm('Delete this message?')) return; await deleteContactMessage(id); toast.success('Message deleted'); load(); };

  return (
    <div>
      <h1>Contact Messages</h1>
      <div className="card border-0 shadow-sm p-3">
        {loading ? <Loader /> : <DataTable rows={messages} columns={[
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'subject', label: 'Subject' },
          { key: 'message', label: 'Message', render: (row) => <span className="small">{row.message}</span> },
          { key: 'status', label: 'Status', render: (row) => <select className="form-select form-select-sm" value={row.status} onChange={(e) => updateStatus(row._id, e.target.value)}><option>New</option><option>Read</option><option>Replied</option></select> },
          { key: 'createdAt', label: 'Date', render: (row) => formatDate(row.createdAt) },
          { key: 'actions', label: 'Actions', render: (row) => <button className="btn btn-sm btn-outline-danger" onClick={() => remove(row._id)}>Delete</button> }
        ]} />}
      </div>
    </div>
  );
};

export default ContactMessages;
