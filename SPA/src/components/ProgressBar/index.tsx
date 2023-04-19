import ClassNames from 'classnames'
import style from './ProgressBar.styl'

interface ProgressBarProps {
  percent: number
  stroke: number
  color?: string
  className?: string
}

export const ProgressBar = ({
  percent,
  className,
  stroke,
  color,
}: ProgressBarProps) => {
  return (
    <div
      className={ClassNames(className, style.ProgressBar)}
      style={{ height: `${stroke}px` }}>
      <div
        className="progressbar"
        style={{
          width: `${percent}%`,
          background: color || '#f2984a76',
        }}
      />
    </div>
  )
}
