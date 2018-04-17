'use strict'

const store = require('../scripts/store')
// const showMapHtmlTemplate = require('../scripts/templates/map.handlebars')

// **************************************************************
// will populate the handlebars when you click map

// const onShowMap = function (data) {
//   store.data = data
//   console.log(data)
//   // const showMapHtml = showMapHtmlTemplate({map: data[0].formatted_address})
//   // $('#handlebars').append(showMapHtml)
//   // console.log(data[0].address_components[2].long_name)
//   // console.log(data[0].formatted_address)
//   // $('#address1').html(data[0].formatted_address)
//   const showMapHtml = showMapHtmlTemplate({map: data})
//   $('#left-content').html(showMapHtml)
// }

const onMapAddress = (data) => {
  store.data = data
  console.log(data)
  console.log('data.map is', data[0].formatted_address)
  $('.create-name').val('')
  $('.create-category').val('')
  $('.create-address').val(data)
  $('.create-description').val('')
}

module.exports = {
  onMapAddress
}
