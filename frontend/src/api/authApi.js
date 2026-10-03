import api from './axiosInstance';

export const registerUser = (payload) => api.post('/auth/register', payload);
export const loginUser = (payload) => api.post('/auth/login', payload);
export const getLoggedInUser = () => api.get('/auth/me');
export const logoutUser = () => api.post('/auth/logout');
export const forgotPassword = (payload) => api.post('/auth/forgot-password', payload);
export const resetPassword = (payload) => api.post('/auth/reset-password', payload);
export const getProfile = () => api.get('/users/profile');
export const updateProfile = (payload) => api.put('/users/profile', payload);
export const getUsers = (search = '') => api.get(`/users?search=${encodeURIComponent(search)}`);
export const updateUserAdmin = (id, payload) => api.put(`/users/${id}`, payload);
export const deleteUserAdmin = (id) => api.delete(`/users/${id}`);
