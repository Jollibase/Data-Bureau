import { LenderSetupActions } from './actions'

export interface createLenderActionType<T> {
  type: LenderSetupActions.CREATE_LENDER
  payload: T
}

export interface createAdminUserActionType {
  type: LenderSetupActions.CREATE_ADMIN_USER
  payload: {
    data?: {}
    errorMessage: string
    statusCode: number
  }
}
