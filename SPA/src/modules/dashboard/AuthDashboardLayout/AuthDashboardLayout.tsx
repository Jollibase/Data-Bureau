import { isPlainObject, has } from 'lodash'
import { useLoaderData, Navigate, Link } from 'react-router-dom'

import { useAppSelector } from '@Home/lib/hooks/redux'

export const AuthDashboardLayout = () => {
  const user = useLoaderData()
  const { isLoggedIn } = useAppSelector(state => state.user)

  if ((isPlainObject(user) && has(user, 'name')) || isLoggedIn) {
    return (
      <div style={{ background: 'blue', height: '100vh', width: '100px' }}>
        <Link to="/login">asdjsjd</Link>
      </div>
    )
  }

  return <Navigate to="/login" />
}
