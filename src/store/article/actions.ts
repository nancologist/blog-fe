import { createAction } from '@reduxjs/toolkit';
import { Article } from '../../types/models';

export const store = createAction<Article>('article/store');
export const isEditing = createAction<boolean>('article/isEditing');