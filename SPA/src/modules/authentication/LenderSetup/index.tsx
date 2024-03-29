import { Link, useLoaderData, Navigate } from 'react-router-dom'
import { isPlainObject, has } from 'lodash'

import { useAppSelector, useAppDispatch } from '@Home/lib/hooks/redux'
import { Step } from '@Components'

import { updateCurrentStep } from './redux/actions'
import { LenderSignup } from './LenderSignup'
import { CreateAdminUser } from './CreateAdminUser'
import { AccountVerification } from './AccountVerification'
import { FinishingUp } from './FinishingUp'
import { SetupLogin } from './SetupLogin'

import { ReactComponent as Home } from '@Images/home_pillars.svg'
import { ReactComponent as Man } from '@Images/man.svg'
import { ReactComponent as AddMan } from '@Images/add_man.svg'
import { ReactComponent as Flag } from '@Images/flag.svg'
import { ReactComponent as Arrow } from '@Images/arrow.svg'
import { ReactComponent as LogoGreen } from '@Images/logo_green.svg'
import styles from './LenderSetup.styl'

const LenderSetupComponents = [
  {
    title: {
      logo: Home,
      text: 'Setup Lender Account',
    },
    component: LenderSignup,
  },
  {
    title: {
      logo: Man,
      text: 'Setup Admin User',
    },
    component: CreateAdminUser,
  },
  {
    title: {
      logo: AddMan,
      text: 'Account Verification',
    },
    component: AccountVerification,
  },
  {
    title: {
      logo: Flag,
      text: 'Finishing Up',
    },
    component: FinishingUp,
  },
  {
    title: {
      logo: Arrow,
      text: 'Sign into Account',
    },
    component: SetupLogin,
  },
]

export const LenderSetup = () => {
  const currentStep = useAppSelector(state => state.lenderSetup.currentStep)
  const dispatch = useAppDispatch()
  const dispatchedUpdateStep = () => dispatch(updateCurrentStep())
  const user = useLoaderData()

  if (isPlainObject(user) && has(user, 'name')) {
    return <Navigate to="/dashboards" />
  }

  return (
    <div className={styles.LenderSetup}>
      <div className="lender-setup__logo">
        <Link to="/">
          <LogoGreen />
        </Link>
      </div>

      <Step
        currentStep={currentStep}
        stepComponents={LenderSetupComponents}
        updateStep={dispatchedUpdateStep}
      />
    </div>
  )
}
