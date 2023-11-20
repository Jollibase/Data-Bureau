import { camelize } from '@Home/lib/utils'
import { store } from '@Home/store'

import { AuthenticatedAPI, API } from '@Lib/api'

export const getUser = async () => {
  return AuthenticatedAPI.get('accounts/me/')
    .then(response => {
      const user = camelize(response.data)
      store.dispatch({
        type: 'UserActions/GET_USER',
        payload: {
          user,
        },
      })
      return user
    })
    .catch(err => 'API Error: Check internet')
}

export const getCompanyCount = async () => {
  return API.get('/accounts/join-waitlist/')
    .then(response => response.data)
    .catch(_ => 'API Error: Check internet')
}
