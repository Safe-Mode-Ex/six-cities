import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { OFFERS } from './mocks/offers';
import { CITIES } from './mocks/cities';
import * as Settings from './settings';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offers={OFFERS} cities={CITIES} settings={Settings} />
  </React.StrictMode>
);
