import { createReducer } from '@reduxjs/toolkit'

import { dashboardListProcessor } from '@Home/lib/processor/dashboardProcessor'
import type { dashboard } from '@Home/lib/processor/dashboardProcessor'
import type {
  clearStatusCode,
  createDashboard,
  deleteDashboards,
  getDashboardListDone,
} from './actionTypes'

import { DashboardActions } from './actions'

export const initialLenderAccountFormValues = {
  name: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  state: '',
  businessType: '',
  industry: '',
}

interface dashboardInit {
  dashboards: {
    all: dashboard[]
    loading: boolean
    new: dashboard | null
  }
  createLoading: boolean
  statusCode: number
}

const initialState: dashboardInit = {
  dashboards: {
    all: [],
    loading: false,
    new: null,
  },
  createLoading: false,
  statusCode: 0,
}

const dashboardReducer = createReducer(initialState, builder => {
  builder
    .addCase(
      DashboardActions.GET_DASHBOARD_LIST_DONE,
      (state, action: getDashboardListDone) => {
        state.dashboards.all = dashboardListProcessor(action.payload.dashboards)
        state.dashboards.loading = false
      },
    )
    .addCase(DashboardActions.GET_DASHBOARD_LIST_START, (state, _) => {
      state.dashboards.loading = true
    })
    .addCase(
      DashboardActions.DELETE_DASHBOARD_SUCCESS,
      (state, action: deleteDashboards) => {
        state.dashboards.all = state.dashboards.all.filter(
          item => !action.payload.ids.includes(item.id),
        )
      },
    )
    .addCase(DashboardActions.CREATE_DASHBOARD_START, (state, _) => {
      state.createLoading = true
    })
    .addCase(
      DashboardActions.CREATE_DASHBOARD_SUCCESS,
      (state, action: createDashboard) => {
        state.createLoading = false
        state.dashboards.new = action.payload.data
      },
    )
    .addCase(
      DashboardActions.CLEAR_STATUS_CODE,
      (state, _: clearStatusCode) => {
        state.statusCode = 0
      },
    )
})

export default dashboardReducer
