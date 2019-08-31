import React from 'react'
import {
  Switch,
  Route,
} from 'react-router-dom'
import Home from './home'
import unAuthRedirectHoc from '../../hocs/unAuthRedirect'


const Pages = () => (
  <Switch>
    <Route exact path="/" component={Home} />
  </Switch>
)

export default unAuthRedirectHoc('login', Pages)