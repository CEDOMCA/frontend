import axios from "axios";

export const api = axios.create({
    withCredentials: true,
    credentials: 'omit',
    baseURL: "http://localhost:3000",
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

