import { render } from 'react-dom';
import { App } from '@/app/app';

import '@/models/init';

import '@/assets/styles/root.css';

render(<App />, document.getElementById('app'));
