import axios from "axios";

const api = axios.create({
  baseURL: "https://library-management-backend-j1xz.onrender.com",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;