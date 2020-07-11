const fetch = require('node-fetch')

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURI(address) +'.json?access_token=pk.eyJ1IjoiYW5lZXNiYW5qYXJhIiwiYSI6ImNrYmJ6OXV4bDA0OTUycnFzZjhnOG82a3UifQ.3UTQkO6spVx4SGlTle4xAw'
  fetch(url)
  .then((res) => res.json())
  .then(({features}) =>{
    if (features.length === 0) {
      callback('unable to find location',undefined)
    } else {
      callback(undefined, {
        latitude: features[0].center[1],
        longitude: features[0].center[0],
        location: features[0].place_name
      } )
    }
    })
  .catch((e) => callback('unable to connect to network.',undefined))
}



module.exports = geocode