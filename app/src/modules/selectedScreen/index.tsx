import { createSlice } from '@reduxjs/toolkit';
import { Screens } from 'screens/screens';

interface ScreenState {
  screen: Screens
};

const initialState: ScreenState = { screen: 'task' };

export const slice = createSlice({
  name: 'selectedScreen',
  initialState,
  reducers: {
    openTask: (state) => { state.screen = 'task'},
    openShortcuts: (state) => { state.screen = 'shortcuts'},
    openPreferences: (state) => { state.screen = 'preferences'},
    openChangelog: (state) => { state.screen = 'changelog'},
    openAbout: (state) => { state.screen = 'about'},
  },
});

export const {
  openTask,
  openShortcuts,
  openAbout,
  openChangelog,
} = slice.actions;

export default slice.reducer;
