'use strict'

const GoogleMapsLoader = require('google-maps')

GoogleMapsLoader.KEY = 'AIzaSyDYNUvtBwJqZK-viWIsQx5hlEMr-yUGJ2g'
GoogleMapsLoader.LIBRARIES = ['geometry', 'places']

function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: {lat: 40.731, lng: -73.997}
  })

  const geocoder = new google.maps.Geocoder()
  const infowindow = new google.maps.InfoWindow()

  document.getElementById('submit').addEventListener('click', function () {
    geocodeLatLng(geocoder, map, infowindow)
  })
}
//
// function geocodeLatLng (geocoder, map, infowindow) {
//   const input = document.getElementById('latlng').value
//   const latlngStr = input.split(',', 2)
//   const latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])}
//   geocoder.geocode({'location': latlng}, function (results, status) {
//     if (status === 'OK') {
//       if (results[0]) {
//         map.setZoom(11)
//         const marker = new google.maps.Marker({
//           position: latlng,
//           map: map
//         })
//         infowindow.setContent(results[0].formatted_address)
//         infowindow.open(map, marker)
//       } else {
//       window.alert('Geocoder failed due to: ' + status)
//     }
//   }
// })
// }
//
// module.exports = {
//   initMap()
//  }
