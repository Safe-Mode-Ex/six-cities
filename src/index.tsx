import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { store } from './store/store';
import { checkAuthAction } from './store/api-actions/api-actions';
import { ToastContainer } from 'react-toastify';
import HistoryRouter from './components/history-router/history-router';
import browserHistory from './browser-history';

const { BASE_URL } = import.meta.env;

store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory} basename={BASE_URL}>
        <ToastContainer />
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
