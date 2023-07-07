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
    component: (props: any) => JSX.Element
  }[]
  currentStep: number
  updateStep: VoidFunction
}

export interface StepComponentsExtraProps {
  classname: string
  updateStep: () => void
}

interface StepTitleProps {
  logo: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  text: string
  cssStyle?: React.CSSProperties
  className?: string
  current: boolean
  isFirstStep: boolean
}

const StepTitle = ({
  logo,
  text,
  current,
  cssStyle,
  isFirstStep,
}: StepTitleProps) => {
  const Logo = logo
  return (
    <div
      className={ClassNames(style.StepTitle, { active: current })}
      style={cssStyle}>
      <div className="step-title__logo">{<Logo />}</div>
      <div className="step-title__text desktop_view">{text}</div>
      <div className="step-title__progress_bar">
        {!isFirstStep && (
          <ProgressBar
            className="step-title__progress"
            percent={current ? 100 : 0}
            color="#00A991"
            stroke={4.5}
          />
        )}
        <div className="step-title__ball"></div>
      </div>
    </div>
  )
}

// Idea behind render is to serve as form of renderProp in opposition to using cloneElement
const render = (
  updateStep: () => void,
  classname: string,
  child: ({ ...props }) => React.ReactElement,
  key: string,
  isCurrent: boolean,
) => {
  if (!isCurrent) {
    return null
  }
  const Child = child
  return <Child key={key} classname={classname} updateStep={updateStep} />
}

export const Step = ({
  currentStep,
  updateStep,
  classname,
  stepComponents,
}: StepProps) => {
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
                isFirstStep={index === 0}
              />
            )
          })}
        </div>

        <div className="step__items">
          {stepComponents.map((child, index) => {
            return render(
              updateStep,
              ClassNames('step__items__child', {
                step__items__child__current: currentStep === index + 1,
              }),
              child.component,
              child.title.text,
              currentStep === index + 1,
            )
          })}
        </div>
      </div>
    </div>
  )
}
