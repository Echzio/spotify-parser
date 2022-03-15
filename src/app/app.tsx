import { useGate, useStore } from 'effector-react';
import { mountGate } from '@/models/mount';
import { $token } from '@/models/auth';
import { $spotify } from '@/models/spotify';
import { Login } from '@/features/login';
import { Name } from '@/features/name';
import { SongsList } from '@/features/songsList';
import { Audio } from '@/features/audio';

const App = () => {
  const token = useStore($token);
  const spotify = useStore($spotify);
  useGate(mountGate);

  if (!token) return <div className="w-full h-full flex-grow flex justify-center items-center">{!token && <Login />}</div>;

  if (spotify === null) return null;

  return (
    <div className="grid p-4 pb-8">
      <Name spotify={spotify} />
      <div className="mt-14">
        <SongsList spotify={spotify} />
      </div>
      <Audio />
    </div>
  );
};

export { App };
