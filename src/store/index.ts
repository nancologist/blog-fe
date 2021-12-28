import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducer';
// ALTERNATIVE: import authReducer from './slice'

export const store = configureStore({
  reducer: authReducer
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {articles: ArticlesState}
export type AppDispatch = typeof store.dispatch

/*

Interesting about Redux Toolkit:

* initialState (creatReducer, createSlice)
    The initial state value for this slice of state. This may also be a "lazy initializer" function () => ({object}),
    which should return an initial state value when called. This will be used whenever the reducer is called with undefined as its state value,
    and is primarily useful for cases like reading initial state from localStorage.

* You may don't need explicit definining const initialState = {}, because alternatively you can use reducer.getInitialState()

* To log the "state" inside a reducer use current(state) [ import { current} from 'redux-toolkit'; ]

*/