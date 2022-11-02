import { fakeDate } from '../../../../constants';
import { transformRatingData } from '../transformRatingData';

describe('transformRatingData', () => {
  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.123456789);
    jest.spyOn(Date, 'now').mockImplementation(() => fakeDate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return transformed data', () => {
    const result = transformRatingData([
      {
        id: 1,
        name: 'Piu',
      },
      {
        id: 2,
        name: 'Miu',
      },
    ]);

    expect(result).toStrictEqual([
      {
        id: 1,
        teamName: 'Piu',
        scores: 12,
        date: fakeDate,
      },
      {
        id: 2,
        teamName: 'Miu',
        scores: 12,
        date: fakeDate,
      },
    ]);
  });
});
