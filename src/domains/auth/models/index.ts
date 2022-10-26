import { createDomain } from 'effector';
import { createGate } from 'effector-react';
import { attachLogger } from 'effector-logger/attach';
import {
  LoginUserResponseT,
  LogoutUserResponseT,
  LoginUserRequestT,
  LoginStateT,
  LogoutStateT,
} from '../types';

export const Domain = createDomain('Auth');

attachLogger(Domain);

export const AuthAppGate = createGate('AuthAppGate');

export const $loginState = Domain.createStore<LoginStateT>({
  errors: null,
  isProcessing: false,
  resultCode: null,
});

export const $logoutState = Domain.createStore<LogoutStateT>({
  error: null,
  isProcessing: false,
  resultCode: null,
});

export const setLoginState = Domain.createEvent<LoginStateT>('SET_LOGIN_STATE');
export const setLogoutState =
  Domain.createEvent<LogoutStateT>('SET_LOGOUT_STATE');

export const loginUser = Domain.createEvent<LoginUserRequestT>('LOGIN_USER');
export const loginUserFx = Domain.createEffect<
  LoginUserRequestT,
  LoginUserResponseT
>('LOGIN_USER/FX');

export const logoutUser = Domain.createEvent<void>('LOGOUT_USER');
export const logoutUserFx = Domain.createEffect<void, LogoutUserResponseT>(
  'LOGOUT_USER/FX'
);
