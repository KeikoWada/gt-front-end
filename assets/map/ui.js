'use strict'

const store = require('../scripts/store')
const showMapHtmlTemplate = require('../scripts/templates/map.handlebars')

const onShowMap = function (data) {
  store.data = data
  console.log(data)
  // const showMapHtml = showMapHtmlTemplate({map: data[0].formatted_address})
  // $('#handlebars').append(showMapHtml)
  // console.log(data[0].address_components[2].long_name)
  // console.log(data[0].formatted_address)
  // $('#address1').html(data[0].formatted_address)
  const showMapHtml = showMapHtmlTemplate({map: data})
  $('#left-content').append(showMapHtml)
}

module.exports = {
  onShowMap
}
