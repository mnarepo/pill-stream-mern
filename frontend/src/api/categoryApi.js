import api from './axiosInstance';

export const getCategories = () => api.get('/categories');
export const getAdminCategories = () => api.get('/categories/admin/all');
export const getCategoryBySlug = (slug) => api.get(`/categories/${slug}`);
export const createCategory = (payload) => api.post('/categories', payload);
export const updateCategory = (id, payload) => api.put(`/categories/${id}`, payload);
export const deleteCategory = (id) => api.delete(`/categories/${id}`);
