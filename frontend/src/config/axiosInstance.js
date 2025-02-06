import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://ainoteapi.vercel.app/", // Your API base URL
  withCredentials: true, // Ensures credentials like cookies are sent with requests
  timeout: 5000, // Timeout in milliseconds (e.g., 5000ms = 5 seconds)
});

export default axiosInstance;
