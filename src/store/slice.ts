/*

createSlice ================================================================
  * it's an alternative to createReducer which we used in /store/reducer.ts
  * it uses createAction and createReducer

*/

import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  isAuth: boolean;
}

const initialState = { isAuth: false } as AuthState;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    accept: (state) => {
      state.isAuth = true;
    },
    reject: (state) => {
      state.isAuth = false;
    }
  }
});

export const { accept, reject } = authSlice.actions;
export default authSlice.reducer;