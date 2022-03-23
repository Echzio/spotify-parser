import { render, screen } from '@testing-library/react';
import { allSettled, fork } from 'effector';
import { Provider } from 'effector-react/scope';
import { $token, checkCodeFx, setTokenFx, getTokenFx } from '@/models/auth';
import { App } from '@/app/app';

describe('app current render', () => {
  beforeEach(() => {
    $token.reset();
  });

  test('without token -> login button', async () => {
    render(<App />);

    const node = await screen.findByTestId('without-token');

    expect(node).toBeInTheDocument();
  });

  test('with-token 123 -> interface with songs', async () => {
    const scope = fork({
      // @ts-ignore
      handlers: new Map([
        [checkCodeFx, () => 'test code from spotify'],
        [getTokenFx, () => null],
        [setTokenFx, () => '123'],
      ]),
    });

    render(
      <Provider value={scope}>
        <App />
      </Provider>,
    );

    await allSettled(checkCodeFx, { scope });

    const node = await screen.findByTestId('with-token');

    expect(node).toBeInTheDocument();
  });
});
