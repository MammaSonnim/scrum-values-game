import { createDomain } from 'effector';
import { createGate } from 'effector-react';
import { attachLogger } from 'effector-logger/attach';
import { UserInfoT, getUserInfoResponseT } from './types';

export const Domain = createDomain('UserInfo');

attachLogger(Domain);

export const UserInfoAppGate = createGate('UserInfoAppGate');

export const $userInfo = Domain.createStore<UserInfoT>({
  login: null,
  email: null,
  id: null,
  isAuth: false,
  isCreator: true,
  photoUrl: 'https://emojio.ru/images/apple-b/1f984.png',
});

export const getUserInfo = Domain.createEvent<void>('GET_USER_INFO');
export const getUserInfoFx = Domain.createEffect<
  void,
  getUserInfoResponseT,
  void
>('GET_USER_INFO/FX');

export const setUserInfo = Domain.createEvent<UserInfoT>('SET_USER_INFO');
