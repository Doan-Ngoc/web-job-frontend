import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { useAuth } from '../hooks/useAuth';
import * as authApi from '../api/authenticate'
import { useState } from 'react';

export const request = axios.create({
  baseURL: 'http://localhost:3000',
  // baseURL: "https://job-connect-api.onrender.com",
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 100000,
  withCredentials: true
});

// Attach access token to requests
// request.interceptors.request.use((config) => {
//   const {accessToken} = useAuth();
//   if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//   }
//   return config;
// });
//----------
// Store setAccessToken globally

// export const setAuthToken = (token) => {
//   if (token) {
//     request.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   } else {
//     delete request.defaults.headers.common["Authorization"];
//   }
// };

// let [authToken, setAuthToken] = useState()

// request.interceptors.request.use((config) => {
//   if (accessToken) {
//     config.headers["Authorization"] = `Bearer ${accessToken}`;
//   } else {
//     delete config.headers["Authorization"];
//   }
//   return config;
// });

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
        // setAuthToken(newAccessToken);
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

//Reissue access token when expired
// request.interceptors.response.use(
//   (response) => response, // Return response if no error
//   async (error) => {
//       if (error.response?.status === 401) {
//           try {
//               const {setAccessToken} = useAuth();
//               const newAccessToken = await authApi.refreshAccessToken(setAccessToken);
//               error.config.headers.Authorization = `Bearer ${newAccessToken}`;
//               return axios(error.config); // Retry request
//           } catch (err) {
//               console.error("Session expired. Please log in again.");
//               return Promise.reject(err);
//           }
//       }
//       return Promise.reject(error);
//   }
// );

// request.interceptors.request.use(async (config) => {
//   if (config.url === '/auth/logout' || config.url === '/auth/token/refresh') {
//     return config;
//   }
//   let accessToken = localStorage.getItem('accessToken');
// //   // Check if access token is expired and refresh it if needed
// if (accessToken) {
//   if (isTokenExpired(accessToken)) {
//     const response = await authApi.refreshAccessToken()
//   }
// }
//   return config;
// });

// // Function to check if the token is expired
// function isTokenExpired(token) {
//   try {
//     const decodedToken = jwtDecode(token);
//     const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
//     // Check if the token has expired
//     return decodedToken.exp < currentTime;
//   } catch (error) {
//     console.error("Failed to decode token:", error);
//     return true;
//   }
// }
