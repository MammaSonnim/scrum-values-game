import {
  API_SUCCESS_RESULT_CODE,
  API_FAILED_RESULT_CODE,
} from '../../constants';

export type UserInfoT = {
  login?: string | null;
  email?: string | null;
  id?: string | null;
  isAuth?: boolean;
  isCreator?: boolean;
}

export type getUserInfoResponseT = {
  resultCode: typeof API_SUCCESS_RESULT_CODE | typeof API_FAILED_RESULT_CODE;
  messages: string[];
  data: {
    id: number;
    email: string;
    login: string;
  };
}
