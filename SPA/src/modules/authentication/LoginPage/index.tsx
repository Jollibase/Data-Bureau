import ClassNames from 'classnames'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'

import { loginAction } from '@Home/store/commonActions/user'

import { Button, Input } from '@Home/components'

import { ReactComponent as Data } from '@Images/data.svg'

import style from './LoginPage.styl'
import { useAppDispatch, useAppSelector } from '@Home/lib/hooks/redux'
import { useEffect } from 'react'

interface LoginPageProps {
  classname?: string
}

const initialValues = { email: '', password: '', remember: false }
const validateSchema = Yup.object({
  email: Yup.string()
    .email('Email address is invalid')
    .required('Email is required'),
  password: Yup.string().required('Pasword is required'),
})

export const LoginPage = ({ classname }: LoginPageProps) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isLoggedIn, errorMessage, statusCode } = useAppSelector(
    state => state.user,
  )
  const login = value => dispatch(loginAction(value))

  const handleSubmit = (values: typeof initialValues) => {
    login(values)
  }
  useEffect(() => {
    isLoggedIn && navigate('/dashboard')
  }, [isLoggedIn])

  const isLoading = !errorMessage || !statusCode

  return (
    <div className={ClassNames(style.LoginPage, classname)}>
      <div className="login">
        <div className="login__image">
          <Data />
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
                  loading={isSubmitting && isLoading}
                  disabled={isSubmitting && isLoading}
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
