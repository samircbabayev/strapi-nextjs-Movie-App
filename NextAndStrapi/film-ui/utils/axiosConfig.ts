import axios, { AxiosInstance } from 'axios';

// Create a new Axios instance with custom configurations
const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:1337/api/', 
  timeout: 10000, // Timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
