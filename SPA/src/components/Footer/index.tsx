import { Link } from 'react-router-dom'
import { Formik } from 'formik'

import { Input } from '../Input'
import { Button } from '../Button'

import { ReactComponent as Logo } from '@Images/logo_no_text.svg'

import styles from './Footer.styl'

const FooterRoutes = {
  Resources: {
    Support: '',
    'Slack Community': '',
    Events: '',
    Cookies: '',
    'Term of Service': '',
    'Privacy Policy': '',
  },
  Product: {
    'How it works': '',
    Features: '',
    Pricing: '',
    'API & Integration': '',
    'Sign In': '',
  },
  About: {
    'Our Story': '/',
    'Media kit': '/',
    Blog: '/',
    'Email us': '/',
  },
}

export const Footer = () => {
  return (
    <div className={styles.Footer}>
      {Object.entries(FooterRoutes).map(([key, value]) => {
        return (
          <div className="footer__routes" key={key}>
            <div className="footer__routes__heading">{key}</div>
            <ul>
              {Object.entries(value).map(([name, link]) => {
                return (
                  <li key={name}>
                    <Link to={link}>{name}</Link>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
      <div className="footer__description">
        <div className="footer__description__logo">
          <Logo />
          Jollibase
        </div>
        <div className="footer__description__text">
          Get the latest updates about Jollibase’s new features and product
          updates.
        </div>
        <div className="footer__description__input_group">
          <Formik
            initialValues={{ email: '' }}
            onSubmit={() => {}}
            // validationSchema={Yup.object({
            //   email: Yup.string()
            //     .email('Email address is invalid')
            //     .required('Email is required'),
            // })}
          >
            {({ getFieldProps, isSubmitting, handleSubmit }) => (
              <form>
                <Input
                  containerClassName="footer__description__input_group__container"
                  type="email"
                  placeholder="Enter Email Address here..."
                  {...getFieldProps('email')}
                />
                <Button
                  secondary
                  inverse
                  onclick={handleSubmit}
                  disabled={isSubmitting}
                  loading={isSubmitting}
                  classname="footer__description__input_group__button"
                  text={isSubmitting ? 'Joining....' : 'Join our Waitlist'}
                />
              </form>
            )}
          </Formik>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__bottom__mobile">
          <div className="footer__description__logo">
            <Logo />
            Jollibase
          </div>
          <p> &#169;2023 Jollibase. All rights reserved</p>
        </div>
        <div className="footer__bottom__desktop">
          <div className="footer__bottom__desktop__links">
            <p>
              <Link to="">Terms of Service</Link>
            </p>
            <p>
              <Link to="">Privacy Policy</Link>
            </p>
            <p>
              <Link to="">Security</Link>
            </p>
            <p>
              <Link to="">Sitemap</Link>
            </p>
          </div>
          <p>&#169;2023 Jollibase. All rights reserved</p>
        </div>
      </div>
    </div>
  )
}
