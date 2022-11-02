import { createDomain } from 'effector';
import { createGate } from 'effector-react';
import { attachLogger } from 'effector-logger/attach';
import {
  LoginUserResponseT,
  LogoutUserResponseT,
  LoginUserRequestT,
} from '../types';

export const Domain = createDomain('Auth');

attachLogger(Domain);

export const AuthAppGate = createGate('AuthAppGate');

// LOGIN
export const loginUser = Domain.createEvent<LoginUserRequestT>('LOGIN_USER');
export const loginUserFx = Domain.createEffect<
  LoginUserRequestT,
  LoginUserResponseT,
  Error
>('LOGIN_USER/FX');

export const $isLoginProcessing = Domain.createStore<boolean>(false);

// LOGOUT
export const logoutUser = Domain.createEvent<void>('LOGOUT_USER');
export const logoutUserFx = Domain.createEffect<void, LogoutUserResponseT>(
  'LOGOUT_USER/FX'
);

export const $isLogoutProcessing = Domain.createStore<boolean>(false);
