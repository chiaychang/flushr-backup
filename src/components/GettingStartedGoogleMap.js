import React, {Component } from 'react';

import { withGoogleMap ,
    GoogleMap,
    } from "react-google-maps";

var currentLat;
var currentLng;


        var options = {
          enableHighAccuracy: true,
          timeout: 3000,
          maximumAge: 0
        };

        function success(pos) {
          const crd = pos.coords;

          currentLat = parseFloat(crd.latitude);
          currentLng = parseFloat(crd.longitude); 

          // console.log(currentLng, currentLat);

        };

        function error(err) {
          throw err;
        };

        navigator.geolocation.getCurrentPosition(success, error, options);


const GettingStartedGoogleMap = withGoogleMap(props => (
              <GoogleMap
                  ref={props.onMapLoad}
                  defaultCenter={{ lat: 41.8781, lng: -87.6298 }}
                  //need this to work!
                  // defaultCenter={{ lat: currentLat, lng: currentLng }}
                  defaultZoom={9}
                  defaultOptions={{
                    scrollwheel: false,
                  }}
                  onClick={props.onMapClick}
              >
              </GoogleMap>
          ));


class GettingStartedGoogleMaps extends Component {

    render() {
      // console.log('map props', this.props.onMapLoad)

    return (

        <div style={{height: `90%`}}>
            <GettingStartedGoogleMap
                 containerElement={
                    <div style={{    position: 'absolute',
                        top: 145,
                        left: 35,
                        right: 35,
                        bottom: 5,
                        justifyContent: 'flex-end',
                        alignItems: 'center',}} />
                }
                mapElement={
                    <div style={{    position: 'absolute',
                        top: 145,
                        left: 35,
                        right: 35,
                        bottom: 5,
                   }} />
                }
            />
      </div>
    );
  }
}

export default GettingStartedGoogleMaps;
