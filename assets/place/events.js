'use strict'

const getFormFields = require('../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('../scripts/store')
const mapEvent = require('../map/event')

const onShowCreate = function (event) {
  event.preventDefault()
  ui.onShowCreateForm()
}

// const onPopulateAddress = function (event) {
//   // event.preventDefault()
//
//   ui.onAddressFromMap(event)
// }

const onCreatePlace = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  store.data = data
  api.createPlace(data)
    .then(ui.onCreateSuccess)
    .then(onShowAll)
    .catch(ui.onCreateFailure)
}

const onShowAll = function (event) {
  $('#show-all').prop('disabled', true)
  api.showAll(event)
    .then(ui.onShowAllSuccess)
    .catch(ui.onShowAllFailure)
}

const onShowOne = function (event) {
  event.preventDefault()
  const id = event.target.dataset.id
  api.showOne(id)
    .then(ui.onShowOneSuccess)
    .catch(ui.onShowOneFailure)
}

let id
const onShowUpdate = (event) => {
  event.preventDefault()
  id = $('.panel-title').attr('data-id')
  $('#update-form-id').val(id)
  ui.onShowUpdateForm()
  onOneLoad(event)
}

const onOneLoad = (event) => {
  event.preventDefault()

  // grab the `data-id` attribute
  const id = event.target.dataset.id
  api.showOne(id)
    .then(ui.getOne)
}

const onUpdate = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  console.log(id)
  console.log(data)
  api.update(data, id)
    .then(ui.onUpdateSuccess)
    .then(onShowAll)
    .catch(ui.onUpdateFailure)
}

const onClear = (event) => {
  event.preventDefault()
  $('#show-all').prop('disabled', false)
  $('#content').empty()
  $('#delete-feedback').text('')
  $('#content').empty()
  $('#clear-button').addClass('hidden')
  mapEvent.deleteMarkers()
}

const onClearMarker = (event) => {
  console.log('clear?')
  mapEvent.deleteMarkers()
  mapEvent.initialize()
}

const onDeletePlace = (event) => {
  event.preventDefault()
  const id = event.target.dataset.id
  api.deletePlace(id)
    .then(ui.onDeleteSuccess)
    .then($('#content').empty())
    .then(onShowAll)
    .catch(ui.onDeleteFailure)
}

const addHandlers = () => {
  $('#content').on('submit', '#create-form', onCreatePlace)
  $('#show-all').on('click', onShowAll)
  $('#content').on('click', '#see-more-button', onShowOne)
  // $('#content').on('click', '.place-update', onShowUpdate)
  $('#content').on('click', '.place-update', onShowUpdate)
  $('#content').on('submit', '#update-form', onUpdate)
  $('#clear-button').on('click', onClear)
  $('#clear-marker').on('click', onClearMarker)
  $('#content').on('click', '.place-delete', onDeletePlace)
  $('#show-create-form').on('click', onShowCreate)
}

module.exports = {
  addHandlers
  // onPopulateAddress
}
