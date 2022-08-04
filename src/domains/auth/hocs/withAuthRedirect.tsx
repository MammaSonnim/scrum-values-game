import React from 'react';
import { Navigate } from 'react-router-dom';
import { useStore } from 'effector-react';
import { $userInfo } from '../../../models/user-info';
import { $isAppInitialized } from '../../../models/ui';

export const withAuthRedirect = <T, >(WrappedComponent: React.FC<T>) => {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const ContainerComponent = (props: T) => {
    const userInfo = useStore($userInfo);
    const isAppInitialized = useStore($isAppInitialized);
    const { isAuth } = userInfo;

    if (!isAppInitialized) {
      return <div>Загрузка</div>
    }

    if (!isAuth) {
      return <Navigate to='/login'/>;
    }

    return <WrappedComponent {...props as T} />;
  };

  ContainerComponent.displayName = displayName;

  return ContainerComponent;
}

