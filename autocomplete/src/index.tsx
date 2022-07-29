import { createRoot } from 'react-dom/client';

import './App.css';
import App from './App';

const container = document.querySelector('#root') as HTMLDivElement;
const root = createRoot(container);

root.render(<App />);
