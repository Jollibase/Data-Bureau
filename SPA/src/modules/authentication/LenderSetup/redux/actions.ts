import { createAction } from '@reduxjs/toolkit'

export const enum LenderSetupActions {
  UPDATE_STEP = 'LENDER_SETUP_ACTIONS/UPDATE_STEP',
}

export const updateCurrentStep = createAction<undefined>(
  LenderSetupActions.UPDATE_STEP,
)
