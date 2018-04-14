'use strict'

const authEvents = require('../auth/events')
const placeEvents = require('../place/events')
const mapEvents = require('../map/event')

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  authEvents.addHandlers()
  placeEvents.addHandlers()
  $('#test-button').on('click', function () {
    mapEvents.initialize({ lat: 42.3601, lng: -71.0589 })
    mapEvents.map()
    $('#map').text('here')
  })
  $('#map').on('click', '#test-button', mapEvents.map)
})
