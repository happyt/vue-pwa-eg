import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import store from './store'
import router from './router'

import * as firebase from 'firebase'
var fbconfig = require(`./fb-config.js`)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
  
  created () {
    firebase.initializeApp(fbconfig)
    this.$store.dispatch('loadMeetups')
  }
}).$mount('#app')
