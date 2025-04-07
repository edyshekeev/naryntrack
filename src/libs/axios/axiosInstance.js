import { BASE_API } from '@/config';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: BASE_API,  // Replace with your API base URL
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;