import { LandingPage } from '@Modules/base/LandingPage'

const routes = [
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <div>Error</div>,
  },
]

export default routes
