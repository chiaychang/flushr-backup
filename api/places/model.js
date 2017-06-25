const axios = require('axios')

class PlacesAPI {
  constructor() {
    this.url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json'
    this.baseParams = {
      key: 'AIzaSyCKVn2dB7PBZo4DdY14TlGBG-e8YIEplOU',
      rankby: 'distance',
      location: {lat: -33.867, lng: 151.195}
    }
  }

  get(params) {
    params = Object.assign({}, this.baseParams, params)
    return axios.get(this.url, {
      params
    }).then(raw => {
      return raw.data.results.map(place => ({
        id: place.place_id,
        name: place.name,
        location: place.geometry.location,
        icon: place.icon,
        types: place.types
      }))
    })
  }
}


module.exports = new PlacesAPI()
const loc = new PlacesAPI()
console.log('California', loc.get())
