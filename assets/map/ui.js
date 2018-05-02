'use strict'
/* global $ */

const store = require('../scripts/store')

const onMapAddress = (data) => {
  store.data = data
  // console.log('data.map is', data[0].formatted_address)
  $('.create-name').val('')
  $('.create-category').val('')
  $('.create-address').val(data)
  $('.update-address').val(data)
  $('.create-description').val('')
}

module.exports = {
  onMapAddress
}
