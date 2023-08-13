import { UserActions } from './user'

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
  type: UserActions.LOGIN_FAIL
  payload: {
    statusCode: number
    errorMessage: string
  }
}

export interface GetUserActionType {
  type: UserActions.GET_USER
  payload: {
    user: User
  }
}

export interface LoginSuccessActionType {
  type: UserActions.LOGIN_SUCCESS
  payload: {
    statusCode: number
  }
}
