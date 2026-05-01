import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

// Inject token dari localStorage ke setiap request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("fl_token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// Kalau 401, redirect ke pilargroup
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("fl_token");
      localStorage.removeItem("fl_user");
      window.location.href = "https://pilargroup.id";
    }
    return Promise.reject(err);
  }
);

export default api;