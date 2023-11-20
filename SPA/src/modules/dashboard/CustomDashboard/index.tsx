import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

import { Button, ExportButton } from '@Home/components'
import { useAppSelector, useAppDispatch } from '@Home/lib/hooks/redux'
import { Placeholder } from '@Home/components/Placeholder'

import { ReactComponent as Analytics } from '@Images/analytic.svg'
import { ReactComponent as Add } from '@Images/add.svg'
import { ReactComponent as AddCircle } from '@Images/circle_add.svg'
import { ReactComponent as CheckCircle } from '@Images/check_circle.svg'
import { ReactComponent as Calendar } from '@Images/calendar.svg'
import { ReactComponent as Star } from '@Images/star.svg'

import { getDashboard } from '../redux/actions'
import style from './CustomDashboard.styl'

export const CustomDashboard = () => {
  const tabs = [] as string[]
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const {
    dashboards: { selectedDb: dashboard },
  } = useAppSelector(state => state.dashboard)

  useEffect(() => {
    dispatch(getDashboard(id as string))
  }, [])

  return (
    <div className={style.CustomDashboard}>
      <div className="custom-dash">
        <div className="headers">
          <div className="header-text">
            <span className="title">All Dashboards </span>
            <span className="dash-name">
              | &nbsp; <Star />
              {dashboard ? (
                dashboard?.name
              ) : (
                <Placeholder height="20px" width="100px" />
              )}
            </span>
            <span className="dash-autosave">
              <CheckCircle />
              Autosaved
            </span>
          </div>
          <div className="header-btn">
            <Button
              text="Add Widget"
              classname="btns add"
              inverse
              onclick={() => null}
              logo={<Add />}
            />
            <Button
              text="March 2023"
              classname="btns date"
              inverse
              onclick={() => null}
              logo={<Calendar />}
            />
            <ExportButton classname="btns export" onclick={() => null} />
          </div>
        </div>
        <div className="tabs">
          {!tabs.length && (
            <div className="add-tab">
              <AddCircle />
              Add Tab
            </div>
          )}
          {!!tabs.length && tabs.map(tab => tab)}
        </div>
        <div className="body">
          <div className="add-widget-container">
            <div className="content">
              <div>
                <Analytics />
              </div>
              <div className="content-right">
                <h4 className="title">Your Dashboard</h4>
                <p>Add widgets to make the most of the dashboard</p>
                <Button
                  text="Add Widget"
                  logo={<Add />}
                  inverse
                  classname="add-btn"
                  onclick={() => null}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
