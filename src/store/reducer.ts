import { createAction, createReducer, current } from "@reduxjs/toolkit";

interface AuthState {
  isAuth: boolean;
}

const initialState = {
  isAuth: false
} as AuthState;

export const accept = createAction('auth/accept');
export const reject = createAction('auth/reject');

const authReducer = createReducer({ isAuth: false }, (builder) => {
  builder
    .addCase(accept.type, (state, action) => {
      state.isAuth = true
    })
    .addCase(reject.type, (state, action) => {
      state.isAuth = false
    });
})

export default authReducer;