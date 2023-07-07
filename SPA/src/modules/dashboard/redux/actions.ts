import { AuthenticatedAPI } from '@Home/lib/api'
import { AppDispatch } from '@Home/store'
import { camelize } from '@Home/lib/utils'

export const enum DashboardActions {
  CLEAR_STATUS_CODE = 'DASHBOARD_ACTIONS/CLEAR_STATUS_CODE',
  GET_DASHBOARD_LIST_START = 'DASHBOARD_ACTIONS/GET_DASHBOARD_LIST_START',
  GET_DASHBOARD_LIST_DONE = 'DASHBOARD_ACTIONS/GET_DASHBOARD_LIST_DONE',
  DELETE_DASHBOARD_SUCCESS = 'DASHBOARD_ACTIONS/DELETE_DASHBOARD_SUCCESS',
  DELETE_DASHBOARD_FAIL = 'DASHBOARD_ACTIONS/DELETE_DASHBOARD_FAIL',
  CREATE_DASHBOARD_START = 'DASHBOARD_ACTIONS/CREATE_DASHBOARD_START',
  CREATE_DASHBOARD_SUCCESS = 'DASHBOARD_ACTIONS/CREATE_DASHBOARD_SUCCESS',
  CREATE_DASHBOARD_FAIL = 'DASHBOARD_ACTIONS/CREATE_DASHBOARD_FAIL',
  GET_SINGLE_DASHBOARD_SUCCESS = 'DASHBOARD_ACTIONS/GET_SINGLE_DASHBOARD_SUCCESS',
  GET_SINGLE_DASHBOARD_FAIL = 'DASHBOARD_ACTIONS/GET_SINGLE_DASHBOARD_FAIL',
}

export const getAllDashboards = () => (dispatch: AppDispatch) => {
  dispatch({
    type: DashboardActions.CLEAR_STATUS_CODE,
  })
  dispatch({
    type: DashboardActions.GET_DASHBOARD_LIST_START,
  })

  AuthenticatedAPI.get('dashboard/')
    .then(response => {
      dispatch({
        type: DashboardActions.GET_DASHBOARD_LIST_DONE,
        payload: {
          statusCode: response.status,
          dashboards: camelize(response.data),
        },
      })
    })
    .catch(err => {
      dispatch({
        type: DashboardActions.GET_DASHBOARD_LIST_DONE,
        payload: {
          statusCode: err.response.status,
          dashboards: [],
          errorMessage: err.response
            ? err.response.data.details
            : 'Connection refused',
        },
      })
    })
}

export const deleteDashboards = (ids: string[]) => (dispatch: AppDispatch) => {
  dispatch({
    type: DashboardActions.CLEAR_STATUS_CODE,
  })
  AuthenticatedAPI.delete('dashboard/delete/', { data: { ids } })
    .then(response => {
      dispatch({
        type: DashboardActions.DELETE_DASHBOARD_SUCCESS,
        payload: {
          statusCode: response.status,
          ids,
        },
      })
    })
    .catch(err => {
      dispatch({
        type: DashboardActions.DELETE_DASHBOARD_FAIL,
        payload: {
          statusCode: err.response.status,
          errorMessage: err.response
            ? err.response.data.details
            : 'Connection refused',
        },
      })
    })
}

export const createDashboard =
  (data: Record<string, string>) => (dispatch: AppDispatch) => {
    dispatch({
      type: DashboardActions.CLEAR_STATUS_CODE,
    })
    dispatch({
      type: DashboardActions.CREATE_DASHBOARD_START,
    })
    AuthenticatedAPI.post('dashboard/', { ...data })
      .then(response => {
        dispatch({
          type: DashboardActions.CREATE_DASHBOARD_SUCCESS,
          payload: {
            data: camelize(response.data),
            statusCode: response.status,
          },
        })
      })
      .catch(err => {
        dispatch({
          type: DashboardActions.CREATE_DASHBOARD_FAIL,
          payload: {
            statusCode: err.response.status,
            errorMessage: err.response
              ? err.response.data.details
              : 'Connection refused',
          },
        })
      })
  }

export const getDashboard = (id: string) => (dispatch: AppDispatch) => {
  dispatch({
    type: DashboardActions.CLEAR_STATUS_CODE,
  })
  dispatch({
    type: DashboardActions.CREATE_DASHBOARD_START,
  })
  AuthenticatedAPI.get(`dashboard/${id}`)
    .then(response => {
      dispatch({
        type: DashboardActions.GET_SINGLE_DASHBOARD_SUCCESS,
        payload: {
          data: camelize(response.data),
          statusCode: response.status,
        },
      })
    })
    .catch(err => {
      dispatch({
        type: DashboardActions.GET_SINGLE_DASHBOARD_FAIL,
        payload: {
          statusCode: err.response.status,
          errorMessage: err.response
            ? err.response.data.details
            : 'Connection refused',
        },
      })
    })
}
