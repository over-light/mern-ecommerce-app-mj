import axios, { AxiosInstance } from 'axios';

interface MyAxiosInstance extends AxiosInstance { }

const axiosInstance: MyAxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            // handle unauthorized access error
        } else if (error.response.status === 404) {
            // handle not found error
        } else {
            // handle other errors
        }
        return Promise.reject(error);
    }
);
export default axiosInstance;