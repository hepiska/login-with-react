import React from 'react'


function loadAndInitGAPI() {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://apis.google.com/js/api.js'
    script.onload = (e) => {
      window.gapi.load('auth2', () => {
        resolve(window.gapi)
      })
    }
    document.getElementsByTagName('head')[0].appendChild(script)
  })
}

let GapiAuth = {}


class GoogleAuth extends React.Component {
  componentDidMount() {
    loadAndInitGAPI().then((gapi) => {
      gapi.auth2.init({ client_id: this.props.appId })
        .then(() => {
          GapiAuth = window.gapi.auth2.getAuthInstance()
        })
    })
  }

  _onClick = () => {
    GapiAuth.signIn().then((user) => {
      const profile = user.getBasicProfile()
      const output = {
        profile: {
          id: profile.getId(),
          firstName: profile.getGivenName(),
          lastName: profile.getFamilyName(),
          email: profile.getEmail(),
        },
      }
      this.props.onSuccess(output)
    })

  }

  render() {
    const { component: Component } = this.props
    return (
      <Component onClick={this._onClick} />
    )
  }
}

export default GoogleAuth