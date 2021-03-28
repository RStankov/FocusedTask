import { createSlice } from '@reduxjs/toolkit';

export const themes = ['light', 'dark'] as const;
export type ITheme = typeof themes[number];

interface IPreferences {
  theme: ITheme;
}

export const slice = createSlice({
  name: 'selectedScreen',
  initialState: {
    theme: initialLoadTheme(),
  } as IPreferences,
  reducers: {
    changeTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { changeTheme } = slice.actions;

export default slice.reducer;

function initialLoadTheme(): ITheme {
  const isOsDarkMode =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  return isOsDarkMode ? 'dark' : 'light';
}
