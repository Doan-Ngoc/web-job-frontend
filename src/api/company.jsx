import { request } from '../utils/request';
import * as authApi from '../api/authenticate'; 

export const getCompanyProfile = async (accountId) => {
  const response = await request.get(`/company/profile/${accountId}`);
  return response;
};

export const createCompanyProfile = async (profile) => {
  const response = await request.post('/company/profile/new', profile, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};

export const changeApplicationStatus = async (
  accessToken,
  profileId,
  jobId,
  status,
) => {
  const response = await request.post(
    '/job/applications/status',
    {
      profileId,
      jobId,
      status,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return response;
};

export const jobCreatorAuthorize = async (accessToken, jobId) => {
  const response = await authApi.verifyAccessToken(accessToken);
  if (response) {
    const fetchedJob = await request.get(`/job/${jobId}`);
    if (fetchedJob.data.createdBy === response.user.id) {
      return fetchedJob.data;
    } else {
      return null;
    }
  }
};
