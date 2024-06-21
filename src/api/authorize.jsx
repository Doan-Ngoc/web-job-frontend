import { request } from '../utils/request';
import * as authApi from '../api/authenticate';

export const verifyCompany = async (accessToken) => {
  const response = await request.get('/authorize/role', accessToken);
  return response;
};


export const jobCreatorAuthorize = async (accessToken, jobId) => {
  const response = await authApi.verifyAccessToken(accessToken);
      if (response) {
        const fetchedJob = await request.get(`/job/${jobId}`)
      if (fetchedJob.data.createdBy === response.user.id) {
        return fetchedJob.data
      }
      else {
        return null
      }
      }
};