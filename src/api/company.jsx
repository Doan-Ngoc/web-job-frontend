import { request } from '../utils/request';

export const getCompanyProfile = async (accountId) => {
  const response = await request.get(`/company/profile/${accountId}`);
  return response;
};

export const createCompanyProfile = async (profile) => {
  const response = await request.post('/company/profile/new', profile, 
    {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response;
};

export const changeApplicationStatus = async(accessToken, profileId, jobId, status) => {
  const response = await request.post('/job/applications/status', 
    { 
      profileId, 
      jobId,
      status 
    }, 
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`
       }
  });
  return response;
}

