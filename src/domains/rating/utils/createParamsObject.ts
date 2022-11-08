import { isEmpty } from 'lodash';
import { RatingFilterParamsT } from '../types';

export const createParamsObject = (searchString: string | null | undefined) => {
  const obj: RatingFilterParamsT = {};

  if (typeof searchString === 'string') {
    obj.searchString = searchString;
  }

  return isEmpty(obj) ? undefined : obj;
};
