import Axios from 'axios'

export const API = Axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: { 'content-type': 'application/json' },
  timeout: 30000,
})

export const AuthenticatedAPI = Axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: { 'content-type': 'application/json' },
  timeout: 30000,
})

export const enum StorageKeys {
  ACCESS_TOKEN_KEY = 'JolliAccessToken',
  REFRESH_TOKEN_KEY = 'JolliRefreshToken',
  LAST_VISITED_URL = 'lastVisitedUrl',
}

AuthenticatedAPI.interceptors.request.use((config: any) => {
  const accessToken = JSON.parse(
    localStorage.getItem(StorageKeys.ACCESS_TOKEN_KEY),
  )
  const newConfig = {
    ...config,
    headers: {
      ...config.headers,
      Authorization: accessToken ? `Bearer ${accessToken}` : null,
    },
  }

  return newConfig
})
