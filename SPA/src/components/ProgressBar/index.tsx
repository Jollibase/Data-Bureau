import style from './ProgressBar.styl'

interface ProgressBarProps {
  percent: number
  stroke: number
  color?: string
}

export const ProgressBar = ({ percent, stroke, color }: ProgressBarProps) => {
  return (
    <div className={style.ProgressBar} style={{ height: `${stroke}px` }}>
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
