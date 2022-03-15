import { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

const useMe = (spotify: SpotifyWebApi.SpotifyWebApiJs) => {
  const [me, setMe] = useState<SpotifyApi.CurrentUsersProfileResponse>({} as SpotifyApi.CurrentUsersProfileResponse);

  useEffect(() => {
    (async () => {
      const response = await spotify.getMe();
      setMe(response);
    })();
  }, [spotify]);

  return me;
};

export { useMe };
