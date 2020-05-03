import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'selectedScreen',
  initialState: 'task',
  reducers: {
    openTask: () => 'task',
    openShortcuts: () => 'shortcuts',
    openChangelog: () => 'changelog',
  },
});

export const { openTask, openShortcuts, openChangelog } = slice.actions;

export default slice.reducer;

export function getSelectedScreen(store: { selectedScreen: string }) {
  return store.selectedScreen;
}
