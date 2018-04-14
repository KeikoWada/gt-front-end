'use strict'

const GoogleMapsLoader = require('google-maps')

GoogleMapsLoader.KEY = 'AIzaSyDYNUvtBwJqZK-viWIsQx5hlEMr-yUGJ2g'
GoogleMapsLoader.LIBRARIES = ['geometry', 'places']

const initialize = function () {
  $('#map').text('here')
  $('#map').show()

  GoogleMapsLoader.load(function (google) {
    const mapOptions = {
      zoom: 13,
      center: {lat: 42.3601, lng: -71.0589},
      map: map
    }
    const map = new google.maps.Map(document.getElementById('map'),
      mapOptions)
  })
}
// ****************************************************************************
const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyDVQsDmrGkPLYBFZrvfKpOD-IsW_Bv5ZdI '
})

const showMapTemplate = require('../scripts/templates/map.handlebars')

const map = function () {
  console.log('here')
  $('#map').show()
  $('#map').text('here')
  const showMapHtml = showMapTemplate({ map: googleMapsClient.map })
  $('#map').append(showMapHtml)

  googleMapsClient.geocode({
    address: '1600 Amphitheatre Parkway, Mountain View, CA'
  }, function (err, response) {
    if (!err) {
      console.log(response.json.results)
    }
  })
//
//   const mapOptions = {
//     zoom: 13,
//     center: {lat: 42.3601, lng: -71.0589}
//   }
//   const map = new google.maps.Map(document.getElementById('map'),
//     mapOptions)
}

module.exports = {
  initialize,
  map
}
