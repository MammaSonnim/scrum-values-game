import '../../models/init';
import React, { FC } from 'react';
import { useStore } from 'effector-react';
import { $userInfo } from '../../../../models/userInfo';
import { AuthInfoModule } from './authInfo';
import { $isLogoutProcessing, logoutUser } from '../../models';

export const AuthInfo: FC = () => {
  const userInfo = useStore($userInfo);
  const isLogoutProcessing = useStore($isLogoutProcessing);

  return (
    <AuthInfoModule
      userInfo={userInfo}
      isLogoutProcessing={isLogoutProcessing}
      logoutUser={logoutUser}
    />
  );
};
