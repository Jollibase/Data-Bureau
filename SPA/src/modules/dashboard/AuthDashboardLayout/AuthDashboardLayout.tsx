import { isPlainObject, has } from 'lodash'
import { useLoaderData, Navigate } from 'react-router-dom'

import { useAppSelector } from '@Home/lib/hooks/redux'

export const AuthDashboardLayout = () => {
  const user = useLoaderData()
  const { isLoggedIn } = useAppSelector(state => state.user)

  if ((isPlainObject(user) && has(user, 'name')) || isLoggedIn) {
    return (
      <div style={{ background: 'blue', height: '100vh', width: '100%' }}></div>
    )
  }

  return <Navigate to="/login" />
}
