import { ApiResponseWithDataT } from '../../types';

export type UserInfoT = {
  login: string | null;
  email: string | null;
  id: string | null;
  isAuth: boolean;
  isCreator: boolean;
  photoUrl: string | null;
};

export type GetUserInfoResponseT = ApiResponseWithDataT<{
  id: number;
  email: string;
  login: string;
}>;
