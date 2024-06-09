import { request } from '../utils/request';

export const getApplicantProfile = async (accountId) => {
  const response = await request.get(`/applicant/profile/${accountId}`);
  return response;
};

export const createApplicantProfile = async (profileData, { headers }) => {
  console.log('a')
  const response = await request.post('/applicant/profile/new', profileData, { headers });
  
  return response;
};
