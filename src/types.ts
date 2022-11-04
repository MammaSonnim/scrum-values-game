import { ApiResultCodes } from './constants';

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export type TODO_ANY = any;

// TODO use it for IdT?
export type Brand<T, U> = T & { __brand: U };

export type PropertiesT<T> = T extends { [key: string]: infer U } ? U : never;

export type ApiResultCodeT =
  | typeof ApiResultCodes.SUCCESS
  | typeof ApiResultCodes.FAILED
  | typeof ApiResultCodes.NEED_CAPTCHA;

export type ApiResponseWithDataT<D = EmptyObjectT, ARC = ApiResultCodeT> = {
  data: D;
  resultCode: ARC;
  messages: string[];
};

export type ApiResponseWithItemsT<T = []> = {
  items: T[];
  totalCount: number;
  error: string;
};

export type EmptyObjectT = Record<string, never>;

export type FunctionWithoutParamsT<R = void> = () => R;
