import axios from "axios";

export const api = axios.create({
    withCredentials: true,
    credentials: 'omit',
    baseURL: "https://web-production-8fea.up.railway.app",
})

export const createSession = async (email, password) => {
    return api.post('/auth/login', { email, password });
}

export const deleteSession = async () => {
    return api.post('/auth/logout', {});
}

export const createUser = async (options) => {
    return api.post('/users', options);
}

export const getUsers = async () => {
    return api.get('/users');
}

export const getFonts = async () => {
    return api.get('/fonts');
}




export const deleteFont = async (id) => {
    return api.delete(`/fonts/${id}`);
}

export const getFontId = async (id) => {
    return api.get(`/fonts/${id}`);
}

export const updateFontId = async (id, data) => {
    return api.put(`/fonts/${id}`, data);
}

export const createFont = async (data) => {
    return api.post('/fonts', data);
}



