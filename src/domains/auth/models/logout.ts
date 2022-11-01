import { forward } from 'effector';
import { getUserInfo } from '../../../models/userInfo';
import { requestLogoutUser } from '../api';
import { $isLogoutProcessing, logoutUser, logoutUserFx } from '.';

$isLogoutProcessing
  .on(logoutUser, () => true)
  .reset(logoutUserFx.done)
  .reset(logoutUserFx.fail);

forward({
  from: logoutUser,
  to: logoutUserFx,
});

logoutUserFx.use(async () => {
  return await requestLogoutUser();
});

logoutUserFx.done.watch(({ result }) => {
  console.log('🐸 result:', result);

  getUserInfo();
});

logoutUserFx.fail.watch(({ error }) => {
  console.info('🦆 Logout failed', error);
});
