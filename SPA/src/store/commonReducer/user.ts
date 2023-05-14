import { createReducer } from '@reduxjs/toolkit'

import { UsersAction } from '../commonActions/user'
import { LoginActionType } from '../commonActions/actionTypes'

interface UserState {
  user?: {
    id: number
    user: [
      {
        id: number
        username: string
        email: string
        password: string
        first_name: string
        last_name: string
        is_active: boolean
        company: number
        isLenderAdmin: string
      },
    ]
    name: string
    address: string
    phone: string
    public: string
  }
  isLoggedIn?: boolean
  errorMessage?: string
  statusCode?: number
}

const initialState: Partial<UserState> = {}

const userReducer = createReducer(initialState, builder => {
  builder.addCase(UsersAction.LOGIN, (state, action: LoginActionType) => {
    state.isLoggedIn = action.payload.isLoggedIn
    state.errorMessage = action.payload.errorMessage
    state.statusCode = action.payload.statusCode
  })
})

export default userReducer
