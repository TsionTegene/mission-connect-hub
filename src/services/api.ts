// src/services/api.ts
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // set to true if using cookies for auth
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


export const api = {
  get: <T = any>(url: string) => instance.get<T>(url).then(res => res.data),
  post: <T = any>(url: string, data?: any, p0?: { headers: { Authorization: string; }; }) => instance.post<T>(url, data).then(res => res.data),
  put: <T = any>(url: string, data?: any, p0?: { headers: { Authorization: string; }; }) => instance.put<T>(url, data).then(res => res.data),
  delete: <T = any>(url: string, p0: { headers: { Authorization: string; }; }) => instance.delete<T>(url).then(res => res.data),
};
// api.interceptors.response.use(
//   response => response,
//   error => {
//     if (
//       error.response?.status === 403 &&
//       error.response?.data?.message === "Invalid Token"
//     ) {
//       localStorage.removeItem("adminToken");
//       localStorage.removeItem("adminUser");
//       window.location.href = "/admin/login";
//     }
//     return Promise.reject(error);
//   }
// );
