import { useCallback, useEffect, useRef } from 'react';
import { useStore } from 'effector-react';
import { removeAudio, $audio } from '@/models/audio';

const usePlay = () => {
  const audio = useStore($audio);
  const ref = useRef<HTMLAudioElement>(null);

  const canPlay = useCallback(() => {
    ref.current?.play();
  }, []);

  const stop = useCallback(() => {
    ref.current?.pause();
    if (ref.current) {
      ref.current.currentTime = 0;
    }
  }, []);

  const ended = useCallback(() => removeAudio(), []);

  useEffect(() => {
    if (!audio) return;
    stop();
    ref.current?.addEventListener('canplaythrough', canPlay);
    ref.current?.addEventListener('ended', ended);
  }, [audio, canPlay, stop, ended]);

  return { ref, audio };
};

export { usePlay };
