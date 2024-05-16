import { request } from '../utils/request';

export const getCompanyProfile = async () => {
  const response = await request.get('/company');
  return response;
};

export const createCompanyProfile = async (profile) => {
  const response = await request.post('/company/profile/new', profile);
  console.log(response)
  return response;
};
