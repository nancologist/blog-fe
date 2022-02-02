import { createReducer } from '@reduxjs/toolkit';
import { ThemeState } from '../../types/index';
import { toggleTheme } from './actions';

const initialState = () => {
  const isDark = Boolean(+localStorage.getItem('darkMode')!)

  return {
    isDark
  } as ThemeState;
}

export const themeReducer = createReducer(initialState, (builder) => {
  builder
  .addCase(toggleTheme, (state) => {
    state.isDark = !state.isDark;
    localStorage.setItem('darkMode', Number(state.isDark).toString())
  })
});
