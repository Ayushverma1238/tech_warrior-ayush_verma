import axios from "axios";

const API = axios.create({
    baseURL: "https://finflow-gg7q.onrender.com",
});

// Request interceptor
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// Response interceptor
API.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response?.status === 401) {
            console.log("Unauthorized -> redirect to login");
        }
        return Promise.reject(err);
    }
);

export default API;