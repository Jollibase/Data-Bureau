import { UsersAction } from './user'

export interface User {
  id: number
  username: string
  email: string
  password: string
  firstName: string
  lastName: string
  isActive: boolean
  company: number
  isLenderAdmin: string
}

export interface LoginFailActionType {
  type: UsersAction.LOGIN_FAIL
  payload: {
    statusCode: number
    errorMessage: string
  }
}
