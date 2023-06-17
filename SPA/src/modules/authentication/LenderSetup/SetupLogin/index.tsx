import ClassNames from 'classnames'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { Link, Navigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@Home/lib/hooks/redux'
import { loginAction } from '@Home/store/commonActions/user'
import { Button, Input } from '@Home/components'

import { ReactComponent as DataImg } from '@Images/data.svg'
import style from './SetupLogins.styl'

interface SetupLoginProps {
  classname?: string
}

const initialValues = { email: '', password: '', remember: false }
const validateSchema = Yup.object({
  email: Yup.string()
    .email('Email address is invalid')
    .required('Email is required'),
  password: Yup.string().required('Pasword is required'),
})

export const SetupLogin = ({ classname }: SetupLoginProps) => {
  const dispatch = useAppDispatch()
  const { isLoggedIn, errorMessage, statusCode } = useAppSelector(
    state => state.user,
  )

  const login = value => dispatch(loginAction(value))

  const handleSubmit = (values: typeof initialValues) => {
    login(values)
  }

  const noResultOnLoading = !errorMessage || !statusCode
  if (isLoggedIn) {
    return <Navigate to="/dashboard" />
  }

  return (
    <div className={ClassNames(style.SetupLogin, classname)}>
      <div className="login">
        <div className="login__image">
          <DataImg />
        </div>
        <div className="login__form">
          <div className="login__form__header">
            <h4>Sign into Account</h4>
            <p>Your decisive power awaits</p>
          </div>
          <Formik
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validationSchema={validateSchema}>
            {({ handleSubmit, getFieldProps, isSubmitting }) => (
              <form>
                <Input
                  classname="login__form__input"
                  label="Email Address"
                  placeholder="john.dowry@example.com"
                  type="email"
                  {...getFieldProps('email')}
                />
                <Input
                  classname="login__form__input"
                  label="Password"
                  placeholder="xxxxxx-xxxxxx-xxxxx"
                  type="password"
                  {...getFieldProps('password')}
                />
                <small>Forgot Password?</small>
                <Input
                  type="checkbox"
                  label="Remember me"
                  containerClassName="login__form__input__checkbox"
                  name="remember"
                />
                <Button
                  primary
                  text="Login"
                  onclick={handleSubmit}
                  loading={isSubmitting && noResultOnLoading}
                  disabled={isSubmitting && noResultOnLoading}
                  classname="login__form__btn"
                />
              </form>
            )}
          </Formik>
          {errorMessage && <p className="login__form__error">{errorMessage}</p>}
          <p className="login__form__signup">
            Don't have an account?
            <Link to="/sign-up">
              &nbsp;
              <span>Sign up</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
