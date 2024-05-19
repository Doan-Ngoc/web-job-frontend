import { request } from '../utils/request';

export const verifyCompany = async (accessToken) => {
  const response = await request.get('/authorize/role', accessToken);
  return response;
};