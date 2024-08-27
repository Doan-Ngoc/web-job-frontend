import { request } from '../utils/request';

export const signup = async (data) => {
  const response = await request.post('/auth/signup', data);
  return response;
};

export const signin = async (data) => {
  const response = await request.post('/auth/login', data);
  return response;
};

export const signout = async () => {
  const response = await request.post('/auth/logout', {}, { withCredentials: true });
  return response;
};

export const refreshAccessToken = async () => {
  try {
  const response = await request.post('/auth/token/refresh', {}, { withCredentials: true });
  const newAccessToken = response.data.accessToken;
    localStorage.setItem('accessToken', newAccessToken);
  } catch (error) {
    console.error('Token reissue failed')
  }
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
