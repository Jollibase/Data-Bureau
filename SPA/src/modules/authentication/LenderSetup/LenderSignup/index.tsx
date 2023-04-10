import { Formik } from 'formik'
import { Link } from 'react-router-dom'
import ClassNames from 'classnames'
import * as Yup from 'yup'

import { Button, Input, Select } from '@Home/components'

import { BUSINESS_TYPE_OPTIONS } from '../constants'

import { ReactComponent as BtnArrowRight } from '@Images/btn_arrow_right.svg'
import styles from './LenderSignup.styl'

interface LenderSignupProps {
  updateStep: () => void
  classname: string
}

const initialFormValues = {
  lenderName: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  state: '',
  businessType: '',
  industry: '',
}

const INPUT_PLACEHOLDER = 'xxxx-xxxx-xxxx'
const validateSchema = Yup.object({
  lenderName: Yup.string().required('Company name is required'),
  phone: Yup.string().required('Company name is required'),
  address: Yup.string().required('Address is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  industry: Yup.string().required('Please select an industry'),
  businessType: Yup.string().required('Please select a type'),
  email: Yup.string()
    .email('Email address is invalid')
    .required('Email is required'),
})

export const LenderSignup = ({ classname, updateStep }: LenderSignupProps) => {
  const onSubmit = () => {
    setTimeout(() => null, 4000)
    updateStep()
  }
  return (
    <div className={ClassNames(styles.LenderSignup, classname)}>
      <div className="lender-signup__title">
        <h4>Lender Account Creation</h4>
        <p>
          Some new words that will act like a tagline, underneath like some
          loren ipsum loren ipsum loren ipsum
        </p>
      </div>
      <Formik
        initialValues={initialFormValues}
        onSubmit={onSubmit}
        validationSchema={validateSchema}>
        {({ handleSubmit, isSubmitting, getFieldProps }) => (
          <form onSubmit={handleSubmit}>
            <div className="input__group">
              <Input
                containerClassName="input__group__container"
                label="Business Name"
                placeholder={INPUT_PLACEHOLDER}
                type="text"
                {...getFieldProps('lenderName')}
              />
            </div>
            <div className="half">
              <div className="input__group">
                <Input
                  containerClassName="input__group__container"
                  label="Business Phone Number"
                  placeholder={INPUT_PLACEHOLDER}
                  type="text"
                  {...getFieldProps('phone')}
                />
              </div>
              <div className="input__group">
                <Input
                  containerClassName="input__group__container"
                  label="Contact Email"
                  placeholder={INPUT_PLACEHOLDER}
                  type="text"
                  {...getFieldProps('email')}
                />
              </div>
            </div>
            <div className="input__group">
              <Input
                containerClassName="input__group__container"
                label="Street Address"
                placeholder={INPUT_PLACEHOLDER}
                type="text"
                {...getFieldProps('address')}
              />
            </div>
            <div className="third">
              <div className="input__group">
                <Input
                  containerClassName="input__group__container"
                  label="City"
                  placeholder={INPUT_PLACEHOLDER}
                  type="text"
                  {...getFieldProps('city')}
                />
              </div>
              <div className="input__group">
                <Input
                  containerClassName="input__group__container"
                  label="State"
                  placeholder={INPUT_PLACEHOLDER}
                  type="text"
                  {...getFieldProps('state')}
                />
              </div>
              <div className="input__group">
                <Input
                  containerClassName="input__group__container"
                  label="Region"
                  placeholder={INPUT_PLACEHOLDER}
                  type="text"
                  {...getFieldProps('state')}
                />
              </div>
            </div>
            <div className="input__group">
              <Select
                options={[
                  { label: 'Select your business type', value: '' },
                  ...BUSINESS_TYPE_OPTIONS,
                ]}
                containerClassName="input__group__container"
                label="Business Type"
                name="businessType"
                {...getFieldProps('businessType')}
                defaultValue=""
              />
            </div>
            <div className="input__group">
              <Input
                containerClassName="input__group__container"
                label="Business Industry"
                placeholder={INPUT_PLACEHOLDER}
                type="text"
                {...getFieldProps('industry')}
              />
            </div>
            <div className="input__group">
              <Input
                containerClassName="input__group__container"
                label="Business Industry"
                placeholder={INPUT_PLACEHOLDER}
                type="text"
                {...getFieldProps('industry')}
              />
            </div>

            <Button
              text={<p>Continue</p>}
              logo={<BtnArrowRight fill="white" />}
              secondary
              classname="form__btn"
              disabled={isSubmitting}
              onclick={handleSubmit}
              loading={isSubmitting}
            />
          </form>
        )}
      </Formik>
      <div className="lender-signup__login">
        Already have an account, <Link to="/login">Login as Lender</Link>
      </div>
    </div>
  )
}
