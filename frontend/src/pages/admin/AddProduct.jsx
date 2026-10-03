import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAdminCategories } from '../../api/categoryApi';
import { createProduct } from '../../api/productApi';

const initialForm = {
  name: '', category: '', description: '', price: '', oldPrice: '', brand: '', dosage: '', packSize: '', stock: '', requiresPrescription: false, expiryDate: '', batchNumber: '', manufacturer: '', isActive: true, featured: false
};

const toFormData = (form, image) => {
  const data = new FormData();
  Object.entries(form).forEach(([key, value]) => data.append(key, value));
  if (image) data.append('image', image);
  return data;
};

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => { getAdminCategories().then(({ data }) => setCategories(data.data.categories)); }, []);
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createProduct(toFormData(form, image));
      toast.success('Product added');
      navigate('/admin/products');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not create product');
    } finally { setLoading(false); }
  };

  return (
    <div><h1>Add Product</h1><ProductForm form={form} categories={categories} change={change} setImage={setImage} submit={submit} loading={loading} /></div>
  );
};

const ProductForm = ({ form, categories, change, setImage, submit, loading }) => (
  <form onSubmit={submit} className="card border-0 shadow-sm p-4">
    <div className="row g-3">
      <div className="col-md-6"><label className="form-label">Product Name</label><input name="name" value={form.name} onChange={change} required className="form-control" /></div>
      <div className="col-md-6"><label className="form-label">Category</label><select name="category" value={form.category} onChange={change} required className="form-select"><option value="">Select category</option>{categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}</select></div>
      <div className="col-md-3"><label className="form-label">Price</label><input name="price" type="number" min="0" value={form.price} onChange={change} required className="form-control" /></div>
      <div className="col-md-3"><label className="form-label">Old Price</label><input name="oldPrice" type="number" min="0" value={form.oldPrice} onChange={change} className="form-control" /></div>
      <div className="col-md-3"><label className="form-label">Stock</label><input name="stock" type="number" min="0" value={form.stock} onChange={change} required className="form-control" /></div>
      <div className="col-md-3"><label className="form-label">Image</label><input type="file" accept="image/png,image/jpeg,image/jpg,image/webp" onChange={(e) => setImage(e.target.files[0])} className="form-control" /></div>
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
      <div className="col-12"><button disabled={loading} className="btn btn-success">{loading ? 'Saving...' : 'Save Product'}</button></div>
    </div>
  </form>
);

export default AddProduct;
