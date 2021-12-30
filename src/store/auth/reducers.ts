import { createReducer } from '@reduxjs/toolkit';
import { AuthState } from '../../types';
import { setVerified } from './actions';

const initialState = {
  verified: false
} as AuthState;

export const authReducer = createReducer(initialState, (builder) => {
  builder
  .addCase(setVerified, (state, action) => {
    state.verified = action.payload;
  });
});
