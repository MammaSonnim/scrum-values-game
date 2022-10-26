import { BrowserHistory } from 'history';
import { FormikProps } from 'formik';
import { EmptyObjectT } from '../../types';

export type RatingItemT = {
  id: number;
  teamName: string;
  scores: number;
  date: number;
};

export type RatingItemRawT = {
  id: number;
  name: string;
};

// FORM PARAMS
export type GetRatingRequestParamsT = {
  count?: number;
  page?: number;
  term?: string;
  friend?: boolean;
};

// FORMIK
export type FormValuesT = {
  searchQuery: string;
};

export type WithFormikPropsT = EmptyObjectT;

// PROPS
export type StatePropsT = {
  items: RatingItemT[];
  isProcessing: boolean;
};

export type DispatchPropsT = {
  // onMount: (params?: GetRatingRequestParamsT) => void;
  onMount: () => void;
};

export type OwnPropsT = {
  history: BrowserHistory;
};

export type HocsPropsT = FormikProps<FormValuesT>;

export type PropsT = StatePropsT & DispatchPropsT & OwnPropsT & HocsPropsT;
