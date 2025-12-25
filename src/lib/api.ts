import axios, { type AxiosInstance } from "axios";

const apiUrl = import.meta.env.VITE_AGROSCOPE_API_URL;

export const api: AxiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 30000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("AgroAccessToken");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("AgroAccessToken");
      localStorage.removeItem("AgroScopeUser");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
