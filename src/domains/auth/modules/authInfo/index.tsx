import '../../models/init';
import React, { FC } from 'react';
import { useStore } from 'effector-react';
import { $userInfo } from '../../../../models/userInfo';
import { AuthInfoModule } from './authInfo';
import { logoutUser } from '../../models';

export const AuthInfo: FC = () => {
  const userInfo = useStore($userInfo);

  return (
    <AuthInfoModule
      userInfo={userInfo}
      logoutUser={logoutUser}
    />
  )
};
