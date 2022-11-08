import { FormikProps } from 'formik';
import { EmptyObjectT } from '../../types';

export type RatingItemT = {
  id: number;
  teamName: string;
  scores: number;
  date: number;
};

// FORM PARAMS
export type RatingFilterParamsT = {
  count?: number;
  page?: number;
  searchString?: string;
};

export type GetRatingRequestParamsT = RatingFilterParamsT;

export type PostRatingRequestParamsT = {
  teamName: string;
  scores: number;
};

export type SavedFilterParamsT = RatingFilterParamsT | null | undefined;

// FORMIK
export type FormValuesT = {
  searchString: string;
};

export type FormikOuterPropsT = OwnPropsT;

// PROPS
export type OwnPropsT = EmptyObjectT;

export type HocsPropsT = FormikProps<FormValuesT>;

export type PropsT = OwnPropsT &
  HocsPropsT & {
    items: RatingItemT[];
    totalCount: number;
    isProcessing: boolean;
  };
