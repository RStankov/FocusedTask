import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './screens';
import store from './modules';
import { Provider } from 'react-redux';
import { resizeBasedOnContent } from 'utils/electron';

resizeBasedOnContent();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
