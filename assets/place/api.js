'use strict'
/* global $ */
const config = require('../scripts/config')
const store = require('../scripts/store')

const createPlace = function (data) {
  return $.ajax({
    url: config.apiUrl + '/places',
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
    url: config.apiUrl + '/places/' + id,
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
    url: config.apiUrl + '/places',
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
    url: config.apiUrl + '/places/' + id,
    method: 'GET',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const deletePlace = function (id) {
  return $.ajax({
    url: config.apiUrl + '/places/' + id,
    method: 'DELETE',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  createPlace,
  update,
  showAll,
  showOne,
  deletePlace
}
