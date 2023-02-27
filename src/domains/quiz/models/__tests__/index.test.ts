import { fork, allSettled } from 'effector';
import { TODO_ANY } from '../../../../types';
import { Domain, initQuizFx } from '..';

describe('Quiz', () => {
  it('should init module', async () => {
    const initQuizFxMock = jest.fn();

    const scope = fork(Domain, {
      handlers: new Map<TODO_ANY, TODO_ANY>([[initQuizFx, initQuizFxMock]]),
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await allSettled(initQuizFx, { scope });

    expect(initQuizFxMock).toHaveBeenCalledTimes(1);
  });
});
