import ClassNames from 'classnames'
import { Link } from 'react-router-dom'

import { ROUTES } from '@Home/routes/constants'

import { Button } from '../Button'

import { ReactComponent as Logo } from '@Images/logo-yellow.svg'
import styles from './Menu.styl'

interface MenuProps {
  routes?: { [key: string]: string }
  showButton?: boolean
  classname?: string
}

export const Menu = ({ routes, showButton, classname }: MenuProps) => {
  const MenuRoutes = routes || ROUTES
  return (
    <div className={ClassNames(styles.Menu, classname)}>
      <div className="menu__logo">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <div className="mobile_view">≡</div>
      <div className="menu__list desktop_view">
        <ul>
          {Object.entries(MenuRoutes).map(([k, v]) => {
            return (
              <li key={k} className="list-item">
                <Link to={v}>{k}</Link>
              </li>
            )
          })}
        </ul>
        {showButton && (
          <a href="#join">
            <Button text="Join our Waitlist" secondary onclick={() => null} />
          </a>
        )}
      </div>
    </div>
  )
}
