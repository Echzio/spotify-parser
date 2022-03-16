import SpotifyWebApi from 'spotify-web-api-js';
import { Song } from '@/features/song';
import { useSongs, useVirtual, useDownload } from './model';
import './style.css';

const SongsList: React.FC<{ spotify: SpotifyWebApi.SpotifyWebApiJs }> = ({ spotify }) => {
  const { songs, complete } = useSongs(spotify);
  const { onScroll, rootHeight, virtualStart, visibleItems, topHeight, bottomHeight } = useVirtual(songs.items?.length ?? 0, 7, 80);

  const link = useDownload(songs.items ?? [], complete);

  return (
    <div className="flex flex-col gap-y-4 items-start">
      <p className="text-white text-lg font-bold">
        Saved tracks: {complete ? 'parsed!' : `parsing...${songs.items?.length ?? 0}/${songs.total ?? 0}`}
      </p>
      {link && (
        <a href={link} download="songs.txt" className="text-white underline hover:opacity-70 transition-opacity duration-150">
          Download my saved library
        </a>
      )}
      {songs.items && (
        <div style={{ height: rootHeight }} onScroll={onScroll} className="songs-wrapper">
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
