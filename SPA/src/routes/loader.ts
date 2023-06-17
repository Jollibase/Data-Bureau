import { AuthenticatedAPI } from '@Lib/api'

export const getUser = async () => {
  return AuthenticatedAPI.get('client/me/')
    .then(response => response.data)
    .catch(err => 'API Error: Check internet')
}
