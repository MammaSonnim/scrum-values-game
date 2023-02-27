import { calcSumOfScores } from '../calcSumOfScores';

describe('calcSumOfScores', () => {
  it('should sum scores 1', () => {
    const result = calcSumOfScores({
      courage: 1,
      focus: 2,
      commitment: 3,
      respect: 4,
      opennes: 5,
    });

    expect(result).toEqual(15);
  });

  it('should sum scores 2', () => {
    const result = calcSumOfScores({
      courage: -5,
      focus: 0,
      commitment: 1,
      respect: 2,
      opennes: 3,
    });

    expect(result).toEqual(1);
  });
});
