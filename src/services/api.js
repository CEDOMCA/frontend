import axios from 'axios';

export const api = axios.create({
  withCredentials: true,
  credentials: 'omit',
  baseURL: 'https://web-production-8fea.up.railway.app',
});

export const createSession = async (email, password) => api.post('/auth/login', { email, password });

export const deleteSession = async () => api.post('/auth/logout', {});

export const createUser = async (options) => api.post('/users', options);

export const getUsers = async () => api.get('/users');

export const deleteUser = async (id) => api.delete(`/users/${id}`);

export const getUserId = async (id) => api.get(`/users/${id}`);

export const updateUserId = async (id, data) => api.put(`/users/${id}`, data);

export const getFonts = async () => api.get('/fonts');

export const deleteFont = async (id) => api.delete(`/fonts/${id}`);

export const getFontId = async (id) => api.get(`/fonts/${id}`);

export const updateFontId = async (id, data) => api.put(`/fonts/${id}`, data);

export const createFont = async (data) => api.post('/fonts', data);
