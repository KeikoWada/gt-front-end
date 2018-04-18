'use strict'

require('jquery-toast-plugin')

const store = require('../scripts/store')

const signUpSuccess = () => {
  $('#signup-success').modal('show')
  $('form').trigger('reset')
}

const signUpFailure = () => {
  $('#signup-failure').modal('show')
  $('form').trigger('reset')
}

const signInSuccess = (data) => {
  store.user = data.user
  $('#first-page, #clear-button').addClass('hidden')
  $('#second-page, .place-header').removeClass('hidden')
  $('form').trigger('reset')
}

const signInFailure = () => {
  $('#signin-failure').modal('show')
  $('form').trigger('reset')
}

const signOutSuccess = () => {
  $('#first-page, #clear-button').removeClass('hidden')
  $('#second-page, .place-header').addClass('hidden')
  $('#content').empty()
  $('#content').empty()
  $('#delete-feedback').empty()
  $('#sign-in-feedback').text('')
  $('#show-all').prop('disabled', false)
  store.user = null
}

const signOutFailure = () => {
  console.error()
}

const changePasswordSuccess = (data) => {
  $.toast({
    heading: 'Password changed successfully!',
    icon: 'success',
    showHideTransition: 'plain',
    allowToastClose: true,
    hideAfter: 3000,
    stack: 5,
    position: 'top-right',
    textAlign: 'left',
    loader: true,
    loaderBg: '#9EC600'
  })
  $('form').trigger('reset')
}

const changePasswordFailure = () => {
  $.toast({
    // text: 'Error',
    heading: 'Error Changing Password!',
    icon: 'error',
    showHideTransition: 'fade',
    allowToastClose: true,
    hideAfter: 3000,
    stack: 5,
    textAlign: 'left',
    loader: true,
    position: 'top-left'
  })
  $('form').trigger('reset')
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  changePasswordSuccess,
  changePasswordFailure
}
