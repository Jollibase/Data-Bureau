import Joyride, { Props } from 'react-joyride'

type TourProps = Props & {}

export const Tour = (props: TourProps) => {
  return (
    <Joyride
      continuous
      steps={props.steps}
      run={props.run}
      showProgress
      disableOverlayClose
      disableOverlay
      disableCloseOnEsc
      hideCloseButton
      callback={props.callback}
      styles={{
        options: {
          backgroundColor: '#EBFFF4',
          arrowColor: '#EBFFF4',
          textColor: '#00A991',
        },
        buttonNext: {
          backgroundColor: '#00A991',
          color: '#FFFFFF',
          fontSize: '12px',
          padding: '10px',
        },
        buttonBack: {
          fontSize: '12px',
          color: '#00A991',
        },
        tooltipTitle: {
          fontSize: 15,
          textAlign: 'left',
          lineHeight: '20px',
          fontWeight: 600,
        },
        tooltipContent: {
          textAlign: 'left',
          fontSize: 13,
          padding: '10px 0',
          color: 'rgba(89, 89, 89, 0.80)',
        },
      }}
    />
  )
}
