/* eslint-disable */
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import Electron from 'vue-electron'
import Resource from 'vue-resource'
import Router from 'vue-router'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import App from './App'
import routes from './routes'
import store from './vuex/store'
import wysiwyg from "vue-wysiwyg"
import Vue2Filters from 'vue2-filters'
import VueShortKey from 'vue-shortkey'
Vue.use(VueShortKey)
Vue.use(Vuetify)
Vue.use(Electron)
Vue.use(Resource)
Vue.use(Router)
Vue.use(Vue2Filters)
Vue.use(wysiwyg, {})
Vue.config.debug = true

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes
})


/* eslint-disable no-new */
new Vue({
  router,
  store,
  ...App
}).$mount('#app')
