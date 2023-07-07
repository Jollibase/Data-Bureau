import { isPlainObject, has } from 'lodash'
import { useLoaderData, Navigate, Outlet, Link } from 'react-router-dom'

import { ReactComponent as Grid } from '@Images/grid.svg'
import { ReactComponent as Report } from '@Images/reports.svg'
import { ReactComponent as Graph } from '@Images/graph.svg'
import { ReactComponent as Alert } from '@Images/alert.svg'
import { ReactComponent as Credit } from '@Images/credit.svg'
import { ReactComponent as QuestionCircle } from '@Images/circle_question.svg'
import { ReactComponent as Cog } from '@Images/settings_cog.svg'
import { ReactComponent as LogoGreen } from '@Images/logo_green.svg'
import { ReactComponent as Bell } from '@Images/bell.svg'

import { useAppSelector } from '@Home/lib/hooks/redux'
import { Sidebar } from '@Home/components'

import styles from './AuthDashboardLayout.styl'

const sidebarMenu = [
  { title: 'Dashboard', link: '', icon: Grid },
  { title: 'Credit Scores', link: '', icon: Credit },
  { title: 'Analytics', link: '', icon: Report },
  { title: 'Reports', link: '', icon: Graph },
  { title: 'Risk Management', link: '', icon: Alert },
]

const AuthDashboardLayout = () => {
  const user = useLoaderData()
  const { isLoggedIn } = useAppSelector(state => state.user)

  if (!((isPlainObject(user) && has(user, 'id')) || isLoggedIn)) {
    return <Navigate to="/login" />
  }

  return (
    <div className={styles.AuthDashboardLayout}>
      <div className="navbar">
        <Link to="/dashboards">
          <LogoGreen />
        </Link>
        <div className="input_search">
          <input type="text" placeholder="search" />
        </div>
        <div className="icons">
          <div>
            <QuestionCircle />
          </div>
          <div>
            <Bell />
          </div>
          <div>
            <Cog />
          </div>
          <div className="user_initials">PR</div>
        </div>
      </div>
      <div className="authdashboard_content">
        <Sidebar menuItems={sidebarMenu} className="authdashboard_sidebar" />
        <Outlet />
      </div>
    </div>
  )
}

export default AuthDashboardLayout
