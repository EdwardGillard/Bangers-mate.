import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isLoggedOn, logOut } from '../../lib/auths'

const SecureRoute = ({ component: Component, ...rest }) => {
  if (isLoggedOn()) return <Route {...rest} component={Component} />
  logOut()
  return <Redirect to="/login" />
}

export default SecureRoute