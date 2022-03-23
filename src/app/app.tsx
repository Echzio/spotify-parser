import { useStore } from 'effector-react';
import { $token } from '@/models/auth';
import { $spotify } from '@/models/spotify';
import { Login } from '@/features/login';
import { Name } from '@/features/name';
import { SongsList } from '@/features/songsList';
import { Audio } from '@/features/audio';

import { useAuth } from './model';

const App = () => {
  useAuth();

  const token = useStore($token);
  const spotify = useStore($spotify);

  if (!token)
    return (
      <div data-testid="without-token" className="w-full h-full flex-grow flex justify-center items-center">
        <Login />
      </div>
    );

  if (spotify === null) return null;

  return (
    <div data-testid="with-token" className="grid p-4 pb-8">
      <Name spotify={spotify} />
      <div className="mt-14">
        <SongsList spotify={spotify} />
      </div>
      <Audio />
    </div>
  );
};

export { App };
