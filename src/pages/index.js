import React from 'react'
import {
  Switch,
  Route,
} from 'react-router-dom'
import LoginRegister from './loginRegister'
import Main from './main'

const Pages = () => (
  <div id="indexPage">
    <Switch>
      <Route path="/login" exact component={LoginRegister} />
      <Route path="/register" exact component={LoginRegister} />
      <Route exact path="/" component={Main} />
    </Switch>
  </div>
)

export default Pages