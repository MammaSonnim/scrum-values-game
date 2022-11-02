import { forward } from 'effector';
import { getUserInfo } from '../../../models/userInfo';
import { requestLoginUser } from '../api';
import { $isLoginProcessing, loginUser, loginUserFx } from '.';

$isLoginProcessing
  .on(loginUser, () => true)
  .reset(loginUserFx.done)
  .reset(loginUserFx.fail);

forward({
  from: loginUser,
  to: loginUserFx,
});

loginUserFx.use(async (params) => {
  return await requestLoginUser(params);
});

loginUserFx.done.watch(({ result }) => {
  console.log('🐸 result:', result);

  getUserInfo();
});

loginUserFx.fail.watch(({ error }) => {
  console.info('🦆 Login failed', error);
});
