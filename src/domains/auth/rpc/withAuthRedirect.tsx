import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useStore } from 'effector-react';
import { $userInfo } from '../../../models/userInfo';
import { $isAppInitialized } from '../../../models/ui';

type PropsT = {
  render: () => JSX.Element;
};

export const WrapperWithAuthRedirect: FC<PropsT> = ({ render }) => {
  const userInfo = useStore($userInfo);
  const isAppInitialized = useStore($isAppInitialized);
  const { isAuth } = userInfo;

  if (!isAppInitialized) {
    return <div>Загрузка</div>;
  }

  if (!isAuth) {
    return <Navigate to='/login' />;
  }

  return render();
};
