'use strict'

const GoogleMapsLoader = require('google-maps')

// GoogleMapsLoader.KEY = 'AIzaSyDYNUvtBwJqZK-viWIsQx5hlEMr-yUGJ2g'
// Googleapis.KEY = 'AlzaSyDVQsDmrGkPLYBFZrvfKpOD-lsW_Bv5Zdl'
// GoogleMapsLoader.LIBRARIES = ['geometry', 'places']
GoogleMapsLoader.KEY = 'AIzaSyDYNUvtBwJqZK-viWIsQx5hlEMr-yUGJ2g'
GoogleMapsLoader.LIBRARIES = ['geometry', 'places']

const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyDVQsDmrGkPLYBFZrvfKpOD-IsW_Bv5ZdI'
})
// $('#test').on('click', initAutocomplete)

function initAutocomplete () {
  console.log('test')
  const map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -33.8688, lng: 151.2195},
    zoom: 13,
    mapTypeId: 'roadmap'
  })

  // Create the search box and link it to the UI element.
  const input = document.getElementById('pac-input')
  const searchBox = new google.maps.places.SearchBox(input)
  map.constrols[google.maps.ControlPosition.TOP_LEFT].push(input)

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function () {
    searchBox.setBounds(map.getBounds())
  })

markers = []
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    const places = searchBox.getPlaces()

    if (places.length === 0) {
      return
    }

    // Clear out the old markers.
    markers.forEach(function (marker) {
      marker.setMap(null)
    })
    markers = []

    // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds()
    places.forEach(function (place) {
      if (!place.geometry) {
        console.log('Returned place constains no geometry')
        return
      }
      const icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      }

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }))

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport)
      } else {
        bounds.extend(place.geometry.location)
      }
    })
    map.fitBounds(bounds)
  })
}

module.exports = {
  initAutocomplete
}
