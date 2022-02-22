import { request } from '../../utils/request';
import { LoginUserRequestT } from './models/types';

export const requestUserInfo = async () => {
  const req = await request.get('auth/me');

  return req.data;
}

export const requestLoginUser = async (params: LoginUserRequestT) => {
  const req = await request.post('auth/login', params);

  return req.data;
}

export const requestLogoutUser = async () => {
  const req = await request.delete('auth/login');

  return req.data;
}
