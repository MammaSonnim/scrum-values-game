import { BrowserHistory } from 'history';
import { FormikProps } from 'formik';

export type RatingItemT = {
  id: number;
  teamName: string;
  scores: number;
  date: number;
  index: number;
};

export type RatingItemRawT = {
  id: number;
  name: string;
};

// FORM PARAMS
export type GetRatingRequestParamsT = {
  count?: number;
  page?: number;
  searchString?: string;
};

// FORMIK
export type FormValuesT = {
  searchString: string;
};

export type FormikOuterPropsT = StatePropsT & DispatchPropsT & OwnPropsT;

// PROPS
export type StatePropsT = {
  items: RatingItemT[];
  totalCount: number;
  isProcessing: boolean;
};

export type DispatchPropsT = {
  onMount: (params?: GetRatingRequestParamsT) => void;
  onSubmit: (params?: GetRatingRequestParamsT) => void;
};

export type OwnPropsT = {
  history: BrowserHistory;
};

export type HocsPropsT = FormikProps<FormValuesT>;

export type PropsT = StatePropsT & DispatchPropsT & OwnPropsT & HocsPropsT;