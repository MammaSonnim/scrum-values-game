import { createParamsObject } from '../createParamsObject';

describe('createParamsObject', () => {
  it('should return object with searchString', () => {
    expect(createParamsObject('Pam')).toEqual({ searchString: 'Pam' });
  });

  it('should return undefined if all values are undefined', () => {
    expect(createParamsObject(undefined)).toEqual(undefined);
  });
});
