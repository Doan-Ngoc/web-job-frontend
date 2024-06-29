import { request } from '../utils/request';

export const getApplicantProfile = async (accountId) => {
  const response = await request.get(`/applicant/profile/${accountId}`);
  return response;
};

export const createApplicantProfile = async (profileData) => {
  const response = await request.post('/applicant/profile/new', profileData, 
  //   {
  //   headers: {
  //     'Content-Type': 'multipart/form-data'
  //   }
  // }
);
  return response;
};
