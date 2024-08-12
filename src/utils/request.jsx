import axios from 'axios';
import { store } from '../store/index';

export const request = axios.create({
  // baseURL: 'http://localhost:3000',
  baseURL: "https://job-board-api-ruddy.vercel.app",
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 100000,
});

request.interceptors.request.use((config) => {
  const authState = store.getState().auth;
  if (authState.isLogined) {
    config.headers.Authorization = `Bearer ${authState.token}`;
  }
  return config;
});
