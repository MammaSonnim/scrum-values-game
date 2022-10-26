import { request } from '../../utils/request';
import { GetUserInfoResponseT } from './types';

export const requestUserInfo = async () => {
  const req = await request.get<GetUserInfoResponseT>('auth/me');

  return req.data;
};
