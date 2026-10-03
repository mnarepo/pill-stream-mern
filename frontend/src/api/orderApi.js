import api from './axiosInstance';

export const createOrder = (formData) => api.post('/orders', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const getMyOrders = () => api.get('/orders/my-orders');
export const getOrderById = (id) => api.get(`/orders/${id}`);
export const getAllOrders = (params = {}) => api.get('/orders', { params });
export const updateOrderStatus = (id, orderStatus) => api.put(`/orders/${id}/status`, { orderStatus });
export const updatePaymentStatus = (id, paymentStatus) => api.put(`/orders/${id}/payment-status`, { paymentStatus });
export const cancelOrderAdmin = (id) => api.delete(`/orders/${id}`);
