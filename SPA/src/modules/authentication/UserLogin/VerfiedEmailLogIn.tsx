import { Link, Navigate } from 'react-router-dom'
import type { loginFormData } from './d'

import { loginAction } from '@Home/store/commonActions/user'
import { useAppDispatch, useAppSelector } from '@Home/lib/hooks/redux'
import { Button, Toast } from '@Home/components'

import styles from './UserLogin.styl'

interface VerfiedEmailLogInProps {
  values: { [key: string]: string }
  handleChange: (key: keyof loginFormData, value: string) => void
}

export const VerfiedEmailLogIn = ({
  values,
  handleChange,
}: VerfiedEmailLogInProps) => {
  const { isLoggedIn, errorMessage, statusCode, loading } = useAppSelector(
    state => state.user,
  )
  const dispatch = useAppDispatch()
  const onSubmit = () => {
    dispatch(loginAction(values))
  }
  const noResultOnLoading = !errorMessage || !statusCode
  if (isLoggedIn) {
    return <Navigate to="/dashboards" />
  }

  return (
    <div className={styles.VerfiedEmailLogIn}>
      <Toast message={errorMessage} level="error" />
      <div className="verified_email__alias">
        {values.accountId ? 'Account ID (Company Alias)' : 'Email'}: &nbsp;
        {values.accountId || values.email}
      </div>
      {!!values.accountId && (
        <div className="verified_email__input_group">
          <label htmlFor="email">Email</label>
          <input
            placeholder="username@example.com"
            type="text"
            name="email"
            value={values.email}
            onChange={e => handleChange('email', e.target.value)}
          />
        </div>
      )}

      <div className="verified_email__input_group">
        <label htmlFor="password">
          <span>Password</span>
          <span>Forgot password?</span>
        </label>
        <input
          placeholder={'xxxxxx-xxxx'}
          type="password"
          name="password"
          value={values.password}
          onChange={e => handleChange('password', e.target.value)}
        />
        <Button
          onclick={onSubmit}
          text="Sign in"
          loading={loading && noResultOnLoading}
          disabled={loading && noResultOnLoading}
        />
      </div>
      <div className="verified_email__sign_another">
        <Link to="/">Sign into a different account</Link>
      </div>
    </div>
  )
}
