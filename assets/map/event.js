'use strict'

const GoogleMapsLoader = require('google-maps')
const ui = require('./ui')

GoogleMapsLoader.KEY = 'AIzaSyDYNUvtBwJqZK-viWIsQx5hlEMr-yUGJ2g'
GoogleMapsLoader.LIBRARIES = ['geometry', 'places']

const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyDVQsDmrGkPLYBFZrvfKpOD-IsW_Bv5ZdI'
})

let markers = []
let route = []

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

    google.maps.event.addListener(map, 'click', function (event) {
      addPoint(event.latLng)
    })
    function removePoint (marker) {
      console.log('hi')
      for (let i = 0; i < markers.length; i++) {
        if (markers[i] === marker) {
          markers[i].setMap(null)
          markers.splice(i, 1)
          route.splice(i, 1)
        }
      }
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

// ***************
const geocoder = new google.maps.Geocoder
const infowindow = new google.maps.InfoWindow
const geocodeLatLng = function (geocoder, map, infowindow) {
      // const input = document.getElementById('latlng').value
      // const latlngStr = input.split(',', 2)
      console.log(latling)
      const latlng = {lat: 42.3601, lng: -71.0589}
      geocoder.geocode({'location': latlng}, function (results, status) {
        if (status === 'OK') {
          if (results[0]) {
            map.setZoom(11)
            const marker = new google.maps.Marker({
              position: latlng,
              map: map
            })
            infowindow.setContent(results[0].formatted_address)
            infowindow.open(map, marker)
          } else {
            window.alert('No results found')
          }
        } else {
          window.alert('Geocoder failed due to: ' + status)
        }
      })
    }
    // ***********
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
      // console.log([x, y])
      google.maps.event.addListener(marker, 'click', function (event) {
        removePoint(marker)
        // maps(x, y)
        geocodeLatLng(geocoder, map, infowindow)
        // console.log(x, y)
      })
    }
  })
  // function mapss (marker) {
  //   console.log(marker)
  // }
}
// ****************************************************************************
const maps = function () {
  googleMapsClient.geocode({
    address: '1600 Amphitheatre Parkway, Mountain View, CA'
  }, function (err, response) {
    if (!err) {
      console.log(response.json.results)
      ui.onShowMap(response.json.results)
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
module.exports = {
  initialize,
  maps
}
