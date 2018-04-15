'use strict'

const store = require('../scripts/store')
const showMapHtmlTemplate = require('../scripts/templates/map.handlebars')

const onShowMap = function (data) {
  store.data = data
  const showMapHtml = showMapHtmlTemplate({ map: data.map })
  $('#handlebars').append(showMapHtml)
  console.log(data)
  console.log(data[0].address_components[2].long_name)
  console.log(data[0].formatted_address)
}

module.exports = {
  onShowMap
}
