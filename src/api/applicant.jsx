import { request } from '../utils/request';

export const getApplicantProfile = async (accountId) => {
  const response = await request.get(`/applicant/profile/${accountId}`);
  return response;
};

export const createApplicantProfile = async (profileData) => {
  const response = await request.post('/applicant/profile/new', profileData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};

export const sendApplication = async (accessToken, jobId) => {
  const response = await request.patch(
    `/applicant/apply/${jobId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return response;
};

export const cancelApplication = async (accessToken, jobId) => {
  const response = await request.post(
    `/applicant/cancel/${jobId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return response;
};
