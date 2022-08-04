import React from 'react';
import { FormikProps, Form, Field } from 'formik';
import { UserInfoT } from '../../models/user-info/types';
import { FormValues } from './types';
import styles from './styles.module.css';
import { Navigate } from 'react-router-dom';
import { LoginStateT } from './models/types';

type PageProps = {
  userInfo: UserInfoT
  loginState: LoginStateT
};

export const AuthPage = ({
  userInfo,
  loginState,
  touched,
  errors,
  isSubmitting,
}: PageProps & FormikProps<FormValues>) => {
  const { isAuth } = userInfo;

  if (isAuth) {
    return <Navigate to='/'/>;
  }

  const { errors: commonErrors, isProcessing } = loginState;

  // TODO enable optional chaining
  const errorMessage = commonErrors && commonErrors.join('');

  return (
    <Form>
      <fieldset className={styles.fieldset}>
        <Field type='email' name='email'/>
        {touched.email && errors.email && <div>{errors.email}</div>}
      </fieldset>
      <fieldset className={styles.fieldset}>
        <Field type='password' name='password'/>
        {touched.password && errors.password && <div>{errors.password}</div>}
      </fieldset>
      <label>
        <Field type='checkbox' name='rememberMe'/>
        Запомнить
      </label>
      <button type='submit' disabled={isSubmitting || isProcessing }>
        Подтвердить
      </button>
      <div>{errorMessage}</div>
    </Form>
  );
};
