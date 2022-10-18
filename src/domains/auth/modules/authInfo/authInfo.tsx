import React, { FC, Fragment, useCallback } from 'react';
import { UserInfoT } from '../../../../models/userInfo/types';
import { LogoutStateT } from '../../models/types';
import { Event } from 'effector';
import { NavLink } from 'react-router-dom';

type Props = {
  userInfo: UserInfoT;
  logoutState: LogoutStateT;
  logoutUser: Event<void>;
};

export const AuthInfoModule: FC<Props> = ({
  userInfo,
  logoutUser,
  logoutState,
}) => {
  const handleLogout = useCallback(() => {
    logoutUser();
  }, [logoutUser]);

  const { login, isAuth } = userInfo;
  const { error } = logoutState;

  return (
    <div>
      {isAuth ? (
        <Fragment>
          <p>Hello, {login}!</p>
          <p>
            <button onClick={handleLogout}>Выйти</button>
          </p>
          {error && <div>{error}</div>}
        </Fragment>
      ) : (
        <NavLink to='/login'>Войти</NavLink>
      )}
    </div>
  );
};
