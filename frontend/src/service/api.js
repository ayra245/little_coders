import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", 
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export const register = (data) => api.post("/auth/register", data);

export const login = (data) => api.post("/auth/login", data);

export const forgotPassword = (email) =>
  api.post("/auth/forgot-password", { email });

export const resetPassword = (token, password) =>
  api.post(`/auth/reset-password/${token}`, { password });

export default api;
