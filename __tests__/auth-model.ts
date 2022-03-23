import { fork, allSettled } from 'effector';
import { $token, checkCodeFx, setTokenFx, getTokenFx } from '@/models/auth';

describe('token value', () => {
  beforeEach(() => {
    $token.reset();
  });

  test('empty query', async () => {
    const scope = fork({
      handlers: new Map([[setTokenFx, () => '']]),
    });

    await allSettled(setTokenFx, { scope });

    expect(scope.getState($token)).toBe('');
  });

  test('query expect 123', async () => {
    const scope = fork({
      // @ts-ignore
      handlers: new Map([
        [checkCodeFx, () => 'test code from spotify'],
        [getTokenFx, () => null],
        [setTokenFx, () => '123'],
      ]),
    });

    await allSettled(checkCodeFx, { scope });

    expect(scope.getState($token)).toBe('123');
  });
});
