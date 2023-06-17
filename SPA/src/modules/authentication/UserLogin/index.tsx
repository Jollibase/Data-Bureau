import { useState } from 'react'
import { Link, Navigate, useLoaderData } from 'react-router-dom'
import { isPlainObject, has } from 'lodash'

import type { loginFormData } from './d'

import { Button } from '@Home/components'

import { InitialUserForm } from './InitialUserForm'
import { VerfiedEmailLogIn } from './VerfiedEmailLogIn'

import { ReactComponent as LogoGreen } from '@Images/logo_green.svg'
import { ReactComponent as DataScience } from '@Images/datascience.svg'

import styles from './UserLogin.styl'

const stepForm = (
  step: number,
  values: { [key: string]: string },
  handleChange: (key: keyof loginFormData, value: string) => void,
  setStep: (value: number) => void,
) => {
  switch (step) {
    case 1:
      return (
        <InitialUserForm handleChange={handleChange} updateStep={setStep} />
      )
    case 2:
      return <VerfiedEmailLogIn values={values} handleChange={handleChange} />
  }
}

export const UserLogin = () => {
  const [values, setValues] = useState<loginFormData>({
    email: '',
    accountId: '',
    password: '',
  })
  const [step, setStep] = useState<number>(1)
  const user = useLoaderData()

  const handleChange = (key: keyof loginFormData, value: string) => {
    setValues(prev => ({ ...prev, [key]: value }))
  }

  if (isPlainObject(user) && has(user, 'name')) {
    return <Navigate to="/dashboard" />
  }

  return (
    <div className={styles.UserLogin}>
      <div className="user_login">
        <div className="user_login__content">
          <div className="user_login__content__form">
            <div className="user_login__content__logo">
              <Link to="/">
                <LogoGreen />
              </Link>
            </div>
            <h5 className="user_login__content__form__header">Sign in</h5>
            {stepForm(step, values, handleChange, setStep)}
            <hr className="user_login__content__form__divider" />
            <div className="user_login__content__form__new">
              <Button
                onclick={() => null}
                text="Create a new Jollibase Account"
                inverse
              />
            </div>
            <div className="small">
              © 2023, Jollibase Inc. or its affiliates. All rights reserved.
            </div>
          </div>
          <div className="user_login__content__right_icon">
            <DataScience />
          </div>
        </div>
      </div>
    </div>
  )
}
