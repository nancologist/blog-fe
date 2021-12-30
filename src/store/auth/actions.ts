import { createAction } from '@reduxjs/toolkit';

export const setVerified = createAction<boolean>('auth/isAuth');