import { configureStore } from '@reduxjs/toolkit';
import task from './task';
import storage from 'utils/storage';
import { throttle } from 'lodash';

const store = configureStore({
  reducer: {
    task,
  },
  preloadedState: storage.get('reduxStore', {}),
});

store.subscribe(
  throttle(() => {
    storage.set('reduxStore', store.getState());
  }),
);

export default store;
