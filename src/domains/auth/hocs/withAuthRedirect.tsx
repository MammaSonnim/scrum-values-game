import React from 'react';
import { Redirect } from 'react-router-dom';
import { useStore } from 'effector-react';
import { $userInfo } from '../../../models/user-info';

export const withAuthRedirect = <T, >(WrappedComponent: React.FC<T>) => {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const ContainerComponent = (props: T) => {
    const userInfo = useStore($userInfo);
    const { isAuth } = userInfo;

    // TODO is it ok that props.isAuth false on first render, or to fix it as bug?
    if (!isAuth) {
      return <Redirect to='/login'/>;
    }

    return <WrappedComponent {...props as T} />;
  };

  ContainerComponent.displayName = displayName;

  return ContainerComponent;
}

