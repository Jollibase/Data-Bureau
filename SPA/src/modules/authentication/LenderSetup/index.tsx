import { Step } from '@Components'

import { LenderSignup } from './LenderSignup'
import { CreateAdminUser } from './CreateAdminUser'

import { ReactComponent as Compass } from '@Images/compass.svg'
import { ReactComponent as Link } from '@Images/link.svg'
import { ReactComponent as LogoGreen } from '@Images/logo_green.svg'
import styles from './LenderSetup.styl'

const LenderSetupComponents = [
  {
    title: {
      logo: Link,
      text: 'Setup Lender Account',
    },
    component: LenderSignup,
  },
  {
    title: {
      logo: Compass,
      text: 'Setup Admin User',
    },
    component: CreateAdminUser,
  },
]

export const LenderSetup = () => {
  return (
    <div className={styles.LenderSetup}>
      <div className="lender-setup__logo">
        <LogoGreen />
      </div>

      <Step stepComponents={LenderSetupComponents} />
    </div>
  )
}
