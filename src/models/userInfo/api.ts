import { request } from '../../utils/request';

export const requestUserInfo = async () => {
  const req = await request.get('auth/me');

  return req.data;
};
