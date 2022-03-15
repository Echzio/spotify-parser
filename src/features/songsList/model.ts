import { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

const useSongs = (spotify: SpotifyWebApi.SpotifyWebApiJs) => {
  const [songs, setSongs] = useState<SpotifyApi.UsersSavedTracksResponse>({} as SpotifyApi.UsersSavedTracksResponse);

  useEffect(() => {
    (async () => {
      const response = await spotify.getMySavedTracks();

      setSongs(response);
    })();
  }, [spotify]);

  return songs;
};

export { useSongs };
