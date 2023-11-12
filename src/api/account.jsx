import { request } from '../utils/request';

export const getAccount = async () => {
  const account = await request.get('/account');
  return account;
};
