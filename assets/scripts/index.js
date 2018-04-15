'use strict'

const authEvents = require('../auth/events')
const placeEvents = require('../place/events')
const mapEvents = require('../map/event')
// const test = require('../map/test')
// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  authEvents.addHandlers()
  placeEvents.addHandlers()
  $('#handlebars-button').on('click', function () {
    mapEvents.maps()
    // test.initMap()
  })
  $('#address').on('click', mapEvents.maps)
})
