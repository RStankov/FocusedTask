import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'selectedScreen',
  initialState: 'task',
  reducers: {
    openTask: () => 'task',
    openShortcuts: () => 'shortcuts',
    openChangelog: () => 'changelog',
    openAbout: () => 'about',
  },
});

export const {
  openTask,
  openAbout,
  openShortcuts,
  openChangelog,
} = slice.actions;

export default slice.reducer;
