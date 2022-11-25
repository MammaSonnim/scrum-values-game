import { ApiResponseWithDataT } from '../../types';

export type UserInfoT = {
  login: string | null;
  email: string | null;
  id: number | null;
  isAuth: boolean;
  photoUrl: string | null;
};

export type GetUserInfoResponseT = ApiResponseWithDataT<{
  id: number;
  email: string;
  login: string;
}>;
