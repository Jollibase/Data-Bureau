import CheckedImg from '@Images/checkedbox.svg'
import UncheckedImg from '@Images/uncheckedbox.svg'

interface CheckboxProps {
  checked: boolean
  onChange: (e: boolean) => void
}

export const Checkbox = ({ checked, onChange }: CheckboxProps) => {
  const IconImg = checked ? CheckedImg : UncheckedImg

  const handleClick = () => {
    onChange(!checked)
  }

  return (
    <div onClick={handleClick}>
      <img src={IconImg} alt="checkbox" />
    </div>
  )
}
