import { FormikErrors, FormikHelpers } from 'formik';
import { AnyAction, Dispatch } from 'redux';
import { loadRating } from '../ducks';
import { FormValuesT, FormikOuterPropsT } from '../types';

interface FormikHelpersWithPropsFromConnect extends FormikHelpers<FormValuesT> {
  props: FormikOuterPropsT;
}

export const getFormikConfig = (dispatch: Dispatch) => {
  return {
    mapPropsToValues: () => {
      return {
        searchString: '',
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

    handleSubmit: async (
      values: FormValuesT,
      { setSubmitting }: FormikHelpersWithPropsFromConnect
    ) => {
      // TODO if there are more params, move to helper for constructing params object
      const params = values.searchString
        ? {
            searchString: values.searchString,
          }
        : undefined;

      // to fix it, need to add AnyAction type to ThunkActionT, but I don't like such freedom
      await dispatch(loadRating(params) as unknown as AnyAction);

      setSubmitting(false);
    },

    displayName: 'RatingForm',
  };
};
