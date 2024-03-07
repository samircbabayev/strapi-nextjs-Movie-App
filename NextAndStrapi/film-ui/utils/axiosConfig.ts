import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

// Create a new Axios instance with custom configurations
const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:1337/api/",
  timeout: 10000, // Timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to add the Bearer token to each request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
