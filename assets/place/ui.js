'use strict'

const store = require('../scripts/store')
// const placeEvents = require('./events')
const showPlacesTemplate = require('../scripts/templates/all-places.handlebars')
const showPlaceTemplate = require('../scripts/templates/place.handlebars')
const showCreateTemplate = require('../scripts/templates/create-form.handlebars')
const showUpdateTemplate = require('../scripts/templates/update-form.handlebars')

const onShowCreateForm = () => {
  const showCreateHtml = showCreateTemplate()
  $('#clear-button').removeClass('hidden')
  $('#left-content').empty()
  $('#delete-feedback').text('')
  $('#left-content').append(showCreateHtml)
}

const onCreateSuccess = function (data) {
  store.data = data
  $('#create-form-feedback').removeClass('text-danger')
  $('#create-form-feedback').addClass('text-success')
  $('#create-form-feedback').text('saved!')
  $('form').trigger('reset')
  $('#content').empty()
  // $('#show-all').prop('disabled', false)
  $('#content').prop('disabled', false)
}

const onCreateFailure = function () {
  $('#create-form-feedback').addClass('text-danger')
  $('#create-form-feedback').removeClass('text-success')
  $('#create-form-feedback').text('not saved yet')
  $('form').trigger('reset')
}

const onShowAllSuccess = function (data) {
  store.data = data
  $('#clear-button').removeClass('hidden')
  if (data.places.length === 0) {
    $('#content').removeClass('text-success')
    $('#content').addClass('text-danger')
    $('#content').text('no place yet')
  } else {
    const showPlacesHtml = showPlacesTemplate({ places: data.places })
    $('#content').append(showPlacesHtml)
  }
}

const onShowAllFailure = function () {
  $('#content').removeClass('text-success')
  $('#content').addClass('text-danger')
  $('#content').text('Ooops please try gain')
}

const onShowOneSuccess = function (data) {
  const showPlaceHtml = showPlaceTemplate({ place: data.place })
  $('#left-content').empty()
  $('#delete-feedback').text('')
  $('#left-content').append(showPlaceHtml)
}

const onShowOneFailure = function () {
  $('#content').removeClass('text-success')
  $('#content').addClass('text-danger')
  $('#content').text('Please try again!')
}

const onShowUpdateForm = () => {
  $('#left-content').empty()
  const showUpdateHtml = showUpdateTemplate()
  $('#left-content').append(showUpdateHtml)
}

const getOne = (data) => {
  store.data = data
  console.log(data)
  console.log(data.place.category)
  // $('.update-id').val(data.place.id)
  $('.update-name').val(data.place.name)
  $('.update-category').val(data.place.category)
  $('.update-address').val(data.place.address)
  $('.update-description').val(data.place.description)
}

// const onUpdateSuccess = function (data) {
//   store.data = data
//   const showlistsHtml = showUpdateTemplate({ place: data.place })
//   $('#content').append(showlistsHtml)
//   $('input').val('')
//
//   // $('#updatesuccessModal').modal('show')
//   // $('#updatemyModal').modal('hide')
//   // $('#thisupdatemyModal').modal('hide')
//   // $('#your-modal-id').modal('hide')
//   // $('body').removeClass('modal-open')
//   // $('.modal-backdrop').remove()
// }

const onUpdateSuccess = function () {
  $('#update-form-feedback').removeClass('text-danger')
  $('#update-form-feedback').addClass('text-success')
  $('#update-form-feedback').text('Bucket place udpated successfully!')
  $('form').trigger('reset')
  $('#content').empty()
  $('#show-all').prop('disabled', false)
}

const onUpdateFailure = function () {
  $('#update-form-feedback').addClass('text-danger')
  $('#update-form-feedback').removeClass('text-success')
  $('#update-form-feedback').text('Udpate was unsuccessful! Try again!')
  $('form').trigger('reset')
}

const onDeleteSuccess = () => {
  $('#delete-feedback').removeClass('text-danger')
  $('#delete-feedback').addClass('text-success')
  $('#left-content').empty()
  $('#delete-feedback').text('Deleted successfully!')
}

const onDeleteFailure = () => {
  $('#delete-feedback').addClass('text-danger')
  $('#delete-feedback').removeClass('text-success')
  $('#left-content').empty()
  $('#delete-feedback').text('Delete was unsuccessful!')
}

module.exports = {
  onShowCreateForm,
  onCreateSuccess,
  onCreateFailure,
  onShowAllSuccess,
  onShowAllFailure,
  onShowOneSuccess,
  onShowOneFailure,
  onShowUpdateForm,
  getOne,
  onUpdateSuccess,
  onUpdateFailure,
  onDeleteSuccess,
  onDeleteFailure
}
