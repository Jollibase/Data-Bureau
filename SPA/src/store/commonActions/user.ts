import { API, StorageKeys } from '@Home/lib/api'

import { AppDispatch } from '..'

export const enum UsersAction {
  LOGIN_START = 'UsersAction/LOGIN_START',
  LOGIN_SUCCESS = 'UsersAction/LOGIN_SUCCESS',
  LOGIN_FAIL = 'UsersAction/LOGIN_FAIL',
}

export const loginAction = (data: {
  email?: string
  password?: string
  accountID?: string
}) => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: UsersAction.LOGIN_START,
    })
    const jsonData = JSON.stringify(data)
    API.post('client/login/', jsonData)
      .then(response => {
        localStorage.setItem(
          StorageKeys.ACCESS_TOKEN_KEY,
          JSON.stringify(response.data.access),
        )
        localStorage.setItem(
          StorageKeys.REFRESH_TOKEN_KEY,
          JSON.stringify(response.data.refresh),
        )

        dispatch({
          type: UsersAction.LOGIN_SUCCESS,
          payload: {
            statusCode: response.status,
          },
        })
      })
      .catch(err => {
        dispatch({
          type: UsersAction.LOGIN_FAIL,
          payload: {
            statusCode: err.response.status,
            isLoggedIn: false,
            errorMessage: err.response
              ? err.response.data.non_field_errors[0]
              : 'Connection refused',
          },
        })
      })
  }
}
