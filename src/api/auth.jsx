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

export const verifyAccessToken = async (accessToken) => {
  try {
    const response = await request.get('/auth/token/verify',
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Backend responded with an error:', error.response.data);
    } else {
      console.error('Token verification failed', error.message);
    }
    return null
  }

}