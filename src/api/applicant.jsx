import { request } from '../utils/request';

export const getApplicantProfile = async (accountId) => {
  console.log('bs')
  const response = await request.get(`/applicant/profile/${accountId}`);
  return response;
};

export const createApplicantProfile = async (profile) => {
  const response = await request.post('/applicant', profile);
  return response;
};
