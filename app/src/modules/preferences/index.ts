import { createSlice } from '@reduxjs/toolkit';

export const themes = ['light' , 'dark'] as const
export type Theme = typeof themes[number];

interface IPreferences {
  theme: Theme
};

const initialState: IPreferences = { theme: initialLoadTheme() };

export const slice = createSlice({
  name: 'selectedScreen',
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      state.theme = action.payload
    },
  },
});

export const {
  changeTheme
} = slice.actions;

export default slice.reducer;



function initialLoadTheme(): Theme {
  const isOsDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  return isOsDarkMode ? 'dark' : 'light'
}


