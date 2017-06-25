import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Container, Header } from 'semantic-ui-react'

import Logo from './Logo'
import GettingStartedGoogleMaps from './GettingStartedGoogleMap'

class About extends React.Component {

  render() {

    return (
      <Container>
        <Logo />
        <GettingStartedGoogleMaps />
        <Container>
        <div className='aboutDiv'>
          <h1>About Flushr</h1>
          <p>
          Flushr is an easy restrooms finder. It shows the nearest restrooms based on the user's geolocation. This app helps users quicly find what they need under urgency.  
          The crowed-sourced reviews would help businesses and public facilities improve restrooms quality.
          </p>
          <ul>
           <li>Find restrooms fast and easy</li>
           <li>Review a restroom based on experience</li>
           <li>Upload photos of restrooms visited</li>
           <li>Restroom features: gender netrality, changing table, tampon machine</li>
           </ul>
        </div>
        </Container>
      </Container>
    )
  }
}

export default withRouter(About)