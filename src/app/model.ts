import { useEffect } from 'react';
import { useEvent } from 'effector-react';
import { getAuth } from '@/models/auth';

const useAuth = () => {
  const getAuthHandler = useEvent(getAuth);

  useEffect(() => {
    getAuthHandler();
  }, [getAuthHandler]);
};

export { useAuth };
