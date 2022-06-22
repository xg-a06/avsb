import ReactDOM from 'react-dom/client';
import './index.global.css';
import App from './app';

const container = document.getElementById('root')!;
const root = ReactDOM.createRoot(container);

root.render(<App />);
