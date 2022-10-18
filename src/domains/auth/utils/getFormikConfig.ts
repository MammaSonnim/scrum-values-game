import { FormikErrors } from 'formik';
import { Event } from 'effector';
import { LoginUserRequestT } from '../models/types';
import { FormValuesT, WithFormikPropsT } from '../types';

export const getFormikConfig = (loginUser: Event<LoginUserRequestT>) => {
  return {
    mapPropsToValues: (props: WithFormikPropsT) => {
      return {
        email: props.initialEmail || '',
        password: '',
      };
    },

    validate: (values: FormValuesT) => {
      const errors: FormikErrors<FormValuesT> = {};

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
};
