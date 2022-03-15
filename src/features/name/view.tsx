import SpotifyWebApi from 'spotify-web-api-js';
import { useMe } from './model';

const Name: React.FC<{ spotify: SpotifyWebApi.SpotifyWebApiJs }> = ({ spotify }) => {
  const me = useMe(spotify);

  return (
    <div className="flex flex-col gap-y-4">
      {me.display_name && <h1 className="text-white font-bold text-3xl">Hello, {me.display_name}</h1>}
      {me?.external_urls?.spotify && (
        <a
          href={me.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white text-sm underline hover:opacity-70 transition-opacity duration-150 w-max">
          Spotify profile link
        </a>
      )}
    </div>
  );
};

export { Name };
