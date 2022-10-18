import React, { useEffect } from 'react';
import { useStore } from 'effector-react';
import { $userInfo, getUserInfo } from '../models/userInfo';

export const withUserInfo = <T,>(WrappedComponent: React.FC<T>) => {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const ContainerComponent = (props: T) => {
    const userInfo = useStore($userInfo);
    const { isAuth } = userInfo;

    useEffect(() => {
      if (!isAuth) {
        getUserInfo();
      }
    }, [isAuth]);

    return <WrappedComponent userInfo={userInfo} {...(props as T)} />;
  };

  ContainerComponent.displayName = displayName;

  return ContainerComponent;
};
