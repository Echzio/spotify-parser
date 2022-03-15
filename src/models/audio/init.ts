import { createEvent, createStore } from 'effector';

const $audio = createStore<string>('');

const setAudio = createEvent<string>();

const removeAudio = createEvent();

$audio.on(setAudio, (_, audio) => audio);

$audio.on(removeAudio, () => '');

export { $audio, setAudio, removeAudio };
