import { Formik } from 'formik'

import { useAppDispatch, useAppSelector } from '@Home/lib/hooks/redux'
import { Input, Menu, Textarea, Button, Footer, Toast } from '@Home/components'
import { sendContactInfo, clearBaseInfo } from '@Modules/base/redux/actions'

import { ReactComponent as Mail } from '@Images/mail.svg'
import { ReactComponent as Whatsapp } from '@Images/whatsapp.svg'
import { ReactComponent as BtnArrowRight } from '@Images/btn_arrow_right.svg'
import style from './ContactPage.styl'
const initValues = {
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  message: '',
}

export const ContactPage = () => {
  const dispatch = useAppDispatch()
  const { contact, loading } = useAppSelector(state => state.base)

  return (
    <div className={style.ContactPage}>
      <Menu classname="contact_page__menu" showButton />
      <Toast
        message={contact?.message}
        level={contact?.hasSentContactInfo ? 'success' : 'error'}
        onClear={() => dispatch(clearBaseInfo())}
      />
      <div className="contact_page">
        <h2>We help financial institutions make informed lending decisions.</h2>
        <div className="contact_page__form">
          <div className="contact_page__form__text">
            <h3>Send us a message</h3>
            <p>Contact us regarding any concerns or inquiries.</p>
          </div>
          <Formik
            onSubmit={(values: Record<string, string>, { resetForm }) => {
              dispatch(sendContactInfo(values, resetForm))
            }}
            initialValues={initValues}>
            {({ getFieldProps, handleSubmit }) => (
              <form>
                <div className="half">
                  <Input
                    classname="contact_page__form__input"
                    label="First Name"
                    type="text"
                    placeholder="e.g. John"
                    {...getFieldProps('firstName')}
                  />
                  <Input
                    classname="contact_page__form__input"
                    label="Last Name"
                    type="text"
                    placeholder="e.g. Doe"
                    {...getFieldProps('lastName')}
                  />
                </div>
                <div className="">
                  <Input
                    label="Email address"
                    classname="contact_page__form__input"
                    type="email"
                    placeholder="e.g. John"
                    {...getFieldProps('email')}
                  />
                </div>
                <div className="">
                  <Input
                    classname="contact_page__form__input"
                    type="text"
                    label="Company"
                    placeholder="e.g. Company XYZ"
                    {...getFieldProps('company')}
                  />
                </div>
                <div className="">
                  <Textarea
                    rows={7}
                    placeholder="Type a message here...."
                    label="Additional Message"
                    classname="contact_page__form__textarea"
                    {...getFieldProps('message')}
                  />
                </div>
                <div className="contact_page__form__finish_up">
                  <Button
                    primary
                    onclick={handleSubmit}
                    classname="contact_page__form__btn"
                    text="Submit"
                    loading={loading}
                    disabled={loading}
                    logo={<BtnArrowRight fill="white" />}
                  />
                  <p>
                    By pressing the submit button, I agree to Jollibase
                    contacting me by email and/or phone to share opportunities
                    exclusively available to Select or Enterprise customers. I
                    also understand that any information I've shared in this
                    form is subject to Jollibase Privacy Policy.
                  </p>
                </div>
              </form>
            )}
          </Formik>
        </div>
        <div className="contact_page__info">
          <h3>Our Contact Information</h3>
          <p>
            <Mail fill="#999999" /> team@jolibase.com
          </p>
          <p>
            <Whatsapp fill="#999999" /> (+234) 816 786 9862
          </p>
          <p className="contact_page__info__connect">
            Connect with us to mitigate financial risk and drive informed
            lending decisions.
          </p>
        </div>
        <Footer />
      </div>
    </div>
  )
}
