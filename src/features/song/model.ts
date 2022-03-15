import { useStore } from 'effector-react';
import { $audio } from '@/models/audio';

const useInfo = (track: SpotifyApi.SavedTrackObject['track']) => {
  const audio = useStore($audio);
  const image = track.album.images.filter(Boolean)[0].url;
  const albumName = track.album.name;
  const artists = track.artists.map(({ name }) => name).join(', ');
  const songName = track.name;
  const isActive = audio === track.preview_url;

  return {
    image,
    albumName,
    artists,
    songName,
    isActive,
  };
};

export { useInfo };
