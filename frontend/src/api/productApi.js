import api from './axiosInstance';

export const getProducts = (params = {}) => api.get('/products', { params });
export const getFeaturedProducts = () => api.get('/products/featured');
export const getProductBySlug = (slug) => api.get(`/products/${slug}`);
export const getAdminProducts = (search = '') => api.get(`/products/admin/all?search=${encodeURIComponent(search)}`);
export const getAdminProductById = (id) => api.get(`/products/admin/${id}`);
export const createProduct = (formData) => api.post('/products', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const updateProduct = (id, formData) => api.put(`/products/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const deleteProduct = (id) => api.delete(`/products/${id}`);
