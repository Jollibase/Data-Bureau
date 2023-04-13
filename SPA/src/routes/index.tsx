import { LandingPage } from '@Modules/base/LandingPage'
import { ErrorPage } from '@Modules/base/ErrorPage'
import { LenderSetup } from '@Home/modules/authentication/LenderSetup'
import { ContactPage } from '@Home/modules/base/ContactPage'
import { AboutPage } from '@Home/modules/base/AboutPage'

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
]

export default routes
