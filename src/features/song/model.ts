import { useStore, useEvent } from 'effector-react';
import { $audio, removeAudio, setAudio } from '@/models/audio';

const useInfo = (track: SpotifyApi.SavedTrackObject['track']) => {
  const audio = useStore($audio);
  const image = track.album.images.filter(Boolean).at(-1)?.url;
  const albumName = track.album.name;
  const artists = track.artists.map(({ name }) => name).join(', ');
  const songName = track.name;
  const isActive = audio === track.preview_url;
  const trackPreviewNull = track.preview_url === null;

  const removeAudioHandler = useEvent(removeAudio);
  const setAudioHandler = useEvent(setAudio);

  const handleActive = () => {
    if (trackPreviewNull) return;
    isActive ? removeAudioHandler() : setAudioHandler(track.preview_url);
  };

  return {
    image,
    albumName,
    artists,
    songName,
    isActive,
    handleActive,
    trackPreviewNull,
  };
};

export { useInfo };
