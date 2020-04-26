import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'selectedScreen',
  initialState: 'task',
  reducers: {
    openShortcuts: () => 'shortcuts',
    openTask: () => 'task',
  },
});

export const { openShortcuts, openTask } = slice.actions;

export default slice.reducer;

export function getSelectedScreen(store) {
  return store => store.selectedScreen;
}
