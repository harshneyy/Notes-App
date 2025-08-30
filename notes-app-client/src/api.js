// src/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://my-notes-app-api.onrender.com/api',  // Your backend URL
});

// This is an interceptor. It runs before every request.
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            // If a token exists, add it to the Authorization header
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;