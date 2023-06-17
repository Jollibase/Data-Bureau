import { LenderSetupActions } from './actions'

export interface LenderDetails {
  id: number
  users: {
    id: number
    username: string
    email: string
    password: string
    first_name: string
    last_name: string
    isActive: boolean
    company: number
    isLenderAdmin: string
  }[]
  public: string
  name: string
  address: string
  phone: string
}

export interface createLenderActionType<T> {
  type: LenderSetupActions.CREATE_LENDER
  payload: T
}

export interface createAdminUserActionType {
  type:
    | LenderSetupActions.CREATE_ADMIN_USER_START
    | LenderSetupActions.CREATE_ADMIN_USER_DONE
  payload: {
    data?: LenderDetails
    errorMessage?: string
    statusCode: number
  }
}
