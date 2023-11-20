import { API } from '@Home/lib/api'
import { snakify } from '@Home/lib/utils'
import { AppDispatch } from '@Home/store'

export const enum BasePageActions {
  CONTACT_US_INFO_DONE = 'BasePageActions/CONTACT_US_INFO_DONE',
  CONTACT_US_INFO_FAIL = 'BasePageActions/CONTACT_US_INFO_FAIL',
  CONTACT_US_INFO_LOAD = 'BasePageActions/CONTACT_US_INFO_LOAD',
  CLEAR_BASE_INFO = 'BasePageActions/CLEAR_BASE_INFO',
  JOIN_WAITLIST_DONE = 'BasePageActions/JOIN_WAITLIST_DONE',
  JOIN_WAITLIST_FAIL = 'BasePageActions/JOIN_WAITLIST_FAIL',
  JOIN_WAITLIST_LOAD = 'BasePageActions/JOIN_WAITLIST_LOAD',
}

export const sendContactInfo = (
  data: Record<string, string>,
  callable: VoidFunction,
) =>
  function (dispatch: AppDispatch) {
    dispatch({
      type: BasePageActions.CONTACT_US_INFO_LOAD,
    })
    const snakedData = snakify(data)

    API.post('/accounts/contact-us/', snakedData)
      .then(_ => {
        dispatch({
          type: BasePageActions.CONTACT_US_INFO_DONE,
        })
        callable()
      })
      .catch(err => {
        dispatch({
          type: BasePageActions.CONTACT_US_INFO_FAIL,
          payload: err.response.data,
        })
      })
  }

export const clearBaseInfo = () => (dispatch: AppDispatch) => {
  dispatch({
    type: BasePageActions.CLEAR_BASE_INFO,
  })
}

export const joinWaitlist = (
  data: Record<string, string>,
  navigate: (e: string) => void,
) =>
  function (dispatch: AppDispatch) {
    dispatch({
      type: BasePageActions.JOIN_WAITLIST_LOAD,
    })
    const snakedData = snakify(data)

    API.post('/accounts/join-waitlist/', snakedData)
      .then(_ => {
        localStorage.setItem('isWaitlisted', JSON.stringify(data))
        dispatch({
          type: BasePageActions.JOIN_WAITLIST_DONE,
        })
        navigate('/thank-you')
      })
      .catch(_ => {
        dispatch({
          type: BasePageActions.JOIN_WAITLIST_FAIL,
        })
      })
  }

export const getCompanyCount = () => (dispatch: AppDispatch) => {
  API.get('/accounts/join-waitlist/')
    .then(response => {
      dispatch({
        type: BasePageActions.JOIN_WAITLIST_DONE,
        payload: {
          count: response.data.count,
        },
      })
    })
    .catch(_ => {
      dispatch({
        type: BasePageActions.JOIN_WAITLIST_FAIL,
      })
    })
}
