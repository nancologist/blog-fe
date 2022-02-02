import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Article } from '../../types/models';
import publicApi from '../../api/public';

export const fetchAll = createAsyncThunk('articlkle/fetchAll', async () => {
  try {
    const res = await publicApi.article.getAll();
    return res.data
  } catch (err) {
    // TODO: handle error in redux (like Max maybe? in 3 states ON_SUCCESS , ON_FAIL and ON_LOAD)
    console.error(err);
  }
})
export const store = createAction<Article>('article/store');
export const isEditing = createAction<boolean>('article/isEditing');