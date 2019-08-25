import React from 'react'
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import LoginRegister from './loginRegister'
import Main from './main'

const Pages = () => (
  <div id="indexPage">
    <Switch>
      <Route path="/login" component={LoginRegister} />
      <Route path="/register" component={LoginRegister} />
      <Route exact path="/" component={Main} />
    </Switch>
  </div>
)

export default Pages