import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import reportWebVitals from './reportWebVitals';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import {store} from './redux/store';

import './index.css';

ReactDOM.render(
    <CookiesProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </CookiesProvider>,
  document.getElementById('root')
);

reportWebVitals();
