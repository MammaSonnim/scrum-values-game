import { FormikErrors, FormikHelpers } from 'formik';
import { FormValuesT, FormikOuterPropsT, SavedFilterParamsT } from '../types';

type FormikHelpersWithPropsFromConnectT = FormikHelpers<FormValuesT> & {
  props: FormikOuterPropsT;
};

export const getFormikConfig = (
  handleSubmitForm: (values: FormValuesT) => void,
  savedFilterParams: SavedFilterParamsT
) => {
  return {
    // init values usually come as props from connect, but index doesn't have it anymore
    mapPropsToValues: () => {
      return {
        searchString: savedFilterParams?.searchString || '',
      };
    },

    validate: (values: FormValuesT) => {
      const errors: FormikErrors<FormValuesT> = {};

      const searchStringLength = values.searchString.length;

      if (searchStringLength > 0 && searchStringLength < 3) {
        errors.searchString = 'Must be 3 or more symbols';
      }

      return errors;
    },

    handleSubmit: (
      values: FormValuesT,
      { setSubmitting }: FormikHelpersWithPropsFromConnectT
    ) => {
      handleSubmitForm(values);

      setSubmitting(false);
    },

    displayName: 'RatingForm',
  };
};
