import api from './axiosInstance';

export const getCartApi = () => api.get('/cart');
export const addToCartApi = (productId, quantity = 1) => api.post('/cart/add', { productId, quantity });
export const updateCartItemApi = (productId, quantity) => api.put(`/cart/update/${productId}`, { quantity });
export const removeCartItemApi = (productId) => api.delete(`/cart/remove/${productId}`);
export const clearCartApi = () => api.delete('/cart/clear');
