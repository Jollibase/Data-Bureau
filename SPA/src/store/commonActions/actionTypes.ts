import { UsersAction } from './user'

export interface LoginActionType {
  type: UsersAction.LOGIN
  payload: {
    isLoggedIn: boolean
    statusCode: number
    errorMessage: string
  }
}
