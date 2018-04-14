'use strict'

const getFormFields = require('../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('../scripts/store')

const onShowCreate = function (event) {
  event.preventDefault()
  ui.onShowCreateForm()
}

const onCreateList = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  store.data = data
  api.createList(data)
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
}

const onUpdate = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
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
  $('#list-content').empty()
  $('#clear-button').addClass('hidden')
}

const onDeleteList = (event) => {
  event.preventDefault()
  const id = event.target.dataset.id
  api.deleteList(id)
    .then(ui.onDeleteSuccess)
    .then($('#content').empty())
    .then(onShowAll)
    .catch(ui.onDeleteFailure)
}

const addHandlers = () => {
  $('#list-content').on('submit', '#create-form', onCreateList)
  $('#show-all').on('click', onShowAll)
  $('#content').on('click', '#see-more-button', onShowOne)
  $('#list-content').on('click', '.list-update', onShowUpdate)
  $('#list-content').on('submit', '#update-form', onUpdate)
  $('#clear-button').on('click', onClear)
  $('#list-content').on('click', '.list-delete', onDeleteList)
  $('#show-create-form').on('click', onShowCreate)
}

module.exports = {
  addHandlers
}
