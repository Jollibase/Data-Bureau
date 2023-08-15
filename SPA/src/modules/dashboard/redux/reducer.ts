import { createReducer } from '@reduxjs/toolkit'

import { dashboardListProcessor } from '@Home/lib/processor/dashboardProcessor'
import type { dashboard } from '@Home/lib/processor/dashboardProcessor'
import type {
  clearStatusCodeActionType,
  createDashboardActionType,
  deleteDashboardsActionType,
  getDashboardListDoneActionType,
  getSingleDashboardActionType,
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
    selectedDb: dashboard | null
  }
  createdDashboard: {
    newDb: dashboard | null
    createLoading: boolean
  }
  statusCode: number
}

const initialState: dashboardInit = {
  dashboards: {
    all: [],
    loading: false,
    selectedDb: null,
  },
  createdDashboard: {
    createLoading: false,
    newDb: null,
  },
  statusCode: 0,
}

const dashboardReducer = createReducer(initialState, builder => {
  builder
    .addCase(
      DashboardActions.GET_DASHBOARD_LIST_DONE,
      (state, action: getDashboardListDoneActionType) => {
        state.dashboards.all = dashboardListProcessor(action.payload.dashboards)
        state.dashboards.selectedDb = null
        state.dashboards.loading = false
      },
    )
    .addCase(DashboardActions.GET_DASHBOARD_LIST_START, (state, _) => {
      state.dashboards.loading = true
    })
    .addCase(
      DashboardActions.DELETE_DASHBOARD_SUCCESS,
      (state, action: deleteDashboardsActionType) => {
        state.dashboards.all = state.dashboards.all.filter(
          item => !action.payload.ids.includes(item.id),
        )
      },
    )
    .addCase(DashboardActions.CREATE_DASHBOARD_START, (state, _) => {
      state.createdDashboard.createLoading = true
    })
    .addCase(
      DashboardActions.CREATE_DASHBOARD_SUCCESS,
      (state, action: createDashboardActionType) => {
        state.createdDashboard.createLoading = false
        state.createdDashboard.newDb = action.payload.data
      },
    )
    .addCase(
      DashboardActions.CLEAR_STATUS_CODE,
      (state, _: clearStatusCodeActionType) => {
        state.statusCode = 0
      },
    )
    .addCase(DashboardActions.CLEAR_CREATE_DASHBOARD, (state, _) => {
      state.createdDashboard.newDb = null
      state.createdDashboard.createLoading = false
    })
    .addCase(
      DashboardActions.GET_SINGLE_DASHBOARD_SUCCESS,
      (state, action: getSingleDashboardActionType) => {
        state.dashboards.selectedDb = action.payload.data
        state.statusCode = action.payload.statusCode
        state.dashboards.loading = false
      },
    )
})

export default dashboardReducer
