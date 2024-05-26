import { request } from '../utils/request';

export const getCompanyProfile = async (accountId) => {
  // try {
  //   const response = await request.get('/auth/token/verify',
  //     {
  //       headers: {
  //         'Authorization': `Bearer ${accessToken}`
  //       }
  //     }
  //   );
  //   return response.data;
  // } catch (error) {
  //   if (error.response) {
  //     console.error('Backend responded with an error:', error.response.data);
  //   } else {
  //     console.error('Token verification failed', error.message);
  //   }
  //   return null
  // }
  const response = await request.get('/company/profile', accountId);
  return response;
};

export const createCompanyProfile = async (profile, { headers }) => {
  const response = await request.post('/company/profile/new', profile, { headers });
  console.log(response)
  return response;
};

