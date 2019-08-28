// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from 'vue'
import App from './App'
import router from './router/index'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/sidebar-themes.css'
import 'bootstrap/dist/css/main.css'
import jquery from 'jquery'
import popper from 'popper.js'
import {
  fb
} from './firebase'
window.$ = window.jquery = jquery

Vue.component('Nav', require('./components/front-view/Nav.vue').default)

Vue.config.productionTip = false

/* eslint-disable no-new */

let app = ''

fb.auth().onAuthStateChanged((user) => {
  if (!app) {
    new Vue({
      el: '#app',
      router,
      components: {
        App
      },
      template: '<App/>'
    })
  }
})
