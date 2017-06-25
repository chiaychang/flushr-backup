import React from 'react'
import { withRouter } from 'react-router'
import { graphql, gql } from 'react-apollo'
import Logo from './Logo'
var Link = require("react-router").Link;

class CreateLogin extends React.Component {

  static propTypes = {
    router: React.PropTypes.object.isRequired,
    signinUser: React.PropTypes.func.isRequired,
    data: React.PropTypes.object.isRequired,
  }

  state = {
    email: '',
    password: '',
  }

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    // redirect if user is logged in
    if (this.props.data.user) {
      console.warn('already logged in')
      this.props.router.replace('/')
    }

    return (

      <div className='container'>
        <Logo />
        <h1 className='jumbotron'>Welcome to Flushr! Please Sign-In</h1>
        <div className='panel panel-default'>
          <div className='panel-heading'>Sign-In</div>
          <div className='panel-body'>

            <form className='ui form'>
              <div className='field'>
                <input
                  className='w-100 pa3 mv2'
                  type='email'
                  value={this.state.email}
                  placeholder='Email'
                  onChange={(e) => this.setState({email: e.target.value})}
                />
              </div>
              <div className='field'>
                <input
                  className='w-100 pa3 mv2'
                  type='password'
                  value={this.state.password}
                  placeholder='Password'
                  onChange={(e) => this.setState({password: e.target.value})}
                />
              </div>
              {this.state.email && this.state.password &&
              <button className='ui button teal' onClick={this.signinUser}>Log in</button>
              }
              </form>
          </div>
        </div>

        <div className="ui fluid image">
            <div className="ui black ribbon label">
                <i className="add user icon"></i> Join Flushr
            </div>
            <Link to='/signup'>
              <img className='signup-img' src={require('../../public/assets/images/toilet.gif')} alt="flushr-signup"/>
            </Link>
        </div>
        </div>
    )
  }

  signinUser = () => {
    const {email, password} = this.state

    this.props.signinUser({variables: {email, password}})
      .then((response) => {
        window.localStorage.setItem('graphcoolToken', response.data.signinUser.token)
        this.props.router.replace('/')
      }).catch((e) => {
        console.error(e)
        this.props.router.replace('/')
      })
  }
}

const signinUser = gql`
  mutation ($email: String!, $password: String!) { 
    signinUser(email: {email: $email, password: $password}) {
      token
    }
  }
`

const userQuery = gql`
  query {
    user {
      id
    }
  }
`

export default graphql(signinUser, {name: 'signinUser'})(
  graphql(userQuery, { options: { fetchPolicy: 'network-only' }})(withRouter(CreateLogin))
)
