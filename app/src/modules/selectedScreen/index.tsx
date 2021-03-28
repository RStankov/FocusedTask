import { createSlice } from '@reduxjs/toolkit';
import { IScreens } from 'screens/screens';

const initialState = 'task' as IScreens;

export const slice = createSlice({
  name: 'selectedScreen',
  initialState,
  reducers: {
    openTask: () => 'task' as 'task',
    openShortcuts: () => 'shortcuts' as 'shortcuts',
    openPreferences: () => 'preferences' as 'preferences',
    openChangelog: () => 'changelog' as 'changelog',
    openAbout: () => 'about' as 'about',
  },
});

export const {
  openTask,
  openShortcuts,
  openAbout,
  openPreferences,
  openChangelog,
} = slice.actions;

export default slice.reducer;
