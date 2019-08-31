import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

import Pages from './pages'


const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Pages />
      </Router>
    </Provider>
  )
}

export default App
