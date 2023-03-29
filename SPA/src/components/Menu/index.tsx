import { Link } from 'react-router-dom'

import { Button } from '../Button'

import { ReactComponent as Logo } from '@Images/logo-yellow.svg'
import styles from './Menu.styl'

interface MenuProps {
  routes: { [key: string]: string }
}

export const Menu = ({ routes }: MenuProps) => {
  return (
    <div className={styles.Menu}>
      <div className="menu__logo">
        <Logo />
      </div>
      <div className="mobile_view">≡</div>
      <div className="menu__list desktop_view">
        <ul>
          {Object.entries(routes).map(([k, v]) => {
            return (
              <li key={k} className="list-item">
                <Link to={v}>{k}</Link>
              </li>
            )
          })}
        </ul>
        <Button text="Join our Waitlist" onclick={() => null} />
      </div>
    </div>
  )
}
