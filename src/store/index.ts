import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers';

export const store = configureStore({
  reducer: rootReducer
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {articles: ArticlesState}
export type AppDispatch = typeof store.dispatch