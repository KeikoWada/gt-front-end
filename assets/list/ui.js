'use strict'

const store = require('../scripts/store')
// const listEvents = require('./events')
const showListsTemplate = require('../scripts/templates/all-lists.handlebars')
const showListTemplate = require('../scripts/templates/list.handlebars')
const showCreateTemplate = require('../scripts/templates/create-form.handlebars')
const showUpdateTemplate = require('../scripts/templates/update-form.handlebars')

const onShowCreateForm = () => {
  const showCreateHtml = showCreateTemplate()
  $('#clear-button').removeClass('hidden')
  $('#list-content').empty()
  $('#delete-feedback').text('')
  $('#list-content').append(showCreateHtml)
}

const onCreateSuccess = function (data) {
  store.data = data
  $('#create-form-feedback').removeClass('text-danger')
  $('#create-form-feedback').addClass('text-success')
  $('#create-form-feedback').text('saved!')
  $('form').trigger('reset')
  $('#content').empty()
  $('#show-all').prop('disabled', false)
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
  if (data.lists.length === 0) {
    $('#content').removeClass('text-success')
    $('#content').addClass('text-danger')
    $('#content').text('Add to your Bucket List!')
  } else {
    const showListsHtml = showListsTemplate({ lists: data.lists })
    $('#content').append(showListsHtml)
  }
}

const onShowAllFailure = function () {
  $('#content').removeClass('text-success')
  $('#content').addClass('text-danger')
  $('#content').text('Ooops please try gain')
}

const onShowOneSuccess = function (data) {
  const showListHtml = showListTemplate({ list: data.list })
  $('#list-content').empty()
  $('#delete-feedback').text('')
  $('#list-content').append(showListHtml)
}

const onShowOneFailure = function () {
  $('#content').removeClass('text-success')
  $('#content').addClass('text-danger')
  $('#content').text('Please try again!')
}

const onShowUpdateForm = () => {
  const showUpdateHtml = showUpdateTemplate()
  $('#list-content').empty()
  $('#list-content').append(showUpdateHtml)
}

const onUpdateSuccess = function () {
  $('#update-form-feedback').removeClass('text-danger')
  $('#update-form-feedback').addClass('text-success')
  $('#update-form-feedback').text('Bucket list udpated successfully!')
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
  $('#list-content').empty()
  $('#delete-feedback').text('Deleted successfully!')
}

const onDeleteFailure = () => {
  $('#delete-feedback').addClass('text-danger')
  $('#delete-feedback').removeClass('text-success')
  $('#list-content').empty()
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
  onUpdateSuccess,
  onUpdateFailure,
  onDeleteSuccess,
  onDeleteFailure
}
