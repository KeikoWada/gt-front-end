'use strict'

const mapUi = require('../map/ui')

const GoogleMapsLoader = require('google-maps')
const ui = require('./ui')

GoogleMapsLoader.KEY = 'AIzaSyDYNUvtBwJqZK-viWIsQx5hlEMr-yUGJ2g'
GoogleMapsLoader.LIBRARIES = ['geometry', 'places']

const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyDVQsDmrGkPLYBFZrvfKpOD-IsW_Bv5ZdI'
})

let markers = []
let route = []

// initialize the map point to boston
const initialize = function () {
  console.log('test')
  $('#map').show()
  GoogleMapsLoader.load(function (google) {
    markers = []
    route = []
    const mapOptions = {
      zoom: 13,
      center: {lat: 42.3601, lng: -71.0589},
      map: map
    }
    const map = new google.maps.Map(document.getElementById('map'),
      mapOptions)
    // listner function to add Point
    google.maps.event.addListener(map, 'click', function (event) {
      addPoint(event.latLng)
    })

    // *********** add marker on map & invoke the geocodeLatLng function
    function addPoint (latlng) {
      console.log(latlng)
      const marker = new google.maps.Marker({
        position: latlng,
        animation: google.maps.Animation.DROP,
        map: map
      })

      const x = latlng.lat()
      const y = latlng.lng()
      route.push([x, y])
      markers.push(marker)
      // geocodeLatLng(geocoder, map, infowindow, x, y)
      google.maps.event.addListener(marker, 'click', function (event) {
        removePoint(marker)
        maps(x, y)
        console.log('marker is ', markers)
        geocodeLatLng(geocoder, map, infowindow, x, y)
      })
    }

    // *************************************************************
    // remove the Point when it's double clicked

    function removePoint (marker) {
      for (let i = 0; i < markers.length; i++) {
        if (markers[i] > marker) {
          markers.setMap(null)
          markers[i].setMap(map)
          markers.splice(i, 1)
          route.splice(i, 1)
        }
      }
    }

    // ************************************************
    // get JSON objct from googleMap api
const geocoder = new google.maps.Geocoder
const infowindow = new google.maps.InfoWindow
const geocodeLatLng = function (geocoder, map, infowindow, x, y) {
      // const input = document.getElementById('latlng').value
      // const latlngStr = input.split(',', 2)
      console.log(x, y)
      const latlng = {lat: x, lng: y}
      geocoder.geocode({'location': latlng}, function (results, status) {
        if (status === 'OK') {
          if (results[0]) {
            map.setZoom(14)
            const marker = new google.maps.Marker({
              position: latlng,
              map: map
            })
            infowindow.setContent(results[0].formatted_address)
            maps(results[0].formatted_address)
            infowindow.open(map, marker)
          } else {
            window.alert('No results found')
          }
        } else {
          window.alert('Geocoder failed due to: ' + status)
        }
      })
    }
  })
}

// const maps = function (latling) {
//   console.log(latling)
// const input = document.getElementById('address').value
//   googleMapsClient.geocode({
//     Address: '27 branch st. quincy, ma'
//   }, function (err, response) {
//     if (!err) {
//       console.log(response.json.results)
//       ui.onShowMap(response.json.results)
//     }
//   })
// }

//     // ************************************************
//     // get JSON objct from googleMap api
// const geocoder = new google.maps.Geocoder
// const infowindow = new google.maps.InfoWindow
// const geocodeLatLng = function (geocoder, map, infowindow, x, y) {
//       // const input = document.getElementById('latlng').value
//       // const latlngStr = input.split(',', 2)
//       console.log(x, y)
//       const latlng = {lat: x, lng: y}
//       geocoder.geocode({'location': latlng}, function (results, status) {
//         if (status === 'OK') {
//           if (results[0]) {
//             map.setZoom(15)
//             const marker = new google.maps.Marker({
//               position: latlng,
//               map: map
//             })
//             infowindow.setContent(results[0].formatted_address)
//             maps(results[0].formatted_address)
//             infowindow.open(map, marker)
//           } else {
//             window.alert('No results found')
//           }
//         } else {
//           window.alert('Geocoder failed due to: ' + status)
//         }
//       })
//     }
//   })
// }
// ****************************************************************************
// rendering the json object from google api
const maps = function (data) {
  console.log(data)
  googleMapsClient.geocode({
    address: 'data'
  }, function (err, response) {
    if (!err) {
      console.log(response.json.results)
      console.log('json is ', response.json.results)
      mapUi.onMapAddress(data)
      // ui.onShowMap(data)
    }
  })
}

// const maps = function (address) {
//   console.log(address)
//   // const input = document.getElementById('address').value
//   googleMapsClient.geocode({
//     Address: address
//   }, function (err, response) {
//     if (!err) {
//       console.log(response.json.results)
//       ui.onShowMap(response.json.results)
//     }
//   })
// }

// *********************Create point and remove the marker*************
function setMapOnAll (map) {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map)
  }
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers () {
  setMapOnAll(null)
  markers = []
}
// ********************************************************************
module.exports = {
  initialize,
  maps,
  deleteMarkers
}
