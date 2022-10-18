import {
  API_SUCCESS_RESULT_CODE,
  API_FAILED_RESULT_CODE,
} from '../../../constants';

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

export type LoginUserResponseT = {
  resultCode: typeof API_SUCCESS_RESULT_CODE | typeof API_FAILED_RESULT_CODE;
  messages: string[];
  data: {
    userId: number;
  };
};

export type LogoutUserResponseT = {
  resultCode: typeof API_SUCCESS_RESULT_CODE | typeof API_FAILED_RESULT_CODE;
  messages: string[];
  data: Record<string, unknown>;
};
