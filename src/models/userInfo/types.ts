import { ApiResponseWithDataT, Brand } from '../../types';

export type UserIdT = Brand<number, 'UserIdT'>;

export type UserInfoT = {
  login: string | null;
  email: string | null;
  id: UserIdT | null;
  isAuth: boolean;
  photoUrl: string | null;
};

export type GetUserInfoResponseT = ApiResponseWithDataT<{
  id: UserIdT;
  email: string;
  login: string;
}>;
