import { configureStore } from '@reduxjs/toolkit';
import { throttle } from 'lodash';
import { preloadStore, saveStore } from 'utils/stateRestore';

import task from './task';
import tasks from './tasks';
import selectedScreen from './selectedScreen';

const store = configureStore({
  reducer: {
    tasks: tasks(task),
    selectedScreen,
  },
  preloadedState: preloadStore(),
});

store.subscribe(throttle(() => saveStore(store.getState())));

export type IStoreState = ReturnType<typeof store.getState>;

export default store;
