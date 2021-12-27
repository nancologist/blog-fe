import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {}
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {articles: ArticlesState}
export type AppDispatch = typeof store.dispatch