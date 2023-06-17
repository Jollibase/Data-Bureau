import { createReducer } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { LenderSetupActions } from './actions'
import {
  // createAdminUserActionType,
  createLenderActionType,
  LenderDetails,
} from './actionTypes'

export const initialLenderAccountFormValues = {
  name: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  state: '',
  businessType: '',
  industry: '',
}

interface LenderSetupState {
  currentStep: number
  lenderAccount?: typeof initialLenderAccountFormValues
  statusCode?: number
  lenderDetails: LenderDetails | null
}

const initialState: LenderSetupState = {
  currentStep: 1,
  lenderAccount: undefined,
  statusCode: 0,
  lenderDetails: null,
}

const LenderSetupReducer = createReducer(initialState, builder => {
  builder
    .addCase(LenderSetupActions.UPDATE_STEP, (state, _) => {
      state.currentStep++
    })
    .addCase(
      LenderSetupActions.CREATE_LENDER,
      (
        state,
        action: createLenderActionType<typeof initialLenderAccountFormValues>,
      ) => {
        const lenderAccount = action.payload
        state.lenderAccount = {
          ...lenderAccount,
          address: `${lenderAccount['address']}, ${lenderAccount['city']}, ${lenderAccount['state']}`,
        }
      },
    )
    .addCase(
      LenderSetupActions.CREATE_ADMIN_USER_START,
      (state, action: any) => {
        // Fix this
        state.statusCode = action.payload.statusCode
      },
    )
    .addCase(
      LenderSetupActions.CREATE_ADMIN_USER_DONE,
      (state, action: any) => {
        state.lenderDetails = action.payload.data
        state.statusCode = action.payload.statusCode
      },
    )
})

const persistConfig = {
  key: 'lenderSetup',
  storage,
}

const persistedReducer = persistReducer(persistConfig, LenderSetupReducer)

export default persistedReducer
