import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import * as authApi from '../api/authenticate'

export const request = axios.create({
  // baseURL: 'http://localhost:3000',
  baseURL: "https://job-connect-api.onrender.com",
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 100000,
  withCredentials: true
});

request.interceptors.request.use(async (config) => {
  if (config.url === '/auth/logout' || config.url === '/auth/token/refresh') {
    return config;
  }
  let accessToken = localStorage.getItem('accessToken');
//   // Check if access token is expired and refresh it if needed
if (accessToken) {
  if (isTokenExpired(accessToken)) {
    const response = await authApi.refreshAccessToken()
  }
}
  return config;
});

// Function to check if the token is expired
function isTokenExpired(token) {
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    // Check if the token has expired
    return decodedToken.exp < currentTime;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return true;
  }
}
