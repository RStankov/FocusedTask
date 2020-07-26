import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'selectedScreen',
  initialState: 'task',
  reducers: {
    openTask: () => 'task',
    openTasksList: () => 'tasksList',
    openShortcuts: () => 'shortcuts',
    openChangelog: () => 'changelog',
  },
});

export const {
  openTask,
  openTasksList,
  openShortcuts,
  openChangelog,
} = slice.actions;

export default slice.reducer;
