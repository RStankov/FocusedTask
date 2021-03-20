import { createSlice } from '@reduxjs/toolkit';
import storage from 'utils/storage'

export const themes = ['light' , 'dark'] as const
export type Theme = typeof themes[number];

interface ThemeState {
  theme: Theme
};

const initialState: ThemeState = { theme: initialLoadTheme() };

export const slice = createSlice({
  name: 'selectedScreen',
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      const theme = action.payload
      storage.set('theme', theme)
      setThemeAttribute(theme)
      state.theme = theme
    },
  },
});

export const {
  changeTheme
} = slice.actions;

export default slice.reducer;



function initialLoadTheme(): Theme {
  try {
    const savedTheme = storage.get('theme')
    const isOsDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    const theme = (() => {
      if(savedTheme && themes.includes(savedTheme)) return savedTheme
      if(isOsDarkMode) return 'dark'
      return 'light'
    })() as Theme
    setThemeAttribute(theme)
    return theme
  } catch {
    // defaults to light theme if not available from OS or local storage
    const theme = 'light'
    setThemeAttribute(theme)
    return theme
  }
}


function setThemeAttribute(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
}