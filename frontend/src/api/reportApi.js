import api from './axiosInstance';

export const getDashboardReport = () => api.get('/reports/dashboard');
export const getSalesReport = (params = {}) => api.get('/reports/sales', { params });
export const getTopProducts = () => api.get('/reports/top-products');
export const getMonthlySales = (year) => api.get('/reports/monthly-sales', { params: year ? { year } : {} });
export const getInvoiceUrl = (orderId) => `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}/reports/invoice/${orderId}`;
