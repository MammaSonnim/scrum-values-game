import { FormikErrors } from 'formik';
import { Event } from 'effector';
import { LoginUserRequestT } from '../models/types';
import { FormValues, WithFormikProps } from '../types';

export const getFormikConfig = (loginUser: Event<LoginUserRequestT>) => {
  return {
    mapPropsToValues: (props: WithFormikProps) => {
      return {
        email: props.initialEmail || '',
        password: '',
      };
    },

    validate: (values: FormValues) => {
      const errors: FormikErrors<FormValues> = {};
      if (!values.email) {
        errors.email = 'Required';
      }
      if (!values.password) {
        errors.password = 'Required';
      }

      return errors;
    },

    handleSubmit: (values: LoginUserRequestT) => {
      loginUser(values);
    },

    displayName: 'BasicForm',
  };
}
