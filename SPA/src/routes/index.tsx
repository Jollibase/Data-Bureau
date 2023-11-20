import { LandingPage } from '@Modules/base/LandingPage'
import { ErrorPage } from '@Modules/base/ErrorPage'
import { LenderSetup } from '@Modules/authentication/LenderSetup'
import { ContactPage } from '@Modules/base/ContactPage'
import { AboutPage } from '@Modules/base/AboutPage'
import { ThankYou } from '@Modules/base/ThankYou'
import AuthDashboardLayout from '@Modules/dashboard/AuthDashboardLayout/AuthDashboardLayout'
import { UserLogin } from '@Modules/authentication/UserLogin'
import { Dashboard } from '@Home/modules/dashboard/Dashboard'
import { CustomDashboard } from '@Home/modules/dashboard/CustomDashboard'

import { getUser, getCompanyCount } from './loader'

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
    loader: getCompanyCount,
  },
  {
    path: '/dashboards',
    element: <AuthDashboardLayout />,
    loader: getUser,
    children: [
      {
        path: '/dashboards/',
        element: <Dashboard />,
      },
      {
        path: '/dashboards/:id',
        element: <CustomDashboard />,
      },
    ],
  },
]

export default routes
