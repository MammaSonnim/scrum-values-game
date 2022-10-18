import { forward } from 'effector';
import { API_SUCCESS_RESULT_CODE } from '../../constants';
import { setAppIsInitialized } from '../ui';
import { requestUserInfo } from './api';
import { getUserInfo, getUserInfoFx, $userInfo, setUserInfo } from './index';

$userInfo.on(setUserInfo, (prevState, payload) => {
  return {
    ...prevState,
    ...payload,
  };
});

forward({
  from: getUserInfo,
  to: getUserInfoFx,
});

getUserInfoFx.use(async () => {
  return await requestUserInfo();
});

getUserInfoFx.done.watch(({ result }) => {
  if (result.resultCode === API_SUCCESS_RESULT_CODE) {
    const { login, email, id } = result.data;

    setUserInfo({
      login,
      email,
      id: String(id),
      isAuth: true,
      isCreator: true,
    });

    setAppIsInitialized(true);
  } else {
    setUserInfo({
      login: null,
      email: null,
      id: null,
      isAuth: false,
      isCreator: false,
    });
  }
});

getUserInfoFx.fail.watch(({ error, params }) => {
  console.info('Get user info failed', error, params);

  setUserInfo({
    login: null,
    email: null,
    id: null,
    isAuth: false,
    isCreator: false,
  });
});
