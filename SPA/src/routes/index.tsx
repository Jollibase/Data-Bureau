import { redirect } from 'react-router-dom'

import { LandingPage } from '@Modules/base/LandingPage'
import { ErrorPage } from '@Modules/base/ErrorPage'
import { LenderSetup } from '@Home/modules/authentication/LenderSetup'
import { ContactPage } from '@Home/modules/base/ContactPage'
import { AboutPage } from '@Home/modules/base/AboutPage'
import { ThankYou } from '@Home/modules/base/ThankYou'
import { LoginPage } from '@Home/modules/authentication/LoginPage'

const routes = [
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/lender/signup',
    element: <LenderSetup />,
  },
  {
    path: '/contact-us',
    element: <ContactPage />,
  },
  {
    path: '/about-us',
    element: <AboutPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/thank-you',
    element: <ThankYou />,
    loader: async () => {
      const isWaitlisted = localStorage.getItem('isWaitlisted')
      if (!isWaitlisted) {
        return redirect('/')
      }
      return null
    },
  },
]

export default routes
