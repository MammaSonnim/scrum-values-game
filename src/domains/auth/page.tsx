import React from 'react';
import { FormikProps, Form, Field, ErrorMessage } from 'formik';
import { UserInfoT } from '../../models/userInfo/types';
import { FormValuesT } from './types';
import styles from './styles.module.css';
import { Navigate } from 'react-router-dom';
import { LoginStateT } from './types';

type PageProps = {
  userInfo: UserInfoT;
  loginState: LoginStateT;
};

export const AuthPage = ({
  userInfo,
  loginState,
  isSubmitting,
}: PageProps & Pick<FormikProps<FormValuesT>, 'isSubmitting'>) => {
  const { isAuth } = userInfo;

  if (isAuth) {
    return <Navigate to='/' />;
  }

  const { errors: commonErrors, isProcessing } = loginState;

  // TODO enable optional chaining
  const errorMessage = commonErrors && commonErrors.join('');

  return (
    <Form>
      <fieldset className={styles.fieldset}>
        <Field type='email' name='email' />
        <ErrorMessage name='email' component='div' />
      </fieldset>
      <fieldset className={styles.fieldset}>
        <Field type='password' name='password' />
        <ErrorMessage name='password' component='div' />
      </fieldset>
      <label>
        <Field type='checkbox' name='rememberMe' />
        Запомнить
      </label>
      <button type='submit' disabled={isSubmitting || isProcessing}>
        Подтвердить
      </button>
      <div>{errorMessage}</div>
    </Form>
  );
};
