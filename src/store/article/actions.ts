import { createAction } from '@reduxjs/toolkit';
import { Article } from '../../types/models';

export const storeAll = createAction<Article[]>('article/storeAll');
export const store = createAction<Article>('article/store');
export const isEditing = createAction<boolean>('article/isEditing');