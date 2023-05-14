import { Formik } from 'formik'
import { Link } from 'react-router-dom'
import ClassNames from 'classnames'
import * as Yup from 'yup'

import { Button, Input, Select } from '@Home/components'
import { StepComponentsExtraProps } from '@Home/components/Step'
import { useAppDispatch } from '@Home/lib/hooks/redux'

import { BUSINESS_TYPE_OPTIONS, INDUSTRY_OPTIONS } from '../constants'
import { initialLenderAccountFormValues } from '../redux/reducer'

import { ReactComponent as BtnArrowRight } from '@Images/btn_arrow_right.svg'
import styles from './LenderSignup.styl'
import { createLenderAccount } from '../redux/actions'

interface LenderSignupProps extends StepComponentsExtraProps {}

const INPUT_PLACEHOLDER = 'xxxx-xxxx-xxxx'
const validateSchema = Yup.object({
  name: Yup.string().required('Company name is required'),
  phone: Yup.string()
    .matches(/^[0]{1}[7-9]{1}[0-1]{1}[0-9]{8}$/, 'Invalid Phone number')
    .required('Phone is required'),
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
  const dispatch = useAppDispatch()
  const createLenderSetup = values => dispatch(createLenderAccount(values))

  const onSubmit = (values: typeof initialLenderAccountFormValues) => {
    createLenderSetup({ ...values, phone: `+234${values.phone.slice(1)}` })
    updateStep()
  }

  return (
    <div className={ClassNames(styles.LenderSignup, classname)}>
      <div className="lender-signup__title">
        <h4>Lender Account Creation</h4>
        <p>Welcome to the future of lending - create your account now</p>
      </div>
      <Formik
        initialValues={initialLenderAccountFormValues}
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
                {...getFieldProps('name')}
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
                  { label: 'Select business type', value: '' },
                  ...BUSINESS_TYPE_OPTIONS,
                ]}
                containerClassName="input__group__container"
                label="Business Type"
                name="businessType"
                {...getFieldProps('businessType')}
              />
            </div>
            <div className="input__group">
              <Select
                options={[
                  { label: 'Select industry sector', value: '' },
                  ...INDUSTRY_OPTIONS,
                ]}
                containerClassName="input__group__container"
                name="industry"
                label="Business Industry"
                {...getFieldProps('industry')}
              />
            </div>

            <Button
              text={<p>Continue</p>}
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
      <div className="lender-signup__login">
        Already have an account, <Link to="/login">Login as Lender</Link>
      </div>
    </div>
  )
}
