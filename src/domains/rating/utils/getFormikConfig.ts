import { FormikErrors, FormikHelpers } from 'formik';
import { FormValuesT, GetRatingRequestParamsT } from '../types';

export const getFormikConfig = ({
  onSubmit,
}: {
  onSubmit: (params?: GetRatingRequestParamsT) => void;
}) => {
  return {
    mapPropsToValues: () => {
      return {
        searchQuery: '',
      };
    },

    validate: (values: FormValuesT) => {
      const errors: FormikErrors<FormValuesT> = {};

      if (values.searchQuery.length < 3) {
        errors.searchQuery = 'Must be 3 or more symbols';
      }

      return errors;
    },

    handleSubmit: async (
      _values: FormValuesT,
      { setSubmitting }: FormikHelpers<FormValuesT>
    ) => {
      // TODO draw dataflow in MIRO! I confused
      await onSubmit();

      setSubmitting(false);
    },

    displayName: 'RatingForm',
  };
};
