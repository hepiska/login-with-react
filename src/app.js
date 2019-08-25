import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import Pages from './pages'

const App = () => {
  console.log('-----app')
  return (
    <Router>
      <Pages />
    </Router>
  )
}

export default App
