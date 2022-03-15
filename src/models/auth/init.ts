import { createEffect, createStore, forward, sample } from 'effector';
import { createGate } from 'effector-react';
import { api } from '@/shared/api';

const $token = createStore<string>('');

const mountGate = createGate('app mounted');

const checkCodeFx = createEffect(() => {
  const { search } = window.location;
  const urlParams = new URLSearchParams(search);

  return urlParams.get('code');
});

const getTokenFx = createEffect(async (code: string | undefined | null) => {
  const { error, error_description, access_token, expires_in, refresh_token } = await api.getToken(code!);

  if (error) {
    alert(error_description);
    return;
  }

  document.cookie = `token=${access_token};max-age=${expires_in};path=/`;
  document.cookie = `refresh=${refresh_token};max-age=${expires_in};path=/`;
});

const clearSearchFx = createEffect(() => {
  history.replaceState({}, '', '/');
});

const setTokenFx = createEffect(() => {
  const { token } = Object.fromEntries(new URLSearchParams(document.cookie.split(';').join('&')).entries());

  return token;
});

sample({
  clock: mountGate.status,
  filter: item => item,
  target: [checkCodeFx, setTokenFx],
});

sample({
  clock: checkCodeFx.doneData,
  filter: item => !!item,
  target: [getTokenFx, clearSearchFx],
});

forward({
  from: getTokenFx.doneData,
  to: setTokenFx,
});

$token.on(setTokenFx.doneData, (_, token) => token);

$token.watch(item => {
  console.log(item);
});

export { $token, mountGate };
