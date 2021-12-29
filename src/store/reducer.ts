import { createAction, createReducer } from "@reduxjs/toolkit";
import { Article } from "../types/models";

// STATE:
interface AuthState {
  isAuth: boolean;
  article: Article;
  isEditing: boolean;
}
const initialState = {
  isAuth: false,
  isEditing: false,
  article: {}
} as AuthState;

// TODO: Outsource Actions to its own module:
// ACTIONS:
export const accept = createAction('auth/accept');
export const reject = createAction('auth/reject');

export const storeArticle = createAction<Article>('article/store');
export const isEditing = createAction<boolean>('article/isEditing');

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
    })
    
    .addCase(storeArticle, (state, action) => {
      state.article = action.payload;
    })
    .addCase(isEditing, (state, action) => {
      state.isEditing = action.payload;
    })
})

export default authReducer;