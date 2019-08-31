import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'




const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
})


const authRedirect = (redirectTo, Component) => {
  return connect(mapStateToProps, null)(({ isAuth, ...props }) => {
    if (!isAuth) {
      return (<Component {...props} />)
    }
    return <Redirect to={redirectTo} />
  })
}


export default authRedirect
