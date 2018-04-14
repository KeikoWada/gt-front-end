'use strict'

const mapEvent = require('./event')

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
