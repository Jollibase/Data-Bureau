import LenderSetupReducer from '@Modules/authentication/LenderSetup/redux/reducer'
import userReducer from './commonReducer/user'

export const reducer = {
  lenderSetup: LenderSetupReducer,
  user: userReducer,
}
