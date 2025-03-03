import axios from 'axios';
import * as authApi from '../api/authenticate'

export const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 100000,
  withCredentials: true
});

// Allow setting setAccessToken from context
let updateAccessToken = null;

export const setUpdateAccessToken = (fn) => {
  updateAccessToken = fn;
};

// Add an interceptor to refresh tokens
request.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const newAccessToken = await authApi.refreshAccessToken();
        if (newAccessToken) {
        updateAccessToken(newAccessToken); // ✅ Update token in context
        // Retry original request with new token
        error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axios(error.config);
        };
      } catch (refreshError) {
        console.error("Refresh token failed");
        updateAccessToken(null);
      }
    }
    return Promise.reject(error);
  }
);

