import { API, StorageKeys } from '@Home/lib/api'

import { AppDispatch } from '..'

export const enum UsersAction {
  LOGIN = 'UsersAction/LOGIN',
}

export const loginAction = (data: {
  email: string
  password: string
  remember: boolean
}) => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: UsersAction.LOGIN,
      payload: {
        statusCode: 0,
        isLoggedIn: false,
        errorMessage: '',
      },
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
          type: UsersAction.LOGIN,
          payload: {
            statusCode: response.status,
            isLoggedIn: true,
            errorMessage: '',
          },
        })
      })
      .catch(err => {
        dispatch({
          type: UsersAction.LOGIN,
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
