import { redirect } from 'react-router-dom'

import { LandingPage } from '@Modules/base/LandingPage'
import { ErrorPage } from '@Modules/base/ErrorPage'
import { LenderSetup } from '@Modules/authentication/LenderSetup'
import { ContactPage } from '@Modules/base/ContactPage'
import { AboutPage } from '@Modules/base/AboutPage'
import { ThankYou } from '@Modules/base/ThankYou'
import { AuthDashboardLayout } from '@Modules/dashboard/AuthDashboardLayout/AuthDashboardLayout'
import { UserLogin } from '@Modules/authentication/UserLogin'

import { getUser } from './loader'

const routes = [
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/lender/signup',
    element: <LenderSetup />,
    loader: getUser,
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
    element: <UserLogin />,
    loader: getUser,
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
  {
    path: '/dashboard',
    element: <AuthDashboardLayout />,
    loader: getUser,
  },
]

export default routes
