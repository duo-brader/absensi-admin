import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
// axios.defaults.baseURL = "http://127.0.0.1:8000";
axios.defaults.withCredentials = true;

const token = localStorage.getItem("access_token");

if (token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export default axios;
