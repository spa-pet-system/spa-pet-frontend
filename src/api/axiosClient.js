import axios from 'axios';
// import { getToken } from '~/auth/token';

// const axiosClient = axios.create({
//   baseURL: 'http://localhost:3000',
// });

// axiosClient.interceptors.request.use((config) => {
//   const token = getToken();
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

const axiosClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true // 💡 Phải có dòng này để gửi cookie
});


export default axiosClient;
