import { useInfo } from './model';
import './style.css';

const Song: React.FC<{ track: SpotifyApi.SavedTrackObject['track'] }> = ({ track }) => {
  const { image, albumName, artists, songName, isActive, handleActive } = useInfo(track);

  return (
    <button
      type="button"
      className="text-white flex gap-x-4 py-4 items-start hover:opacity-70 transition-opacity duration-150 h-20"
      onClick={handleActive}>
      <div className="w-12 relative flex-shrink-0">
        <img src={image} alt={albumName} className="w-full h-full object-cover" />
        {isActive && (
          <div className="bg-green/70 absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <img src="/assets/images/play.svg" />
          </div>
        )}
      </div>
      <div>
        <p className="song-name">
          {artists} - {songName}
        </p>
      </div>
    </button>
  );
};

export { Song };
