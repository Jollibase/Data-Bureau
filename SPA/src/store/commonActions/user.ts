import { API, StorageKeys } from '@Home/lib/api'

import { AppDispatch } from '..'

export const enum UserActions {
  LOGIN_START = 'UserActions/LOGIN_START',
  LOGIN_SUCCESS = 'UserActions/LOGIN_SUCCESS',
  LOGIN_FAIL = 'UserActions/LOGIN_FAIL',
  GET_USER = 'UserActions/GET_USER',
  LOGOUT_USER = 'UserActions/LOGOUT_USER',
}

export const loginAction = (data: {
  email?: string
  password?: string
  accountID?: string
}) => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: UserActions.LOGIN_START,
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
          type: UserActions.LOGIN_SUCCESS,
          payload: {
            statusCode: response.status,
          },
        })
      })
      .catch(err => {
        dispatch({
          type: UserActions.LOGIN_FAIL,
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

export const logoutAction = () => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: UserActions.LOGOUT_USER,
    })
    localStorage.removeItem('JolliRefreshToken')
    localStorage.removeItem('JolliAccessToken')
  }
}
