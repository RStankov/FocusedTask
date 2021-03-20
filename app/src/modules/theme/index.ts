import { createSlice } from '@reduxjs/toolkit';
import storage from 'utils/storage'

const themes = ['light' , 'dark'] as const
export type Themes = typeof themes[number];

interface ThemeState {
  theme: Themes
};

const initialState: ThemeState = { theme: initialLoadTheme() };

export const slice = createSlice({
  name: 'selectedScreen',
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      const theme = action.payload
      console.log('state: ', state)
      console.log('action: ', action)
      storage.set('theme', theme)
      document.documentElement.setAttribute("data-theme", theme);
      state.theme = theme
    },
  },
});

export const {
  changeTheme
} = slice.actions;

export default slice.reducer;



function initialLoadTheme(): Themes {
  try {
    const savedTheme = storage.get('theme')
    const isOsDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    const theme = (() => {
      if(savedTheme) return savedTheme
      if(isOsDarkMode) return 'dark'
      return 'light'
    })() as Themes
    document.documentElement.setAttribute("data-theme", theme);
    return theme
  } catch {
    // defaults to light theme if not available from OS or local storage
    const theme = 'light'
    document.documentElement.setAttribute("data-theme", theme);
    return theme
  }
}


