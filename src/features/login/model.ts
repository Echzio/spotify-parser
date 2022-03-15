const props = Object.entries({
  client_id: process.env.CLIENT_ID,
  response_type: 'code',
  redirect_uri: encodeURIComponent(process.env.REDIRECT_URL!),
  scope: encodeURIComponent(
    'user-library-read streaming user-read-email playlist-read-private user-top-read user-read-currently-playing user-read-playback-state user-modify-playback-state ugc-image-upload',
  ),
})
  .map(([key, value]) => `${key}=${value}`)
  .join('&');

const href = 'https://accounts.spotify.com/authorize';

const link = `${href}?${props}`;

export { link };
