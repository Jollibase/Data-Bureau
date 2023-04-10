import React, { useState } from 'react'
import ClassNames from 'classnames'

import { ProgressBar } from '../ProgressBar'

import style from './Step.styl'

interface StepProps {
  classname?: string
  stepComponents: {
    title: {
      logo: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
      text: string
    }
    component: (props) => React.ReactElement
  }[]
}

interface StepTitleProps {
  logo: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  text: string
  cssStyle?: React.CSSProperties
  className?: string
  current: boolean
}

const StepTitle = ({ logo, text, current, cssStyle }: StepTitleProps) => {
  const Logo = logo
  return (
    <div
      className={ClassNames(style.StepTitle, { active: current })}
      style={cssStyle}>
      <div className="step-title__logo">{<Logo />}</div>
      <div className="step-title__text">{text}</div>
    </div>
  )
}

// Idea behind render is to serve as form of renderProp in opposition to using cloneElement
const render = (
  updateStep: () => void,
  classname: string,
  child: (props) => React.ReactElement,
  key: string,
) => {
  const Child = child
  return <Child key={key} classname={classname} updateStep={updateStep} />
}

export const Step = ({ classname, stepComponents }: StepProps) => {
  const [currentStep, setCurrentStep] = useState<number>(1)

  const updateStep = () => {
    if (currentStep < stepComponents.length) {
      setCurrentStep(prevStep => prevStep + 1)
    }
  }

  return (
    <div className={ClassNames(style.Step, classname)}>
      <div className="step">
        <div className="step__header">
          {stepComponents.map((child, index) => {
            return (
              <StepTitle
                key={`${child.title.text} ${index}`}
                text={child.title.text}
                logo={child.title.logo}
                current={index <= currentStep - 1}
              />
            )
          })}
        </div>

        <ProgressBar
          percent={(currentStep / stepComponents.length) * 100}
          stroke={3}
        />

        <div className="step__items">
          {stepComponents.map((child, index) => {
            return render(
              updateStep,
              ClassNames('step__items__child', {
                step__items__child__current: currentStep === index + 1,
              }),
              child.component,
              child.title.text,
            )
          })}
        </div>
      </div>
    </div>
  )
}
