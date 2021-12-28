import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false
};

const verified = createAction<boolean>('token/verified');
const invalid = createAction<boolean>('token/invalid');

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(verified, (state, action) => {
      state.isAuth = true
    })
    .addCase(invalid, (state, action) => {
      state.isAuth = false
    });
})

export default reducer;