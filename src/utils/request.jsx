import axios from 'axios';
import { store } from '../store/index';

export const request = axios.create({
  baseURL: 'http://localhost:3000',
  // baseURL: "https://job-board-api-ruddy.vercel.app",
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 100000,
  withCredentials: true
});

request.interceptors.request.use(async (config) => {
  if (config.url === '/auth/logout' && config.method === 'post') {
    return config;
  }
  let accessToken = localStorage.getItem('accessToken');
//   // Check if access token is expired and refresh it if needed
if (accessToken) {
  if (isTokenExpired(accessToken)) {
    const response = await axios.post('http://localhost:3000/auth/token/refresh');
    accessToken = response.data.accessToken;
    localStorage.setItem('accessToken', accessToken);
  }

  config.headers['Authorization'] = `Bearer ${accessToken}`;
}
  return config;
});

// // Function to check if the token is expired
function isTokenExpired(token) {
  if (!token) return true;
  return false
}
