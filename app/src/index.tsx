import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Screen from './screens';
import store from './modules';
import { Provider } from 'react-redux';
import { resizeBasedOnContent } from 'utils/electron';
import AppDrag from './components/AppDrag';

resizeBasedOnContent();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppDrag />
      <Screen />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
