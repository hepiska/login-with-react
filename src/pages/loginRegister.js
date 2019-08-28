import React from 'react'
import axios from 'axios'
import { Button, Form, Grid, Header, Message, Segment, Loader } from 'semantic-ui-react'



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
  } : {
      email: /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/,
      password: /^[a-zA-Z0-9]{3,30}$/,
      name: /[\w]{1}/,
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
      const { match } = this.props
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
          localStorage.setItem('token', response.data.data.token)
        } else {
          const response = await axios.post('https://pomonatodo.herokuapp.com/auth/register', { ...input })
          localStorage.setItem('token', response.data.data.token)
        }
        this.setState({ isLoading: false })
      } else {
        this.setState({ isValidate: newIsValidate, error: 'masukan semua field', isLoading: false })
      }
    } catch (error) {
      this.setState({ error: error.message, isLoading: false })
    }

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
            {match.path === '/login' ? 'Log-in to your account' : 'Wellcome new user'}
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


export default LoginRegisterPage