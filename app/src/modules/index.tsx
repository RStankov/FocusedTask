import { configureStore } from '@reduxjs/toolkit';
import { throttle } from 'lodash';
import { preloadStore, saveStore } from 'utils/stateRestore';

import task from './task';
import selectedScreen from './selectedScreen';
import undoable from './undoable';

const store = configureStore({
  reducer: {
    task: undoable(task),
    selectedScreen,
  },
  preloadedState: preloadStore(),
});

store.subscribe(throttle(() => saveStore(store.getState())));

export type IStoreState = ReturnType<typeof store.getState>;

export default store;
