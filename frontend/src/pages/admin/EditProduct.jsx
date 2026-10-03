import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAdminCategories } from '../../api/categoryApi';
import { getAdminProductById, updateProduct } from '../../api/productApi';
import Loader from '../../components/common/Loader';

const toDate = (date) => date ? new Date(date).toISOString().slice(0, 10) : '';
const toFormData = (form, image) => {
  const data = new FormData();
  Object.entries(form).forEach(([key, value]) => data.append(key, value));
  if (image) data.append('image', image);
  return data;
};

const EditProduct = () => {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([getAdminCategories(), getAdminProductById(id)])
      .then(([catRes, prodRes]) => {
        setCategories(catRes.data.data.categories);
        const p = prodRes.data.data.product;
        setForm({
          name: p.name || '', category: p.category?._id || p.category || '', description: p.description || '', price: p.price || '', oldPrice: p.oldPrice || '', brand: p.brand || '', dosage: p.dosage || '', packSize: p.packSize || '', stock: p.stock || '', requiresPrescription: p.requiresPrescription, expiryDate: toDate(p.expiryDate), batchNumber: p.batchNumber || '', manufacturer: p.manufacturer || '', isActive: p.isActive, featured: p.featured
        });
      }).finally(() => setLoading(false));
  }, [id]);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });
  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProduct(id, toFormData(form, image));
      toast.success('Product updated');
      navigate('/admin/products');
    } catch (error) { toast.error(error.response?.data?.message || 'Could not update product'); }
    finally { setSaving(false); }
  };

  if (loading || !form) return <Loader />;
  return <div><h1>Edit Product</h1><ProductForm form={form} categories={categories} change={change} setImage={setImage} submit={submit} loading={saving} /></div>;
};

const ProductForm = ({ form, categories, change, setImage, submit, loading }) => (
  <form onSubmit={submit} className="card border-0 shadow-sm p-4">
    <div className="row g-3">
      <div className="col-md-6"><label className="form-label">Product Name</label><input name="name" value={form.name} onChange={change} required className="form-control" /></div>
      <div className="col-md-6"><label className="form-label">Category</label><select name="category" value={form.category} onChange={change} required className="form-select">{categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}</select></div>
      <div className="col-md-3"><label className="form-label">Price</label><input name="price" type="number" min="0" value={form.price} onChange={change} required className="form-control" /></div>
      <div className="col-md-3"><label className="form-label">Old Price</label><input name="oldPrice" type="number" min="0" value={form.oldPrice} onChange={change} className="form-control" /></div>
      <div className="col-md-3"><label className="form-label">Stock</label><input name="stock" type="number" min="0" value={form.stock} onChange={change} required className="form-control" /></div>
      <div className="col-md-3"><label className="form-label">Replace Image</label><input type="file" accept="image/png,image/jpeg,image/jpg,image/webp" onChange={(e) => setImage(e.target.files[0])} className="form-control" /></div>
      <div className="col-md-4"><label className="form-label">Brand</label><input name="brand" value={form.brand} onChange={change} className="form-control" /></div>
      <div className="col-md-4"><label className="form-label">Dosage</label><input name="dosage" value={form.dosage} onChange={change} className="form-control" /></div>
      <div className="col-md-4"><label className="form-label">Pack Size</label><input name="packSize" value={form.packSize} onChange={change} className="form-control" /></div>
      <div className="col-md-4"><label className="form-label">Manufacturer</label><input name="manufacturer" value={form.manufacturer} onChange={change} className="form-control" /></div>
      <div className="col-md-4"><label className="form-label">Batch Number</label><input name="batchNumber" value={form.batchNumber} onChange={change} className="form-control" /></div>
      <div className="col-md-4"><label className="form-label">Expiry Date</label><input name="expiryDate" type="date" value={form.expiryDate || ''} onChange={change} className="form-control" /></div>
      <div className="col-12"><label className="form-label">Description</label><textarea name="description" rows="4" value={form.description} onChange={change} required className="form-control" /></div>
      <div className="col-md-4 form-check ms-2"><input className="form-check-input" type="checkbox" name="requiresPrescription" checked={Boolean(form.requiresPrescription)} onChange={change} /><label className="form-check-label">Requires Prescription</label></div>
      <div className="col-md-3 form-check"><input className="form-check-input" type="checkbox" name="isActive" checked={Boolean(form.isActive)} onChange={change} /><label className="form-check-label">Active</label></div>
      <div className="col-md-3 form-check"><input className="form-check-input" type="checkbox" name="featured" checked={Boolean(form.featured)} onChange={change} /><label className="form-check-label">Featured</label></div>
      <div className="col-12"><button disabled={loading} className="btn btn-success">{loading ? 'Saving...' : 'Update Product'}</button></div>
    </div>
  </form>
);

export default EditProduct;
