import React from 'react'
import { graphql, gql } from 'react-apollo'
import { withRouter } from 'react-router'
import { Image, Button, Grid } from 'semantic-ui-react'
import Geosuggest from 'react-geosuggest';

import SpinButton from './SpinButton'
import Logo from './Logo'
import GettingStartedGoogleMaps from './GettingStartedGoogleMap'
import SidebarRightOverlay from './Sidebar'


class App extends React.Component {
  static propTypes = {
    router: React.PropTypes.object.isRequired,
    data: React.PropTypes.object.isRequired,
  }

  onSuggestSelect = (suggest) => {
    this.setState({location: suggest.location})
  }
  _logout = () => {
    // remove token from local storage and reload page to reset apollo client
    window.localStorage.removeItem('graphcoolToken')
    location.reload()
  }

  _showLogin = () => {
    this.props.router.push('/login')
  }

  _showSignup = () => {
    this.props.router.push('/signup')
  }

  _isLoggedIn = () => {
    return this.props.data.user
  }

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    if (this._isLoggedIn()) {
      return this.renderLoggedIn()
    } else {
      return this.renderLoggedOut()
    }
  }

  renderLoggedIn() {

    return (
      <div>
      <SpinButton loggedIn={true}/>
      <Logo />
      <div className = 'loggedInName'>
        <h4>
          Logged in as {this.props.data.user.name}
        </h4>
        <div className='pv3'>
          <span
            className='dib bg-red white pa3 pointer dim logOutBtn'
            onClick={this._logout}
          >
            Logout
          </span>
        </div>
       </div>
        <GettingStartedGoogleMaps />
      </div>
    )
  }

  renderLoggedOut() {
    var fixtures = [
      {label: 'Old Elbe Tunnel, Hamburg', location: {lat: 53.5459, lng: 9.966576}},
      {label: 'Reeperbahn, Hamburg', location: {lat: 53.5495629, lng: 9.9625838}},
      {label: 'Alster, Hamburg', location: {lat: 53.5610398, lng: 10.0259135}}
    ];
    return (
      <div>
      <div className='welcomeDiv'> 
         <h1>Welcome</h1>
         <p>click button on the left to start</p>
      </div>
        <SpinButton loggedIn={false}/>
        <Logo />
        <GettingStartedGoogleMaps />
      </div>
    )
  }
}


const userQuery = gql`
  query {
    user {
      id
      name
    }
  }
`

export default graphql(userQuery, { options: {fetchPolicy: 'network-only'}})(withRouter(App))
