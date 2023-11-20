import { BasePageActions } from './actions'

export interface ContactFailActionType {
  type: BasePageActions.CONTACT_US_INFO_FAIL
  payload: { [key: string]: string }
}
