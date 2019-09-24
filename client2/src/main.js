import Vue from 'vue'
import './plugins/axios'
import  Http from  './plugins/http'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import Tree from './views/tree'
import Recursion from './views/recursion'
import Cascade from './views/cascade'
Vue.use(Tree)
Vue.use(Recursion)
Vue.use(Cascade)
Vue.use(Http)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
