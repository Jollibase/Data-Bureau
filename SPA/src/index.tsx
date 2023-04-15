import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'

import { store } from '@Home/store'

import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={App} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)
