import { forward } from 'effector';
import { getUserInfo } from '../../../models/userInfo';
import { requestLoginUser, requestLogoutUser } from '../api';
import {
  $loginState,
  $logoutState,
  AuthAppGate,
  loginUser,
  loginUserFx,
  logoutUser,
  logoutUserFx,
  setLoginState,
  setLogoutState,
} from './';

// LOGIN
$loginState.on(setLoginState, (prevState, payload) => {
  return {
    ...prevState,
    ...payload,
  };
});

forward({
  from: loginUser,
  to: loginUserFx,
});

loginUserFx.use(async (params) => {
  setLoginState({
    isProcessing: true,
    resultCode: null,
  });

  return await requestLoginUser(params);
});

loginUserFx.done.watch(({ result }) => {
  setLoginState({
    isProcessing: false,
    resultCode: result.resultCode,
    errors: result.messages,
  });

  getUserInfo();
});

loginUserFx.fail.watch(({ error }) => {
  console.info('🦆 Login failed', error);

  setLoginState({
    isProcessing: false,
    resultCode: null,
    errors: ['🦆 Login failed'],
  });
});

// LOGOUT
$logoutState.on(setLogoutState, (prevState, payload) => {
  return {
    ...prevState,
    ...payload,
  };
});

forward({
  from: logoutUser,
  to: logoutUserFx,
});

logoutUserFx.use(async () => {
  setLogoutState({
    isProcessing: true,
    resultCode: null,
  });

  return await requestLogoutUser();
});

logoutUserFx.done.watch(({ result }) => {
  setLogoutState({
    isProcessing: false,
    resultCode: result.resultCode,
  });

  getUserInfo();
});

logoutUserFx.fail.watch(({ error }) => {
  console.info('🦆 Logout failed', error);

  setLogoutState({
    isProcessing: false,
    resultCode: null,
    error: `🦆 Logout failed ${error}`,
  });
});

// GATES
AuthAppGate.open.watch((payload) => {
  return payload;
});

AuthAppGate.close.watch((payload) => {
  return payload;
});
