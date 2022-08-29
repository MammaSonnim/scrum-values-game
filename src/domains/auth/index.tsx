import './models/init';
import React, { FC } from 'react';
import { useGate, useStore } from 'effector-react';
import { compose } from 'lodash/fp';
import { withFormik } from 'formik';
import { $userInfo } from '../../models/user-info';
import { AuthAppGate, loginUser, logoutUser, $loginState } from './models';
import { AuthPage } from './page';
import { FormValuesT, WithFormikPropsT } from './types';
import { getFormikConfig } from './utils/getFormikConfig';

export { AuthInfo } from './modules/authInfo';

export const Auth: FC = () => {
  useGate(AuthAppGate)

  const loginState = useStore($loginState);
  const userInfo = useStore($userInfo);
  const { email } = userInfo;

  const PageWithHocs = compose(
    withFormik<WithFormikPropsT, FormValuesT>(getFormikConfig(loginUser)),
  )(AuthPage)

  return (
    <PageWithHocs
      userInfo={userInfo}
      initialEmail={email}
      loginState={loginState}
      logoutUser={logoutUser}
    />
  );
};
