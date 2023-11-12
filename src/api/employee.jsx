import { request } from '../utils/request';

export const getEmployeeProfile = async () => {
  const response = await request.get('/employee');
  return response;
};

export const createEmployeeProfile = async (profile) => {
  const response = await request.post('/employee', profile);
  return response;
};
