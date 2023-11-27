import axios from "axios";

// axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.baseURL = "http://127.0.0.1:8000";
axios.defaults.withCredentials = true;

const token = localStorage.getItem("access_token");

if (token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    console.error(error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    // Do something with response error
    console.error(error);
    return Promise.reject(error);
  }
);

export default axios;
