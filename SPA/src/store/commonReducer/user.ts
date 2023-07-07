import { createReducer } from '@reduxjs/toolkit'

import { UsersAction } from '../commonActions/user'
import type { LoginFailActionType, User } from '../commonActions/actionTypes'

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
    .addCase(UsersAction.LOGIN_START, (state, _) => {
      state.loading = true
      state.isLoggedIn = false
      state.errorMessage = ''
      state.statusCode = 0
    })
    .addCase(UsersAction.LOGIN_SUCCESS, (state, _) => {
      state.isLoggedIn = true
    })
    .addCase(UsersAction.LOGIN_FAIL, (state, action: LoginFailActionType) => {
      state.statusCode = action.payload.statusCode
      state.errorMessage = action.payload.errorMessage
    })
})

export default userReducer
