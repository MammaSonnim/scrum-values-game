import { BrowserHistory } from 'history';
import { FormikProps } from 'formik';

export type RatingItemT = {
  id: number;
  teamName: string;
  scores: number;
  date: number;
};

// FORM PARAMS
export type GetRatingRequestParamsT = {
  count?: number;
  page?: number;
  searchString?: string;
};

export type PostRatingRequestParamsT = {
  teamName: string;
  scores: number;
};

// FORMIK
export type FormValuesT = {
  searchString: string;
};

export type FormikOuterPropsT = OwnPropsT;

// PROPS
export type OwnPropsT = {
  history: BrowserHistory;
};

export type HocsPropsT = FormikProps<FormValuesT>;

export type PropsT = OwnPropsT & HocsPropsT;
