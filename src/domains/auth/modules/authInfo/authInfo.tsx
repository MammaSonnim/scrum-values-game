import React, { FC, useCallback } from 'react';
import { Event } from 'effector';
import { NavLink } from 'react-router-dom';
import { UserInfoT } from '../../../../models/userInfo/types';
import { Text, Button } from '../../../../components';
import styles from './styles.module.css';

type Props = {
  userInfo: UserInfoT;
  isLogoutProcessing: boolean;
  logoutUser: Event<void>;
};

export const AuthInfoModule: FC<Props> = ({
  userInfo,
  logoutUser,
  isLogoutProcessing,
}) => {
  const handleLogout = useCallback(() => {
    logoutUser();
  }, [logoutUser]);

  const { login, isAuth } = userInfo;

  return (
    <div className={styles['auth-info']}>
      {isAuth ? (
        <div className={styles.block}>
          <Text>{login}</Text>
          <Button
            className={styles['button']}
            onClick={handleLogout}
            disabled={isLogoutProcessing}
            asLink
          >
            Sign out
          </Button>
        </div>
      ) : (
        <NavLink to='/login'>Sign in</NavLink>
      )}
    </div>
  );
};
