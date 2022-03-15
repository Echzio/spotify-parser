import { createStore } from 'effector';
import SpotifyWebApi from 'spotify-web-api-js';
import { $token } from '@/models/auth';

const $spotify = createStore<null | SpotifyWebApi.SpotifyWebApiJs>(null);

$spotify.on($token, (_, token) => {
  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(token);

  return spotifyApi;
});

export { $spotify };
