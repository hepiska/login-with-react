import React from 'react'
import axios from 'axios'
import { Button, Form, Grid, Header, Message, Segment, Loader, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { LOGIN } from '../reducers/auth'
import GoogleAuth from '../components/googleAuth'
import FacebookAuth from '../components/facebookAuth'
import authRedirectHoc from '../hocs/authRedirect'





class LoginRegisterPage extends React.Component {
  state = {
    input: {},
    isValidate: {},
    isLoading: false,
    error: null,
  }

  validationCondition = this.props.match.path === '/login' ? {
    email: /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/,
    password: /^[a-zA-Z0-9]{3,30}$/
  } :
    {
      email: /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/,
      password: /^[a-zA-Z0-9]{3,30}$/,
      name: /[\w]{1}/,
    }

  componentDidMount() {
    const { isAuth, history } = this.props
    if (isAuth) {
      history.push('/')
    }
  }

  selectField = () => {
    const { match } = this.props
    if (match.path === '/login') {
      return [{
        name: 'email',
        icon: 'mail',
        iconPosition: 'left',
        placeholder: 'E-mail address',
      },
      {
        name: 'password',
        icon: 'lock',
        iconPosition: 'left',
        placeholder: 'Password',
        type: 'password'
      }]
    } else {
      return [
        {
          name: 'name',
          icon: 'user',
          iconPosition: 'left',
          placeholder: 'masukan nama',
        },
        {
          name: 'email',
          icon: 'mail',
          iconPosition: 'left',
          placeholder: 'E-mail address',
        },
        {
          name: 'password',
          icon: 'lock',
          iconPosition: 'left',
          placeholder: 'Password',
          type: 'password'
        }]
    }
  }



  _onFieldChange = (e, data) => {
    const { input, isValidate } = this.state
    const newInput = { ...input }
    const newIsValidate = { ...isValidate }
    newInput[data.name] = data.value
    newIsValidate[data.name] = this.validationCondition[data.name].test(data.value)
    this.setState({ input: newInput, isValidate: newIsValidate, error: null })
  }

  _onFormSubmit = async (e) => {
    try {
      const { match, history } = this.props
      const { input, isValidate } = this.state
      const newIsValidate = { ...isValidate }
      const isValidateAll = this.selectField().reduce((acc, dat) => {
        newIsValidate[dat.name] = !!isValidate[dat.name]
        return acc && !!isValidate[dat.name]
      }, true)
      if (isValidateAll) {
        this.setState({ isLoading: true })
        if (match.path === '/login') {
          const response = await axios.post('https://pomonatodo.herokuapp.com/auth/login', { ...input })
          this.props.LOGIN({ token: response.data.data.token })
        } else {
          const response = await axios.post('https://pomonatodo.herokuapp.com/auth/register', { ...input })
          this.props.LOGIN({ token: response.data.data.token })
        }
        this.setState({ isLoading: false })
        // history.push('/')
      } else {
        this.setState({ isValidate: newIsValidate, error: 'masukan semua field', isLoading: false })
      }
    } catch (error) {
      this.setState({ error: error.message, isLoading: false })
    }

  }

  _onGoogleAuth = (userData) => {
    console.log(userData)
  }

  _onFacebookAuth = (userData) => {
    console.log(userData)
  }

  _changePage = () => {
    if (this.props.match.path === '/login') {
      this.props.history.push('/register')
    } else {
      this.props.history.push('/login')
    }
  }

  render() {
    const { input, isValidate, error, isLoading } = this.state
    const { match } = this.props
    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            {match.path === '/login' ? 'Log-in to your account' : 'Wellcome new users'}
          </Header>
          <Form size='large' error={error} onSubmit={this._onFormSubmit}>
            <Segment stacked>
              {this.selectField().map((field) => (
                <Form.Input
                  fluid
                  {...field}
                  value={input[field.name]}
                  error={isValidate[field.name] !== undefined && !isValidate[field.name]}
                  onChange={this._onFieldChange}
                />
              ))}
              <Message
                error
                header='error'
                content={error}
              />
              {isLoading ? <Loader active inline /> : (
                <Button color='teal' type='submit' fluid size='large'>
                  {match.path === '/login' ? 'Login' : 'Sign up'}
                </Button>
              )}

            </Segment>
          </Form>
          <GoogleAuth
            onSuccess={this._onGoogleAuth}
            appId='173621131669-9djag01ckvq74r5g6436nd3ddk3q8vi4.apps.googleusercontent.com'
            component={(_props) => (
              <Button {..._props} icon fluid style={{ margin: '16px 0px' }}>
                <Icon name='google' />
                Sign With Google
              </Button>
            )}
          />
          <FacebookAuth
            onSuccess={this._onFacebookAuth}
            appId='1345810558907241'
            component={(_props) => (
              <Button {..._props} icon fluid color='facebook' style={{ margin: '16px 0px' }}>
                <Icon name='facebook' />
                Sign With Facebook
              </Button>
            )}
          />
          <Message>
            New to us
            <a href='' onClick={this._changePage}>
              {match.path !== '/login' ? ' Login' : ' Sign up'}
            </a>
          </Message>
        </Grid.Column>
      </Grid>
    )
  }
}

// const mapStateToProps = state => ({ isAuth: state.auth.isAuth })
const mapDispatchToProps = dispatch => bindActionCreators({
  LOGIN,

}, dispatch)

const LoginPageWithAuthRedirect = authRedirectHoc('/', LoginRegisterPage)

export default connect(null, mapDispatchToProps)(LoginPageWithAuthRedirect)