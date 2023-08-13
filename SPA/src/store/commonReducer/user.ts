import { createReducer } from '@reduxjs/toolkit'

import { UserActions } from '../commonActions/user'
import type {
  GetUserActionType,
  LoginFailActionType,
  LoginSuccessActionType,
  User,
} from '../commonActions/actionTypes'

interface UserState {
  user?: User
  lender: {
    name: string
    address: string
    phone: string
    public: string
  }
  isLoggedIn?: boolean
  errorMessage?: string
  statusCode?: number
  loading?: boolean
}

const initialState: Partial<UserState> = {}

const userReducer = createReducer(initialState, builder => {
  builder
    .addCase(UserActions.LOGIN_START, (state, _) => {
      state.loading = true
      state.isLoggedIn = false
      state.errorMessage = ''
      state.statusCode = 0
    })
    .addCase(
      UserActions.LOGIN_SUCCESS,
      (state, action: LoginSuccessActionType) => {
        state.isLoggedIn = true
        state.loading = false
        state.statusCode = action.payload.statusCode
      },
    )
    .addCase(UserActions.LOGIN_FAIL, (state, action: LoginFailActionType) => {
      state.statusCode = action.payload.statusCode
      state.errorMessage = action.payload.errorMessage
    })
    .addCase(UserActions.GET_USER, (state, action: GetUserActionType) => {
      state.user = action.payload.user
    })
    .addCase(UserActions.LOGOUT_USER, (state, _) => {
      state.isLoggedIn = false
    })
})

export default userReducer
