'use strict'

const config = require('../scripts/config')
const store = require('../scripts/store')
// const handlebars = require('../templates/list.handlebars')

const createList = function (data) {
  return $.ajax({
    url: config.apiUrl + '/lists',
    method: 'POST',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const update = function (data, id) {
  return $.ajax({
    url: config.apiUrl + '/lists/' + id,
    method: 'PATCH',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const showAll = function () {
  return $.ajax({
    url: config.apiUrl + '/lists',
    method: 'GET',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    }
  })
}
//
const showOne = function (id) {
  return $.ajax({
    url: config.apiUrl + '/lists/' + id,
    method: 'GET',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    }
  })
}
//
const deleteList = function (id) {

  return $.ajax({
    url: config.apiUrl + '/lists/' + id,
    method: 'DELETE',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  createList,
  update,
  showAll,
  showOne,
  deleteList
}
