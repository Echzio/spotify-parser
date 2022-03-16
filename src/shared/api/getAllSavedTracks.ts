import SpotifyWebApi from 'spotify-web-api-js';

function getAllSavedTracks(spotify: SpotifyWebApi.SpotifyWebApiJs, callback: (result: SpotifyApi.UsersSavedTracksResponse) => void) {
  let result = {} as SpotifyApi.UsersSavedTracksResponse;

  async function recursion(next: string, offset: number) {
    if (!next) return;
    const response = await spotify.getMySavedTracks({ offset, limit: 50 });

    if (next === 'first') {
      result = response;
    } else {
      result = {
        ...result,
        items: [...result.items, ...response.items],
      };
    }

    callback(result);

    try {
      await recursion(response.next, offset + 20);
    } catch (e) {
      alert((e as { message: string }).message);
    }
  }

  recursion('first', 0);
}

export { getAllSavedTracks };
