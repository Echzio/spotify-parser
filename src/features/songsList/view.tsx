import SpotifyWebApi from 'spotify-web-api-js';
import { Song } from '@/features/song';
import { useSongs, useVirtual } from './model';

const SongsList: React.FC<{ spotify: SpotifyWebApi.SpotifyWebApiJs }> = ({ spotify }) => {
  const { songs } = useSongs(spotify);
  const { onScroll, rootHeight, virtualStart, visibleItems, topHeight, bottomHeight } = useVirtual(songs.items?.length ?? 0, 7, 80);

  return (
    <div className="flex flex-col gap-y-4">
      <p className="text-white text-lg font-bold">Saved tracks:</p>
      {songs.items && (
        <div style={{ height: rootHeight }} onScroll={onScroll} className="overflow-auto">
          <div style={{ height: topHeight }}></div>
          {songs.items.slice(virtualStart, virtualStart + visibleItems + 1).map(item => (
            <Song key={item.added_at + item.track.id} track={item.track} />
          ))}
          <div style={{ height: bottomHeight }}></div>
        </div>
      )}
    </div>
  );
};

export { SongsList };
