import React, { FC, useEffect } from 'react';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';
import { AnyAction } from 'redux';
import {
  loadRatingAndSaveParams,
  selectSavedFilterParams,
  selectRatingIsProcessing,
  selectRatingItems,
  selectRatingTotalCount,
} from './ducks';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'lodash/fp';
import { withFormik } from 'formik';
import { WrapperWithAuthRedirect } from '../auth/plugins/withAuthRedirect';
import { RatingPage } from './page';
import { OwnPropsT, FormikOuterPropsT, FormValuesT } from './types';
import { createParamsObject, getFormikConfig } from './utils';

const Rating: FC<OwnPropsT> = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectRatingItems);
  const totalCount = useSelector(selectRatingTotalCount);
  const isProcessing = useSelector(selectRatingIsProcessing);
  const savedFilterParams = useSelector(selectSavedFilterParams);

  const [searchParamsFromUrl, setSearchParamsToUrl] = useSearchParams();

  // Init module on mount
  useEffect(() => {
    const searchStringFromUrl = searchParamsFromUrl.get('searchString');
    const params = createParamsObject(searchStringFromUrl);

    // to fix this type-casting, need to add AnyAction type to ThunkActionT, but I don't like such freedom
    dispatch(loadRatingAndSaveParams(params) as unknown as AnyAction);
  }, []);

  // Setting params to URL (when it comes from BLL)
  useEffect(() => {
    if (savedFilterParams) {
      const params = createParamsObject(savedFilterParams.searchString);

      if (params) {
        setSearchParamsToUrl(params as URLSearchParamsInit);
      }
    }
  }, [savedFilterParams]);

  // Load data and save params on submit
  const handleSubmitForm = (values: FormValuesT) => {
    const params = createParamsObject(values.searchString);

    dispatch(loadRatingAndSaveParams(params) as unknown as AnyAction);
  };

  const PageWithHocs = compose(
    withFormik<FormikOuterPropsT, FormValuesT>(
      getFormikConfig(handleSubmitForm, savedFilterParams)
    )
  )(RatingPage);

  return (
    <WrapperWithAuthRedirect
      render={() => (
        <PageWithHocs
          items={items}
          totalCount={totalCount}
          isProcessing={isProcessing}
        />
      )}
    />
  );
};

// default export for lazy load
export default Rating;
