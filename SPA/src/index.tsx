import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from '@Home/store'

import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={App} />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)
