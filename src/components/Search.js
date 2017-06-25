import React from 'react'
import { withRouter } from 'react-router'
import { Container, Grid } from 'semantic-ui-react'
import Geosuggest from 'react-geosuggest';

import Logo from './Logo'
import GettingStartedGoogleMaps from './GettingStartedGoogleMap'
  
  /* Clear button Geo
          <Grid.Column width={4}>
            <Button  primary onClick={()=>this._geoSuggest.clear()}>Clear</Button>
          </Grid.Column>*/

class Search extends React.Component {
  
  static propTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      location: '',
      router: React.PropTypes.object.isRequired
    };
  }

  onSuggestSelect = (suggest) => {
    this.setState({location: suggest.location})
  }

  render() {
    var fixtures = [
      {label: 'Old Elbe Tunnel, Hamburg', location: {lat: 53.5459, lng: 9.966576}},
      {label: 'Reeperbahn, Hamburg', location: {lat: 53.5495629, lng: 9.9625838}},
      {label: 'Alster, Hamburg', location: {lat: 53.5610398, lng: 10.0259135}}
    ];
    return (
      <Container>
        <Logo />
        <Grid.Row textAlign="center">
          <Grid.Column width={5}>
            <Geosuggest
              fixtures={fixtures}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              onChange={this.onChange}
              onSuggestSelect={this.onSuggestSelect}
              onSuggestNoResults={this.onSuggestNoResults}
              // location={new google.maps.LatLng(53.558572, 9.9278215)}
              radius="20" />
          </Grid.Column>

        </Grid.Row>
        <GettingStartedGoogleMaps />
      </Container>
    )
  }
}

export default withRouter(Search)