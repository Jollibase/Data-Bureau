import { dashboard } from '@Home/lib/processor/dashboardProcessor'

import { DashboardActions } from './actions'
export interface LenderDetails {
  id: number
  users: {
    id: number
    username: string
    email: string
    password: string
    first_name: string
    last_name: string
    isActive: boolean
    company: number
    isLenderAdmin: string
  }[]
  public: string
  name: string
  address: string
  phone: string
}

export interface getDashboardListDoneActionType {
  type: DashboardActions.GET_DASHBOARD_LIST_DONE
  payload: {
    dashboards: []
  }
}
export interface deleteDashboardsActionType {
  type: DashboardActions.DELETE_DASHBOARD_SUCCESS
  payload: {
    statusCode: number
    ids: string[]
  }
}

export interface createDashboardActionType {
  type: DashboardActions.CREATE_DASHBOARD_SUCCESS
  payload: {
    data: dashboard
  }
}

export interface clearStatusCodeActionType {
  type: DashboardActions.CLEAR_STATUS_CODE
}

export interface getSingleDashboardActionType {
  type: DashboardActions.GET_SINGLE_DASHBOARD_SUCCESS
  payload: {
    data: dashboard
    statusCode: number
  }
}
