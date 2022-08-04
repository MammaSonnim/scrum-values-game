import React, { FC, Fragment, useCallback } from 'react';
import { UserInfoT } from '../../../../models/user-info/types';
import { Event } from 'effector';
import { NavLink } from 'react-router-dom';

type Props = {
  userInfo: UserInfoT;
  logoutUser: Event<void>;
};

export const AuthInfoModule: FC<Props> = ({
  userInfo,
  logoutUser,
}) => {
  const handleLogout = useCallback(
    () => {
      logoutUser();
    },
    [logoutUser],
  );


  const { login, isAuth } = userInfo;

  return (
    <div>
      {isAuth ? (
        <Fragment>
          <p>
            Hello, {login}!
          </p>
          <p>
            <button
              onClick={handleLogout}
            >
              Выйти
            </button>
          </p>
        </Fragment>
      ) : (
        <NavLink to='/login'>Войти</NavLink>
      )}
    </div>
  )
};
