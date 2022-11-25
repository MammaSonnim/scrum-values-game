import { forward } from 'effector';
import { ApiResultCodes } from '../../constants';
import { setAppIsInitialized } from '../ui';
import { requestUserInfo } from './api';
import { getUserInfo, getUserInfoFx, $userInfo, setUserInfo } from './index';

$userInfo
  .on(setUserInfo, (_prevState, payload) => {
    return payload;
  })
  .reset(getUserInfoFx.fail);

forward({
  from: getUserInfo,
  to: getUserInfoFx,
});

getUserInfoFx.use(async () => {
  return await requestUserInfo();
});

getUserInfoFx.done.watch(({ result }) => {
  if (result.resultCode === ApiResultCodes.SUCCESS) {
    const { login, email, id } = result.data;

    setUserInfo({
      login,
      email,
      id,
      isAuth: true,
      photoUrl: 'https://emojio.ru/images/apple-b/1f984.png',
    });

    setAppIsInitialized(true);
  } else {
    $userInfo.reset();
    // TODO SVG-22 show commonError
    console.log('🐸 result.messages:', result.messages);
  }
});

getUserInfoFx.fail.watch(({ error, params }) => {
  console.info('🦆 Get user info failed', error, params);
});
