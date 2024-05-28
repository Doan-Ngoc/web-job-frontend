import { request } from '../utils/request';

export const getCompanyProfile = async (accountId) => {
  const response = await request.get(`/company/profile/${accountId}`);
  return response;
};

export const createCompanyProfile = async (profile, { headers }) => {
  const response = await request.post('/company/profile/new', profile, { headers });
  return response;
};

