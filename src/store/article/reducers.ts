import { createReducer } from '@reduxjs/toolkit';
import { ArticleState } from '../../types/index';
import { store, isEditing } from './actions';

const initialState = {
  instance: {},
  isEditing: false
} as ArticleState;

export const articleReducer = createReducer(initialState, (builder) => {
  builder
  .addCase(store, (state, action) => {
    state.instance = action.payload;
  })
  .addCase(isEditing, (state, action) => {
    state.isEditing = action.payload;
  });
});
