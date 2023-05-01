import ClassNames from 'classnames'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { Link } from 'react-router-dom'

import { Button, Input } from '@Home/components'

import { ReactComponent as Data } from '@Images/data.svg'

import style from './LoginPage.styl'

interface LoginPageProps {
  classname?: string
}

const validateSchema = Yup.object({
  email: Yup.string()
    .email('Email address is invalid')
    .required('Email is required'),
  password: Yup.string().required('Pasword is required'),
})

export const LoginPage = ({ classname }: LoginPageProps) => {
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
            onSubmit={() => null}
            initialValues={{ email: '', password: '', remember: false }}
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
                  text="Login"
                  onclick={handleSubmit}
                  primary
                  loading={isSubmitting}
                  classname="login__form__btn"
                />
              </form>
            )}
          </Formik>
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
