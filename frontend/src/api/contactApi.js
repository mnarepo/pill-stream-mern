import api from './axiosInstance';

export const submitContact = (payload) => api.post('/contact', payload);
export const getContactMessages = () => api.get('/contact');
export const updateContactStatus = (id, status) => api.put(`/contact/${id}/status`, { status });
export const deleteContactMessage = (id) => api.delete(`/contact/${id}`);
