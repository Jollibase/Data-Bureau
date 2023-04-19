import ClassNames from 'classnames'

import { Button } from '@Home/components'
import { StepComponentsExtraProps } from '@Home/components/Step'

import { ReactComponent as Astronaut } from '@Images/astronaut_space.svg'
import { ReactComponent as BtnArrowRight } from '@Images/btn_arrow_right.svg'
import style from './FinishingUp.styl'

interface FinishingUpProps extends StepComponentsExtraProps {}

export const FinishingUp = ({ classname, updateStep }: FinishingUpProps) => {
  return (
    <div className={ClassNames(style.FinishingUp, classname)}>
      <h4>You are all set!</h4>
      <div className="finishing-up__image">
        <Astronaut />
      </div>
      <div className="finishing-up__text">
        <p>
          Your email address has been verified! You can now proceed to the login
          page to access your dashboard
        </p>
      </div>
      <div className="finishing-up__btn">
        <Button
          text="Proceed to Login Page"
          primary
          onclick={updateStep}
          logo={<BtnArrowRight fill="white" />}
        />
      </div>
    </div>
  )
}
