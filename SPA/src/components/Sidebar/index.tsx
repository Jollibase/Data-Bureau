import ClassNames from 'classnames'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { Button } from '../Button'

import { ReactComponent as CaretCircleRight } from '@Images/caret_circle_right.svg'
import { ReactComponent as CaretCircleLeft } from '@Images/caret_circle_left.svg'
import { ReactComponent as LogOut } from '@Images/logout.svg'
import { ReactComponent as Headphones } from '@Images/headphones.svg'

import styles from './Sidebar.styl'

interface SidebarProps {
  menuItems?: {
    title: string
    link: string
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  }[]
  extras?: React.ReactNode
  className?: string
  logout?: VoidFunction
}

export const Sidebar = ({
  menuItems,
  className,
  extras,
  logout,
}: SidebarProps) => {
  const [minimize, setMinimize] = useState<boolean>(false)
  const location = useLocation()

  const MinimizeIcon = minimize ? CaretCircleRight : CaretCircleLeft

  return (
    <div className={styles.Sidebar}>
      <div
        className={ClassNames('sidebar', className, { collapsed: minimize })}>
        <div className="sidebar__minimize_icon">
          <MinimizeIcon onClick={() => setMinimize(!minimize)} />
        </div>
        <div className="sidebar__menu">
          <ul>
            {menuItems?.map(item => {
              const Icon = item.icon
              return (
                <li
                  key={item.link + item.title}
                  className={ClassNames({
                    active: item.link === location.pathname,
                  })}>
                  <Link to={item.link}>
                    <Icon />
                    <div>{item.title}</div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="sidebar__extras">
          <h6>Upgrade to Pro for Advanced Analytics and Insights</h6>
          <p>Upgrade Now </p>
        </div>
        <div className="sidebar__contact">
          <Button
            logo={<Headphones />}
            text="Contact Support"
            onclick={() => null}
            classname="btn"
          />
        </div>
        {logout && (
          <div className="sidebar__logout">
            <Button
              classname="btn"
              logo={<LogOut />}
              text="Logout"
              onclick={logout}
            />
          </div>
        )}
      </div>
    </div>
  )
}
