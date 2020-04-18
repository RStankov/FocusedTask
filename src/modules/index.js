import { configureStore } from '@reduxjs/toolkit';
import task from './task';

export default configureStore({
  reducer: {
    task,
  },
});
