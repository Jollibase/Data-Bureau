import { useState } from 'react'
import { CallBackProps } from 'react-joyride'

import { Button, Tour } from '@Home/components'

import { steps } from '../Dashboard/constants'
import styles from './Dashboard.styl'

import { ReactComponent as DashWelcome } from '@Images/dashboard_welcome.svg'

interface OnboardingProps {
  setShouldShowOnboarding: React.Dispatch<React.SetStateAction<boolean>>
}
export const Onboarding = ({ setShouldShowOnboarding }: OnboardingProps) => {
  const [run, setRun] = useState<boolean>(false)
  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data

    if (status === 'finished') {
      localStorage.setItem('doneOnboarding', 'true')
      setRun(false)
      setShouldShowOnboarding(false)
    }
  }

  return (
    <div className={styles.Onboarding}>
      <div className="welcome onboarding">
        <div className="welcome__banner">
          <DashWelcome />
        </div>
        <div className="welcome__text">Welcome to your Dashboard</div>
        <div className="welcome__desc">
          Welcome to your new dashboard! This is where you'll find all the tools
          and insights you need to analyze the financial credibility of
          borrowers and mitigate flight risks. Take a moment to explore the
          different sections and features available. From portfolio summaries to
          data visualizations, our dashboard empowers you to make informed
          decisions. Let's take a quick tour!
        </div>
        <Button
          classname="welcome__btn"
          onclick={() => setRun(true)}
          text="Let's get Started!"
        />
      </div>
      <Tour steps={steps} run={run} callback={handleJoyrideCallback} />
    </div>
  )
}
