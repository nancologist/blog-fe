import { createReducer } from '@reduxjs/toolkit';
import { ArticleState } from '../../types/index';
import { Article } from '../../types/models';
import { store, isEditing, fetchAll } from './actions';

const initialState = {
  all: [] as Article[],
  instance: {},
  isEditing: false
} as ArticleState;

export const articleReducer = createReducer(initialState, (builder) => {
  // TODO: make these 3 one-liners:
  builder
  .addCase(fetchAll.fulfilled, (state, action) => {
    state.all = action.payload;
  })
  .addCase(store, (state, action) => {
    state.instance = action.payload;
  })
  .addCase(isEditing, (state, action) => {
    state.isEditing = action.payload;
  });
});
