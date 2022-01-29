import { createReducer } from '@reduxjs/toolkit';
import { ThemeState } from '../../types/index';
import { toggleTheme } from './actions';

const initialState = {
  isDark: false
} as ThemeState;

export const themeReducer = createReducer(initialState, (builder) => {
  builder
  .addCase(toggleTheme, (state) => {
    state.isDark = !state.isDark;
  })
});
