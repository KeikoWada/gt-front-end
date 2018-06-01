'use strict'
/* global $ */
const mapUi = require('../map/ui')

const GoogleMapsLoader = require('google-maps')

GoogleMapsLoader.KEY = 'AIzaSyDYNUvtBwJqZK-viWIsQx5hlEMr-yUGJ2g'
GoogleMapsLoader.LIBRARIES = ['geometry', 'places']

const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyDVQsDmrGkPLYBFZrvfKpOD-IsW_Bv5ZdI'
})

let markers = []
let route = []

// initialize the map point to boston
const initialize = function () {
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
      $('#clear-marker').removeClass('hidden')
    })

    // *********** add marker on map & invoke the geocodeLatLng function
    function addPoint (latlng) {
      const marker = new google.maps.Marker({
        position: latlng,
        animation: google.maps.Animation.DROP,
        map: map
      })

      const x = latlng.lat()
      const y = latlng.lng()
      route.push([x, y])
      markers.push(marker)
      geocodeLatLng(geocoder, map, infowindow, x, y)
      google.maps.event.addListener(marker, 'click', function (event) {
        maps(x, y)
      })
    }

    // ************************************************
    // get JSON objct from googleMap api
    const geocoder = new google.maps.Geocoder()
    const infowindow = new google.maps.InfoWindow()
    const geocodeLatLng = function (geocoder, map, infowindow, x, y) {
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

// ****************************************************************************
// rendering the json object from google api
const maps = function (data) {
  googleMapsClient.geocode({
    address: 'data'
  }, function (err, response) {
    if (!err) {
      mapUi.onMapAddress(data)
    }
  })
}

// *********************Create point and remove the marker*************
const thisMarkers = []
function setMapOnAll (map) {
  for (let z = 0; z < thisMarkers.length; z++) {
    thisMarkers[z].setMap(map)
    thisMarkers.push(map)
  }
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers () {
  setMapOnAll(null)
  thisMarkers.length = 0
}
// ********************************************************************
module.exports = {
  initialize,
  maps,
  deleteMarkers
}
