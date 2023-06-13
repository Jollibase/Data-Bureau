import { API } from '@Home/lib/api'
import { camelize, snakify } from '@Home/lib/utils'
import { AppDispatch, RootState } from '@Home/store'
import { createAction } from '@reduxjs/toolkit'

export const enum LenderSetupActions {
  UPDATE_STEP = 'LENDER_SETUP_ACTIONS/UPDATE_STEP',
  CREATE_LENDER = 'LENDER_SETUP_ACTIONS/CREATE_LENDER',
  CREATE_ADMIN_USER = 'LENDER_SETUP_ACTIONS/CREATE_ADMIN_USER',
}

export const updateCurrentStep = createAction<undefined>(
  LenderSetupActions.UPDATE_STEP,
)

export const createLenderAccount = createAction<{ [key: string]: string }>(
  LenderSetupActions.CREATE_LENDER,
)

export const createAdminUser =
  values => (dispatch: AppDispatch, getState: () => RootState) => {
    const { lenderAccount } = getState().lenderSetup

    const data = snakify({
      users: [values],
      ...lenderAccount,
    })
    API.post('client/signup/', JSON.stringify(data))
      .then(response => {
        dispatch({
          type: LenderSetupActions.CREATE_ADMIN_USER,
          payload: {
            statusCode: response.status,
            data: camelize(response.data),
          },
        })
      })
      .catch(err => {
        dispatch({
          type: LenderSetupActions.CREATE_ADMIN_USER,
          payload: {
            statusCode: err.response.status,
            errorMessage: err.response
              ? err.response.data.details
              : 'Connection refused',
          },
        })
      })
  }
