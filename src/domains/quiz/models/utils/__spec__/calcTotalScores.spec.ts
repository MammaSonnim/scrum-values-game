import { calcTotalScores } from '../calcTotalScores';

const stubbedTotalScores = {
  courage: 1,
  focus: 2,
  commitment: 3,
  respect: 4,
  opennes: 5,
};

const stubbedAnswerScores = {
  courage: -5,
  focus: 4,
  commitment: 3,
  respect: 0,
  opennes: 1,
};

describe('calcTotalScores', () => {
  it('should sum prev total scores and answer scores', () => {
    const result = calcTotalScores(stubbedTotalScores, stubbedAnswerScores);

    expect(result).toEqual({
      courage: -4,
      focus: 6,
      commitment: 6,
      respect: 4,
      opennes: 6,
    });
  });
});
