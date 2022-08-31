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
    errors: [],
    isProcessing: true,
    resultCode: null,
  })

  return await requestLoginUser(params);
});

loginUserFx.done.watch(({ result }) => {
  setLoginState({
    errors: result.messages,
    isProcessing: false,
    resultCode: result.resultCode,
  })

  getUserInfo();
});

loginUserFx.fail.watch(({ error }) => {
  console.info('Login failed', error);
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
    errors: [],
    isProcessing: true,
    resultCode: null,
  })

  return await requestLogoutUser();
});

logoutUserFx.done.watch(({ result }) => {
  setLogoutState({
    errors: result.messages,
    isProcessing: false,
    resultCode: result.resultCode,
  })

  getUserInfo();
});

logoutUserFx.fail.watch(({ error }) => {
  console.info('Logout failed', error);
});

// GATES
AuthAppGate.open.watch((payload) => {
  return payload;
});

AuthAppGate.close.watch((payload) => {
  return payload;
});
