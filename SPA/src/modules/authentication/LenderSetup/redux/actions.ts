/* eslint-disable indent */
import { API } from '@Home/lib/api'
import { camelize, snakify } from '@Home/lib/utils'
import { AppDispatch, RootState } from '@Home/store'
import { createAction } from '@reduxjs/toolkit'

export const enum LenderSetupActions {
  UPDATE_STEP = 'LENDER_SETUP_ACTIONS/UPDATE_STEP',
  CREATE_LENDER = 'LENDER_SETUP_ACTIONS/CREATE_LENDER',
  CREATE_ADMIN_USER_START = 'LENDER_SETUP_ACTIONS/CREATE_ADMIN_USER_START',
  CREATE_ADMIN_USER_DONE = 'LENDER_SETUP_ACTIONS/CREATE_ADMIN_USER_DONE',
  RESEND_VERIFICATION = 'LENDER_SETUP_ACTIONS/RESEND_VERIFICATION',
}

export const updateCurrentStep = createAction<undefined>(
  LenderSetupActions.UPDATE_STEP,
)

export const createLenderAccount = createAction<{ [key: string]: string }>(
  LenderSetupActions.CREATE_LENDER,
)

export const createAdminUser =
  (values: { [key: string]: string }) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch({
      type: LenderSetupActions.CREATE_ADMIN_USER_START,
      payload: {
        statusCode: 0,
      },
    })
    delete values['password2']

    const { lenderAccount } = getState().lenderSetup
    const data = snakify({
      user: values,
      ...lenderAccount,
    })
    API.post('client/signup/', JSON.stringify(data))
      .then(response => {
        dispatch({
          type: LenderSetupActions.CREATE_ADMIN_USER_DONE,
          payload: {
            statusCode: response.status,
            data: camelize(response.data),
          },
        })
      })
      .catch(err => {
        dispatch({
          type: LenderSetupActions.CREATE_ADMIN_USER_DONE,
          payload: {
            statusCode: err.response.status,
            errorMessage: err.response
              ? err.response.data.details
              : 'Connection refused',
          },
        })
      })
  }

export const resendVerification =
  (email: string) => (dispatch: AppDispatch) => {
    API.get(`client/resend_verification/?email=${email}`)
      .then(response => {
        dispatch({
          type: LenderSetupActions.RESEND_VERIFICATION,
          payload: {
            statusCode: response.status,
          },
        })
      })
      .catch(err => {
        dispatch({
          type: LenderSetupActions.RESEND_VERIFICATION,
          payload: {
            statusCode: err.response.status,
            errorMessage: err.response
              ? err.response.data.details
              : 'Connection refused',
          },
        })
      })
  }
