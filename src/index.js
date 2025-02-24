import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import store from './app/store'
import { fetchUsers } from './features/users/usersSlice'
import { Provider } from 'react-redux'

import { worker } from './api/server'
import { useGetUsersQuery, extendedApiSlice } from './features/users/usersSlice'

// Wrap app rendering so we can wait for the mock API to initialize
async function start() {
  // Start our mock API server
  await worker.start({ onUnhandledRequest: 'bypass' })

  // store.dispatch(fetchUsers())
  // Not working const [fetchUsers] = useGetUsersQuery()
  // fetchUsers()
  store.dispatch(extendedApiSlice.endpoints.getUsers.initiate())

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  )
}

start()
