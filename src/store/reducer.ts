import { createAction, createReducer } from "@reduxjs/toolkit";

// STATE:
interface AuthState {
  isAuth: boolean;
}
const initialState = {
  isAuth: false
} as AuthState;

// TODO: Outsource Actions to its own module:
// ACTIONS:
export const accept = createAction('auth/accept');
export const reject = createAction('auth/reject');

// THUNKS:
// export const checkToken = createAsyncThunk(
//   'auth/check',
//   async (token: string) => {
//     await api.auth.checkToken(token)
//   }
// )

// REDUCER:
const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(accept.type, (state, action) => {
      state.isAuth = true
    })
    .addCase(reject.type, (state, action) => {
      state.isAuth = false
    });
})

export default authReducer;