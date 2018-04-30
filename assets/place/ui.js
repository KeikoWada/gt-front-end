'use strict'
/* global $ */

const store = require('../scripts/store')
require('jquery-toast-plugin')

const showPlacesTemplate = require('../scripts/templates/all-places.handlebars')
const showPlaceTemplate = require('../scripts/templates/place.handlebars')
const showCreateTemplate = require('../scripts/templates/create-form.handlebars')
const showUpdateTemplate = require('../scripts/templates/update-form.handlebars')

const onShowCreateForm = () => {
  const showCreateHtml = showCreateTemplate()
  $('#clear-button').removeClass('hidden')
  $('#content').empty()
  $('#content').append(showCreateHtml)
}

const onCreateSuccess = function (data) {
  store.data = data
  $('#create-form-feedback').removeClass('text-danger')
  $('#create-form-feedback').addClass('text-success')
  $('#create-form-feedback').text('saved!')
  $('form').trigger('reset')
  $('#content').empty()
  $('#content').prop('disabled', false)
  createFeedback()
}

const createFeedback = () => {
  $.toast({
    heading: 'Add Your Favorite Place Successfully!',
    icon: 'success',
    showHideTransition: 'fade',
    allowToastClose: true,
    hideAfter: 3000,
    stack: 5,
    textAlign: 'left',
    loader: true,
    position: 'top-left'
  })
}

const onCreateFailure = function () {
  $('#create-form-feedback').addClass('text-danger')
  $('#create-form-feedback').removeClass('text-success')
  $('#create-form-feedback').text('not saved yet')
  createFailureFeedback()
  $('form').trigger('reset')
}

const createFailureFeedback = () => {
  $.toast({
    heading: 'Error Adding Favorite Place',
    icon: 'error',
    showHideTransition: 'fade',
    allowToastClose: true,
    hideAfter: 3000,
    stack: 5,
    textAlign: 'left',
    loader: true,
    position: 'top-left'
  })
}

const onShowAllSuccess = function (data) {
  store.data = data

  if (data.places.length === 0) {
    showAllFailureFeedback()
    $('#clear-button').addClass('hidden')
    $('#show-all').prop('disabled', false)
  } else {
    const showPlacesHtml = showPlacesTemplate({ places: data.places })
    $('#content').html(showPlacesHtml)
    $('#clear-button').removeClass('hidden')
    $('#show-all').prop('disabled', false)
  }
}

const showAllFailureFeedback = () => {
  $.toast({
    heading: 'Ooops There no list yet',
    icon: 'error',
    showHideTransition: 'fade',
    allowToastClose: true,
    hideAfter: 3000,
    stack: 5,
    textAlign: 'left',
    loader: true,
    position: 'top-left'
  })
}

const showFailureFeedback = () => {
  $.toast({
    heading: 'Ooops There is no matches',
    icon: 'error',
    showHideTransition: 'fade',
    allowToastClose: true,
    hideAfter: 3000,
    stack: 5,
    textAlign: 'left',
    loader: true,
    position: 'top-left'
  })
}

const filter = function (response, event) {
  // response                  this is the array from db
// $('#search-text').val()     this is the input field
  const data = response.places.filter((e, i, a) => e.category === $('#search-text').val())
  // console.log('data is ', data)
  if (data.length === 0) {
    showFailureFeedback()
    $('#content').empty()
    $('#clear-button').addClass('hidden')
    $('#show-all').prop('disabled', false)
    $('form').trigger('reset')
  } else {
    const showPlacesHtml = showPlacesTemplate({ places: data })
    $('#content').html(showPlacesHtml)
    $('#clear-button').removeClass('hidden')
    $('form').trigger('reset')
    $('#show-all').prop('disabled', false)
  }
}

const onShowAllFailure = function () {
  $('#content').removeClass('text-success')
  $('#content').addClass('text-danger')
  $('#content').text('Ooops please try gain')
}

const onShowOneSuccess = function (data) {
  const showPlaceHtml = showPlaceTemplate({ place: data.place })
  $('#content').empty()
  $('#delete-feedback').text('')
  $('#content').append(showPlaceHtml)
}

const onShowOneFailure = function () {
  $('#content').removeClass('text-success')
  $('#content').addClass('text-danger')
  $('#content').text('Please try again!')
}

const onShowUpdateForm = () => {
  $('#content').empty()
  const showUpdateHtml = showUpdateTemplate()
  $('#content').append(showUpdateHtml)
}

// const onAddressFromMap = (data) => {
//   store.data = data
//   console.log(data)
//   console.log(data.place.address)
//   // $('.update-id').val(data.place.id)
//   $('.update-name').val('')
//   $('.update-category').val('')
//   $('.update-address').val(data.place.address)
//   $('.update-description').val('')
// }

const getOne = (data) => {
  store.data = data
  // console.log(data)
  // console.log(data.place.category)

  $('.update-name').val(data.place.name)
  $('.update-category').val(data.place.category)
  $('.update-address').val(data.place.address)
  $('.update-description').val(data.place.description)
}

const onUpdateSuccess = function () {
  $('form').trigger('reset')
  $('#content').empty()
  $('#show-all').prop('disabled', false)
  updateSuccessFeedback()
}

const updateSuccessFeedback = () => {
  $.toast({
    heading: 'Updated Successfully!',
    icon: 'success',
    showHideTransition: 'fade',
    allowToastClose: true,
    hideAfter: 3000,
    stack: 5,
    textAlign: 'left',
    loader: true
  })
}
const onUpdateFailure = function () {
  $('form').trigger('reset')
  updateFailureFeedback()
}

const updateFailureFeedback = () => {
  $.toast({
    heading: 'Error Adding Favorite Place',
    icon: 'error',
    showHideTransition: 'fade',
    allowToastClose: true,
    hideAfter: 3000,
    stack: 5,
    textAlign: 'left',
    loader: true,
    position: 'top-left'
  })
}

const onDeleteSuccess = () => {
  $('#content').empty()
  deleteSuccessFeedback()
}

const deleteSuccessFeedback = () => {
  $.toast({
    heading: 'Deleted Successfully!',
    icon: 'success',
    showHideTransition: 'fade',
    allowToastClose: true,
    hideAfter: 3000,
    stack: 5,
    textAlign: 'left',
    loader: true,
    position: 'top-left'
  })
}

const onDeleteFailure = () => {
  $('#content').empty()
  deleteFailureFeedback()
}

const deleteFailureFeedback = () => {
  $.toast({
    heading: 'Error deleting',
    icon: 'error',
    showHideTransition: 'fade',
    allowToastClose: true,
    hideAfter: 3000,
    stack: 5,
    textAlign: 'left',
    loader: true,
    position: 'top-left'
  })
}

module.exports = {
  onShowCreateForm,
  onCreateSuccess,
  onCreateFailure,
  createFailureFeedback,
  filter,
  onShowAllSuccess,
  onShowAllFailure,
  onShowOneSuccess,
  onShowOneFailure,
  onShowUpdateForm,
  createFeedback,
  getOne,
  onUpdateSuccess,
  updateSuccessFeedback,
  onUpdateFailure,
  updateFailureFeedback,
  onDeleteSuccess,
  deleteSuccessFeedback,
  onDeleteFailure,
  deleteFailureFeedback
}
