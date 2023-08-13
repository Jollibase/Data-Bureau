import style from './Placeholder.styl'

interface PlaceholderProps {
  height: string
  width: string
}

export const Placeholder = ({ height, width }: PlaceholderProps) => {
  const styles = {
    width,
    height,
  }
  return <div style={styles} className={style.Placeholder} />
}
