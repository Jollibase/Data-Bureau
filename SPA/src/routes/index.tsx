import { LandingPage } from '@Modules/base/LandingPage'
import { ErrorPage } from '@Modules/base/ErrorPage'

const routes = [
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
]

export default routes
