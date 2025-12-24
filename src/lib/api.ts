import axios, { type AxiosInstance } from "axios";

const apiUrl = import.meta.env.VITE_AGROSCOPE_API_URL;

export const api: AxiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 30000,
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
