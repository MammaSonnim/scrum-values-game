import { request } from '../../utils/request';
import {
  LoginUserRequestT,
  LoginUserResponseT,
  LogoutUserResponseT,
} from './types';

export const requestLoginUser = async (params: LoginUserRequestT) => {
  const req = await request.post<LoginUserResponseT>('auth/login', params);

  return req.data;
};

export const requestLogoutUser = async () => {
  const req = await request.delete<LogoutUserResponseT>('auth/login');

  return req.data;
};
