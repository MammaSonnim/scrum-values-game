import { calcIsNeedToGameOver } from '../calcIsNeedToGameOver';

const stubbedResults = {
  courage: 1,
  focus: 2,
  commitment: 3,
  respect: 4,
  opennes: 5
};

describe('calcIsNeedToGameOver', () => {
  it('should return true if one of values is negative', () => {
    const result = calcIsNeedToGameOver({
      ...stubbedResults,
      respect: -1
    });

    expect(result).toEqual(true);
  });

  it('should return true if one of values is zero', () => {
    const result = calcIsNeedToGameOver({
      ...stubbedResults,
      commitment: 0
    });

    expect(result).toEqual(true);
  });

  it('should return false if no negative or zero values', () => {
    const result = calcIsNeedToGameOver(stubbedResults);

    expect(result).toEqual(false);
  });
});
