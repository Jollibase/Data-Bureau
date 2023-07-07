import { useState } from 'react'
import { Link } from 'react-router-dom'
import ClassNames from 'classnames'

import type { loginFormData } from './d'

import { Button } from '@Home/components'

interface InitialUserFormProps {
  handleChange: (key: keyof loginFormData, value: string) => void
  updateStep: (value: number | ((e: number) => number)) => void
}

const initialValues = {
  data: '',
  lender: true,
  user: false,
}

const data = [
  {
    key: 'lender',
    title: 'As Lender',
    description:
      'Account owner/administrator that performs data analytics and \
                    tasks requiring unrestricted access.',
  },
  {
    key: 'user',
    title: 'As User',
    description: 'Users within an organization',
  },
]

export const InitialUserForm = ({
  handleChange,
  updateStep,
}: InitialUserFormProps) => {
  const [checkboxFormState, setCheckboxFormState] = useState(initialValues)
  const onChangeCheckBox = (key: string) => {
    setCheckboxFormState(prev => ({
      ...prev,
      lender: false,
      user: false,
      [key]: true,
    }))
  }
  const onSubmit = () => {
    const { data, user } = checkboxFormState
    if (user) {
      const formData = {
        company: data,
      }
      // API requests and set account ID
      handleChange('accountId', data)
      console.log(formData)
    } else {
      handleChange('email', data)
    }
    updateStep((prev: number) => prev + 1)
  }
  return (
    <>
      <div className="user_login__content__form__checkpoint">
        <form onSubmit={e => e.preventDefault()}>
          {data.map(item => (
            <div
              key={item.key}
              className={ClassNames(
                'user_login__content__form__checkpoint__checkbox',
                { selected: checkboxFormState[item.key as 'lender' | 'user'] },
              )}
              onClick={() => onChangeCheckBox(item.key as 'lender' | 'user')}>
              <input
                type="checkbox"
                readOnly
                name="user"
                checked={checkboxFormState[item.key as 'lender' | 'user']}
              />
              <div className="title">{item.title}</div>
              <p>{item.description}</p>
            </div>
          ))}

          <div className="input_group">
            <label htmlFor="">
              {checkboxFormState.lender
                ? 'Lender Email Address'
                : 'Organization ID (Company Account Alias)'}
            </label>
            <input
              placeholder={
                checkboxFormState.lender
                  ? 'username@example.com'
                  : 'company-alias'
              }
              type={checkboxFormState.lender ? 'email' : 'text'} // Validate email
              value={checkboxFormState.data}
              onChange={e =>
                setCheckboxFormState(prev => ({
                  ...prev,
                  data: e.target.value,
                }))
              }
              name="email"
            />
          </div>
          <Button onclick={onSubmit} text="Next" />
        </form>
      </div>
      <div className="user_login__content__form__terms">
        By continuing, you agree to the
        <Link to="/"> Jollibase Terms and Conditions</Link> as well as all other
        agreements for the Jollibase service, and the{' '}
        <Link to="/">Privacy Notice</Link>. This site uses essential cookies.
      </div>
    </>
  )
}
