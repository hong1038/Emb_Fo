import Vue from "vue";
import App from "./App.vue";

import router from "./router/index";
import store from "./store/index";
import axios from "axios";
import vuetify from "./plugins/vuetify";

import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

Vue.prototype.$Axios = axios;
Vue.use(vuetify);
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
