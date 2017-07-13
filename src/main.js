import Vue from 'vue'
import App from './App'
import router from './router/routes'
import ElementUI from 'element-ui'
import VueCookie from 'vue-cookie'
import 'element-ui/lib/theme-default/index.css'
import 'element-ui/lib/index.js'
import './vendor/normalize.min.css'

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueCookie);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
