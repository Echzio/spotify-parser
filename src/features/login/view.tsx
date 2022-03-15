import { link } from './model';

const Login = () => {
  return (
    <a href={link} className="block bg-green text-white p-4 text-lg rounded-lg hover:opacity-70 transition-opacity duration-150">
      Login with Spotify
    </a>
  );
};

export { Login };
