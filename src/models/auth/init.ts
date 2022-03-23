import { createEffect, createEvent, createStore, forward, sample } from 'effector';
import { api } from '@/shared/api';

const $token = createStore<string>('');

const getAuth = createEvent();

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

const setTokenFx = createEffect(async () => {
  const { token = '' } = Object.fromEntries(new URLSearchParams(document.cookie.split('; ').join('&')).entries());

  return token;
});

forward({
  from: getAuth,
  to: [checkCodeFx, setTokenFx],
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

export { $token, checkCodeFx, setTokenFx, getTokenFx, getAuth };
