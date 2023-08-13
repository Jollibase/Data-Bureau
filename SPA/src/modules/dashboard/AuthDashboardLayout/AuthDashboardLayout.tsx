import { isPlainObject, has } from 'lodash'
import {
  useLoaderData,
  Navigate,
  Outlet,
  Link,
  useNavigate,
} from 'react-router-dom'
import { useState } from 'react'

import { useAppDispatch, useAppSelector } from '@Home/lib/hooks/redux'
import { logoutAction } from '@Home/store/commonActions/user'
import { Button, Modal, Sidebar } from '@Home/components'

import { ReactComponent as LogoText } from '@Images/logo_text.svg'
import { ReactComponent as Grid } from '@Images/grid.svg'
import { ReactComponent as Report } from '@Images/reports.svg'
import { ReactComponent as Graph } from '@Images/graph.svg'
import { ReactComponent as Alert } from '@Images/alert.svg'
import { ReactComponent as Credit } from '@Images/credit.svg'
import { ReactComponent as QuestionCircle } from '@Images/circle_question.svg'
import { ReactComponent as Cog } from '@Images/settings_cog.svg'
import { ReactComponent as LogoGreen } from '@Images/logo_green.svg'
import { ReactComponent as Bell } from '@Images/bell.svg'

import styles from './AuthDashboardLayout.styl'

const sidebarMenu = [
  { title: 'Dashboard', link: '', icon: Grid },
  { title: 'Credit Scores', link: '', icon: Credit },
  { title: 'Analytics', link: '', icon: Report },
  { title: 'Reports', link: '', icon: Graph },
  { title: 'Risk Management', link: '', icon: Alert },
]

const AuthDashboardLayout = () => {
  const [shouldShowLoginModal, setShouldShowLoginModal] =
    useState<boolean>(false)
  const user = useLoaderData()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { isLoggedIn, user: loggedInUser } = useAppSelector(state => state.user)

  if (!((isPlainObject(user) && has(user, 'id')) || isLoggedIn)) {
    return <Navigate to="/login" />
  }

  const logUserOut = () => {
    dispatch(logoutAction())
    navigate('/login')
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
        <Sidebar
          menuItems={sidebarMenu}
          className="authdashboard_sidebar"
          logout={() => setShouldShowLoginModal(true)}
        />
        <Outlet />
      </div>
      <Modal
        shouldShow={shouldShowLoginModal}
        className={styles.LogoutModal}
        onClose={() => setShouldShowLoginModal(false)}>
        <div className="logo">
          <LogoGreen />
        </div>
        <p className="warning">
          Are you sure you want to log out? Logging out will securely end your
          session. Remember to save any unsaved work before proceeding.
        </p>
        <div className="profile">
          <div className="profile_image">
            {loggedInUser?.firstName.charAt(0).toUpperCase()}
            {loggedInUser?.lastName.charAt(0).toUpperCase()}
          </div>
          <div className="profile_details">
            <div>
              {loggedInUser?.firstName} {loggedInUser?.lastName}
            </div>
            <div>{loggedInUser?.email}</div>
          </div>
        </div>
        <Button onclick={logUserOut} text="Next" classname="logout_btn" />
        <hr />
        <div className="jollibase">
          <LogoText />
        </div>
        <p>Empowering Financial Analytics for Smarter Decision Making</p>
        <p>
          © 2023 Jollibase. All rights reserved. | Privacy Policy | Terms of
          Service | Contact Us
        </p>
      </Modal>
    </div>
  )
}

export default AuthDashboardLayout
