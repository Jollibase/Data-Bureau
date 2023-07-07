import LenderSetupReducer from '@Modules/authentication/LenderSetup/redux/reducer'
import userReducer from './commonReducer/user'
import dashboardReducer from '@Home/modules/dashboard/redux/reducer'

export const reducer = {
  lenderSetup: LenderSetupReducer,
  user: userReducer,
  dashboard: dashboardReducer,
}
