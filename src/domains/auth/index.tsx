import './models/init';
import React, { FC } from 'react';
import { useGate, useStore } from 'effector-react';
import { compose } from 'lodash/fp';
import { withFormik } from 'formik';
import { $userInfo } from '../../models/userInfo';
import {
  AuthAppGate,
  loginUser,
  logoutUser,
  $isLoginProcessing,
} from './models';
import { AuthPage } from './page';
import { FormValuesT, FormikOuterPropsT } from './types';
import { getFormikConfig } from './utils/getFormikConfig';

export { AuthInfo } from './modules/authInfo';

export const Auth: FC = () => {
  useGate(AuthAppGate);

  const isLoginProcessing = useStore($isLoginProcessing);
  const userInfo = useStore($userInfo);
  const { email } = userInfo;

  const PageWithHocs = compose(
    withFormik<FormikOuterPropsT, FormValuesT>(getFormikConfig(loginUser))
  )(AuthPage);

  return (
    <PageWithHocs
      userInfo={userInfo}
      initialEmail={email}
      isLoginProcessing={isLoginProcessing}
      logoutUser={logoutUser}
    />
  );
};
