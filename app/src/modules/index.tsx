import { configureStore } from '@reduxjs/toolkit';
import storage from 'utils/storage';
import { throttle } from 'lodash';

import task from './task';
import selectedScreen from './selectedScreen';
import undoable from './undoable';

const store = configureStore({
  reducer: {
    task: undoable(task),
    selectedScreen,
  },
  // TODO(rstankov): Restore when format is restored
  preloadedState: storage.get('reduxStore', {}),
});

store.subscribe(
  throttle(() => {
    storage.set('reduxStore', store.getState());
  }),
);

export type IStoreState = ReturnType<typeof store.getState>;

export default store;
