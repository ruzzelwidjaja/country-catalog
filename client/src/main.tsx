import React from 'react';
import ReactDOM from 'react-dom/client';
import { inject } from '@vercel/analytics';
import App from './App';
import './index.css';

// Vercel Analytics configuration
inject({
  mode: import.meta.env.PROD ? 'production' : 'development',
  debug: !import.meta.env.PROD,
  beforeSend: (event) => {
    if (event.url.includes('/private')) {
      return null;
    }
    return event;
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
