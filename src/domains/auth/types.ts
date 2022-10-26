import { ApiResponseWithDataT } from '../../types';

export type FormValuesT = {
  email: string;
  password: string;
};

export type WithFormikPropsT = {
  initialEmail?: string;
};

export type LoginStateT = {
  errors?: string[] | null;
  isProcessing?: boolean;
  resultCode: number | null;
};

export type LogoutStateT = {
  error?: string | null;
  isProcessing?: boolean;
  resultCode: number | null;
};

export type LoginUserRequestT = {
  email: string;
  password: string;
  rememberMe?: boolean;
  captcha?: string;
};

export type LoginUserResponseT = ApiResponseWithDataT<{
  userId: number;
}>;

export type LogoutUserResponseT = ApiResponseWithDataT;
