import { configureStore } from '@reduxjs/toolkit';
import { throttle } from 'lodash';
import { preloadStore, saveStore } from 'utils/stateRestore';
import tasks from './tasks';
import selectedScreen from './selectedScreen';
import preferences from './preferences';

const store = configureStore({
  reducer: {
    tasks,
    selectedScreen,
    preferences,
  },
  preloadedState: preloadStore(),
});

store.subscribe(throttle(() => saveStore(store.getState())));

export type IStoreState = ReturnType<typeof store.getState>;

export default store;
