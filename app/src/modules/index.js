import { configureStore } from '@reduxjs/toolkit';
import storage from 'utils/storage';
import { throttle } from 'lodash';

import task from './task';
import selectedScreen from './selectedScreen';

const store = configureStore({
  reducer: {
    task,
    selectedScreen,
  },
  preloadedState: storage.get('reduxStore', {}),
});

store.subscribe(
  throttle(() => {
    storage.set('reduxStore', store.getState());
  }),
);

export default store;
