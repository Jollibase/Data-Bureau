import { useEffect, useState } from 'react'
import ClassNames from 'classnames'
import useWebSocket from 'react-use-websocket'

import { Button } from '@Home/components'
import { useAppDispatch, useAppSelector } from '@Home/lib/hooks/redux'
import { StepComponentsExtraProps } from '@Home/components/Step'

import { ReactComponent as GirlChair } from '@Images/girl_chair.svg'
import { ReactComponent as BtnArrowRight } from '@Images/btn_arrow_right.svg'

import style from './AccountVerification.styl'
import { resendVerification } from '../redux/actions'

interface AccountVerificationProps extends StepComponentsExtraProps {}

export const AccountVerification = ({
  classname,
  updateStep,
}: AccountVerificationProps) => {
  const [error, setError] = useState<string>('')
  const [wsURL, setWsUrl] = useState<string>('')
  const { lenderDetails, lenderAccount } = useAppSelector(
    state => state.lenderSetup,
  )
  const { lastJsonMessage } = useWebSocket(wsURL, {}, wsURL !== '')
  const dispatch = useAppDispatch()

  useEffect(() => {
    setWsUrl(`ws://127.0.0.1:8000/ws/verify/${lenderDetails?.users?.[0]?.id}/`)
  }, [lenderDetails])

  const handleClick = () => {
    dispatch(resendVerification(lenderAccount?.email as string))
  }

  useEffect(() => {
    const verified = lastJsonMessage && lastJsonMessage['verified']
    if (verified) {
      updateStep()
    } else {
      setError('Activation went sideaways')
    }
  }, [lastJsonMessage])

  return (
    <div className={ClassNames(style.AccountVerification, classname)}>
      <div>{error}</div>
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
          onclick={handleClick}
          logo={<BtnArrowRight fill="white" />}
        />
      </div>
    </div>
  )
}
