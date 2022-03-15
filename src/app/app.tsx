import { useGate } from 'effector-react';
import { Login } from '@/features/login';
import { mountGate } from '@/models/auth';

const App = () => {
  useGate(mountGate);

  return (
    <>
      <h1>hello</h1>
      <Login />
    </>
  );
};

export { App };
