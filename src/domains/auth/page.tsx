import React, { FC } from 'react';
import { FormikProps, Form, Field, ErrorMessage } from 'formik';
import { UserInfoT } from '../../models/userInfo/types';
import { FormValuesT } from './types';
import styles from './styles.module.css';
import { Navigate } from 'react-router-dom';

type PageProps = {
  userInfo: UserInfoT;
  isLoginProcessing: boolean;
};

export const AuthPage: FC<
  PageProps & Pick<FormikProps<FormValuesT>, 'isSubmitting'>
> = ({ userInfo, isLoginProcessing, isSubmitting }) => {
  const { isAuth } = userInfo;

  if (isAuth) {
    return <Navigate to='/' />;
  }

  const errorMessage = 'Test';

  return (
    <Form>
      <fieldset className={styles.fieldset}>
        <Field type='email' name='email' />
        {/* TODO SVG-35 */}
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <ErrorMessage name='email' component='div' />
      </fieldset>
      <fieldset className={styles.fieldset}>
        <Field type='password' name='password' />
        {/* TODO SVG-35 */}
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <ErrorMessage name='password' component='div' />
      </fieldset>
      <label>
        <Field type='checkbox' name='rememberMe' />
        Запомнить
      </label>
      <button type='submit' disabled={isSubmitting || isLoginProcessing}>
        Подтвердить
      </button>
      <div>{errorMessage}</div>
    </Form>
  );
};
