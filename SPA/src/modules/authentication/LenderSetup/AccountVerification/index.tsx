import ClassNames from 'classnames'

import { Button } from '@Home/components'
import { StepComponentsExtraProps } from '@Home/components/Step'

import { ReactComponent as GirlChair } from '@Images/girl_chair.svg'
import { ReactComponent as BtnArrowRight } from '@Images/btn_arrow_right.svg'
import style from './AccountVerification.styl'

interface AccountVerificationProps extends StepComponentsExtraProps {}

export const AccountVerification = ({
  classname,
  updateStep,
}: AccountVerificationProps) => {
  return (
    <div className={ClassNames(style.AccountVerification, classname)}>
      <h4>Account Verification</h4>
      <div className="account-verification__image">
        <GirlChair />
      </div>
      <div className="account-verification__text">
        <p>
          Please check your email for a message from us. Click the link in the
          email to verify your email address and continue with the registration
          process.
        </p>
      </div>
      <div className="account-verification__btn">
        <Button
          text="Resend verification link"
          primary
          onclick={updateStep}
          logo={<BtnArrowRight fill="white" />}
        />
      </div>
    </div>
  )
}
