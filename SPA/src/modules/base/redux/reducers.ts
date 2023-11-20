import { createReducer } from '@reduxjs/toolkit'

import { formatErrors } from '@Lib/utils'

import { BasePageActions } from './actions'
import { ContactFailActionType } from './actionType'

interface baseInit {
  contact: {
    hasSentContactInfo?: boolean
    message?: string
  } | null
  joinWaitlist: {
    hasJoined?: boolean
  } | null
  loading: boolean
}

const initialState: baseInit = {
  contact: null,
  loading: false,
  joinWaitlist: null,
}

const basePageReducers = createReducer(initialState, builder => {
  builder
    .addCase(BasePageActions.CONTACT_US_INFO_DONE, (state, _) => {
      state.contact = {
        hasSentContactInfo: true,
        message: 'Thank you for your message. Team will get back',
      }
      state.loading = false
    })
    .addCase(
      BasePageActions.CONTACT_US_INFO_FAIL,
      (state, action: ContactFailActionType) => {
        const formattedErrors = formatErrors(
          Object.entries(action.payload).flatMap(([_, v]) => v),
        )
        state.contact = {
          hasSentContactInfo: false,
          message:
            formattedErrors || 'Something went wrong, team has been notified!',
        }
        state.loading = false
      },
    )
    .addCase(BasePageActions.CONTACT_US_INFO_LOAD, (state, _) => {
      state.loading = true
      state.contact = {
        message: '',
      }
    })
    .addCase(BasePageActions.CLEAR_BASE_INFO, (state, _) => {
      state.contact = null
      state.loading = false
    })
    .addCase(BasePageActions.JOIN_WAITLIST_LOAD, (state, _) => {
      state.loading = true
      state.joinWaitlist = null
    })
    .addCase(BasePageActions.JOIN_WAITLIST_DONE, (state, _) => {
      state.loading = false
      state.joinWaitlist = { hasJoined: true }
    })
    .addCase(BasePageActions.JOIN_WAITLIST_FAIL, (state, _) => {
      state.loading = false
      state.joinWaitlist = { hasJoined: false }
    })
})

export default basePageReducers
