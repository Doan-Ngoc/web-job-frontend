import { request } from '../utils/request';

export const signup = async (data) => {
  const response = await request.post('/auth/signup', data);
  return response;
};

export const signin = async (data) => {
  const response = await request.post('/auth/signin', data);
  return response;
};

export const getAccessToken = async (refreshToken) => {
  const response = await request.post('/auth/token', { refreshToken });
  return response;
};
