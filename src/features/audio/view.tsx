import { usePlay } from './model';

const Audio = () => {
  const { ref, audio } = usePlay();

  return audio ? <audio ref={ref} src={audio}></audio> : null;
};

export { Audio };
