import { camelize } from '@Home/lib/utils'
import { store } from '@Home/store'

import { AuthenticatedAPI } from '@Lib/api'

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
