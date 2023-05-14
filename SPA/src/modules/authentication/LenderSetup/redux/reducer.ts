import { createReducer } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { LenderSetupActions } from './actions'

interface LenderSetupState {
  currentStep: number
}

const initialState: LenderSetupState = {
  currentStep: 1,
}

const LenderSetupReducer = createReducer(initialState, builder => {
  builder.addCase(LenderSetupActions.UPDATE_STEP, (state, action) => {
    state.currentStep++
  })
})

const persistConfig = {
  key: 'lenderSetup',
  storage,
  whitelist: ['currentStep'],
}

const persistedReducer = persistReducer(persistConfig, LenderSetupReducer)

export default persistedReducer
