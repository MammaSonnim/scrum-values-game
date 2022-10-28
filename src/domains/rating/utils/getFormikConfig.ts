import { FormikErrors, FormikHelpers } from 'formik';
import { FormValuesT, FormikOuterPropsT } from '../types';

interface FormikHelpersWithPropsFromConnect extends FormikHelpers<FormValuesT> {
  props: FormikOuterPropsT;
}

export const getFormikConfig = () => {
  return {
    mapPropsToValues: () => {
      return {
        searchString: '',
      };
    },

    validate: (values: FormValuesT) => {
      const errors: FormikErrors<FormValuesT> = {};

      if (values.searchString.length < 3) {
        errors.searchString = 'Must be 3 or more symbols';
      }

      return errors;
    },

    handleSubmit: async (
      values: FormValuesT,
      { props, setSubmitting }: FormikHelpersWithPropsFromConnect
    ) => {
      // TODO if there is more params, move to helper for constructing params object
      const params = values.searchString
        ? {
            searchString: values.searchString,
          }
        : undefined;

      await props.onSubmit(params);

      setSubmitting(false);
    },

    displayName: 'RatingForm',
  };
};
