import { Link, Navigate } from 'react-router-dom'
import { useState } from 'react'
import type { loginFormData } from './d'

import { loginAction } from '@Home/store/commonActions/user'
import { useAppDispatch, useAppSelector } from '@Home/lib/hooks/redux'
import { Button } from '@Home/components'

import styles from './UserLogin.styl'

interface VerfiedEmailLogInProps {
  values: { [key: string]: string }
  handleChange?: (key: keyof loginFormData, value: string) => void
}

export const VerfiedEmailLogIn = ({
  values,
  handleChange,
}: VerfiedEmailLogInProps) => {
  const { isLoggedIn, errorMessage, statusCode } = useAppSelector(
    state => state.user,
  )
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const onSubmit = () => {
    setIsSubmitting(true)
    dispatch(loginAction(values))
  }
  const noResultOnLoading = !errorMessage || !statusCode
  if (isLoggedIn) {
    return <Navigate to="/dashboard" />
  }

  return (
    <div className={styles.VerfiedEmailLogIn}>
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
          loading={isSubmitting && noResultOnLoading}
        />
      </div>
      <div className="verified_email__sign_another">
        <Link to="/">Sign into a different account</Link>
      </div>
    </div>
  )
}
