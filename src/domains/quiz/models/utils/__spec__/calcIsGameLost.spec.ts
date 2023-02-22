import { calcIsGameLost } from '../calcIsGameLost';

const stubbedResults = {
  courage: 1,
  focus: 2,
  commitment: 3,
  respect: 4,
  opennes: 5,
};

describe('calcIsGameLost', () => {
  it('should return true if one of values is negative', () => {
    const result = calcIsGameLost({
      ...stubbedResults,
      respect: -1,
    });

    expect(result).toEqual(true);
  });

  it('should return true if one of values is zero', () => {
    const result = calcIsGameLost({
      ...stubbedResults,
      commitment: 0,
    });

    expect(result).toEqual(true);
  });

  it('should return false if no negative or zero values', () => {
    const result = calcIsGameLost(stubbedResults);

    expect(result).toEqual(false);
  });
});
