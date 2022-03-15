import SpotifyWebApi from 'spotify-web-api-js';
import { Song } from '@/features/song';
import { useSongs } from './model';

const SongsList: React.FC<{ spotify: SpotifyWebApi.SpotifyWebApiJs }> = ({ spotify }) => {
  const songs = useSongs(spotify);

  return (
    <div className='flex flex-col gap-y-4'>
      <p className="text-white text-lg font-bold">Saved tracks:</p>
      {songs.items && (
        <div className="flex flex-col items-start gap-y-8 md:gap-y-4">
          {songs.items.map(item => (
            <Song key={item.added_at} track={item.track} />
          ))}
        </div>
      )}
    </div>
  );
};

export { SongsList };
