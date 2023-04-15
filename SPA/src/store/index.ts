import { configureStore } from '@reduxjs/toolkit'

import logger from '@Home/middleware/logger'

import { reducer } from './reducer'

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
