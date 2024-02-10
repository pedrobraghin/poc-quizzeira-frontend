import axios from "axios";

axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || process.env.API_URL,
});

export default api;
