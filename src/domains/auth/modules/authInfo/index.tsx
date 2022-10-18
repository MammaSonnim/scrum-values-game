import '../../models/init';
import React, { FC } from 'react';
import { useStore } from 'effector-react';
import { $userInfo } from '../../../../models/userInfo';
import { AuthInfoModule } from './authInfo';
import { $logoutState, logoutUser } from '../../models';

export const AuthInfo: FC = () => {
  const userInfo = useStore($userInfo);
  const logoutState = useStore($logoutState);

  return (
    <AuthInfoModule
      userInfo={userInfo}
      logoutState={logoutState}
      logoutUser={logoutUser}
    />
  );
};
