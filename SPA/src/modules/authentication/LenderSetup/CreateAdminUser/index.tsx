import { Formik } from 'formik'
import ClassNames from 'classnames'
import * as Yup from 'yup'
import { isNull } from 'lodash'
import YupPassword from 'yup-password'

import { StepComponentsExtraProps } from '@Home/components/Step'
import { Button, Input } from '@Home/components'

import { ReactComponent as BtnArrowRight } from '@Images/btn_arrow_right.svg'
import styles from './CreateAdminUser.styl'
import { createAdminUser } from '../redux/actions'
import { useAppDispatch, useAppSelector } from '@Home/lib/hooks/redux'
import { useEffect } from 'react'

YupPassword(Yup)

interface CreateAdminUserProps extends StepComponentsExtraProps {}

const initialCreateAdminFormValues = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  password: '',
  password2: '',
}
const INPUT_PLACEHOLDER = 'xxxx-xxxx-xxxx'

const validateSchema = Yup.object({
  firstName: Yup.string().max(15).required('First name is required'),
  lastName: Yup.string().max(15).required('Last name is required'),
  email: Yup.string()
    .email('Email address is invalid')
    .required('Email is required'),
  password: Yup.string()
    .password()
    .minLowercase(1, 'password must contain at least 1 lower case letter')
    .minUppercase(1, 'password must contain at least 1 upper case letter')
    .required('Pasword is required')
    .minSymbols(1, 'password must contain at least 1 special character'),
  password2: Yup.string()
    .required('Type in your password')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
  phone: Yup.string()
    .matches(/^[0]{1}[7-9]{1}[0-1]{1}[0-9]{8}$/, 'Invalid Phone number')
    .required('Phone is required'),
})

export const CreateAdminUser = ({
  classname,
  updateStep,
}: CreateAdminUserProps) => {
  const { lenderDetails, statusCode } = useAppSelector(
    state => state.lenderSetup,
  )
  const dispatch = useAppDispatch()
  const dispatchedCreateAdminUser = values => dispatch(createAdminUser(values))

  const onSubmit = (values: typeof initialCreateAdminFormValues) => {
    delete values['password2']
    dispatchedCreateAdminUser({
      ...values,
      username: values.firstName,
      phone: `+234${values.phone.slice(1)}`,
    })
  }

  useEffect(() => {
    if (!isNull(lenderDetails) && statusCode === 201) {
      updateStep()
    }
  }, [statusCode])

  return (
    <div className={ClassNames(styles.CreateAdminUser, classname)}>
      <div className="create-admin__title">
        <h4>Admin User Creation</h4>
        <p>
          Some new words that will act like a tagline, underneath like some
          loren ipsum loren ipsum loren ipsum
        </p>
      </div>
      <Formik
        initialValues={initialCreateAdminFormValues}
        onSubmit={onSubmit}
        validationSchema={validateSchema}>
        {({ handleSubmit, isSubmitting, getFieldProps }) => (
          <form onSubmit={handleSubmit}>
            <div className="input__group">
              <Input
                containerClassName="input__group__container"
                label="Admin User Email Address"
                placeholder={INPUT_PLACEHOLDER}
                type="email"
                {...getFieldProps('email')}
              />
            </div>
            <div className="input__group">
              <Input
                containerClassName="input__group__container"
                label="Admin User Password"
                placeholder={INPUT_PLACEHOLDER}
                type="password"
                {...getFieldProps('password')}
              />
            </div>

            <div className="half">
              <div className="input__group">
                <Input
                  containerClassName="input__group__container"
                  label="First Name"
                  placeholder={INPUT_PLACEHOLDER}
                  type="text"
                  {...getFieldProps('firstName')}
                />
              </div>

              <div className="input__group">
                <Input
                  containerClassName="input__group__container"
                  label="Last Name"
                  placeholder={INPUT_PLACEHOLDER}
                  type="text"
                  {...getFieldProps('lastName')}
                />
              </div>
            </div>
            <div className="input__group">
              <Input
                containerClassName="input__group__container"
                label="Admin User Phone Number"
                placeholder={INPUT_PLACEHOLDER}
                type="phone"
                {...getFieldProps('phone')}
              />
            </div>
            <div className="input__group">
              <Input
                containerClassName="input__group__container"
                label="Confirm Admin User Password"
                placeholder={INPUT_PLACEHOLDER}
                type="password"
                {...getFieldProps('password2')}
              />
            </div>
            <p className="form__password__info">
              Password must be at least <span>8 Characters </span>and must
              contain at least <span>a Capital Letter</span>,{' '}
              <span> a Number </span>and <span>a Special Character </span>.
            </p>

            <Button
              text={<p>{isSubmitting ? 'Submitting' : 'Continue'}</p>}
              logo={<BtnArrowRight fill="white" />}
              primary
              classname="form__btn"
              disabled={isSubmitting}
              onclick={handleSubmit}
              loading={isSubmitting}
            />
          </form>
        )}
      </Formik>
    </div>
  )
}
