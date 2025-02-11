import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
console.log("base", baseURL);
const authSessionKey = "__AUTH_KEY__";
const redirectRoute = "/auth/sign-in";

const httpClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    tenant: "root",
  },
});

httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(authSessionKey);
    if (token) {
      config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(authSessionKey);
      window.location.href = redirectRoute;
    }
    return Promise.reject(error);
  }
);

export default httpClient;
