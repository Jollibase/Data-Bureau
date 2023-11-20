import { useState } from 'react'
import ClassNames from 'classnames'
import { Link, useLocation } from 'react-router-dom'

import { ROUTES } from '@Home/routes/constants'
import { useLocalStorage } from '@Home/lib/hooks/useLocalStorage'

import { Button } from '../Button'

import { ReactComponent as Logo } from '@Images/logo-yellow.svg'
import styles from './Menu.styl'

interface MenuProps {
  routes?: { [key: string]: string }
  showButton?: boolean
  classname?: string
}

export const Menu = ({ routes, showButton, classname }: MenuProps) => {
  const location = useLocation()
  const MenuRoutes = routes || ROUTES
  const storage = useLocalStorage()
  const isWaitlisted = storage('isWaitlisted').results
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false)

  return (
    <div className={ClassNames(styles.Menu, classname)}>
      <div className="menu__logo">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <div className="mobile_view">
        <div
          className="mobile_view menu__hamburger"
          onClick={() => setShowMobileMenu(!showMobileMenu)}>
          ≡
        </div>
        <div
          className={ClassNames('menu__mobile_list', {
            active: showMobileMenu,
          })}>
          <ul>
            {Object.entries(MenuRoutes).map(([k, v]) => {
              return (
                <li key={k} className="list-item">
                  <Link to={v}>{k}</Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      <div className="menu__list desktop_view">
        <ul>
          {Object.entries(MenuRoutes).map(([k, v]) => {
            return (
              <li
                key={k}
                className={ClassNames('list-item', {
                  active: location.pathname === v,
                })}>
                <Link to={v}>{k}</Link>
              </li>
            )
          })}
        </ul>
        {showButton && (
          <a href={!!isWaitlisted ? '#joined' : '#join'}>
            <Button
              text="Join our Waitlist"
              disabled={!!isWaitlisted}
              secondary
              onclick={() => null}
            />
          </a>
        )}
      </div>
    </div>
  )
}
