// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

if(window.location.href.split("#")[0].split("?").length>1 && window.location.href.split("#").length>1){
   window.location.href=window.location.href.split("#")[0].split("?")[0]+"#"+window.location.href.split("#")[1];
}

import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
import  store from "./store/index"

Vue.config.productionTip = false

// Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store:store,
  // template: '<App/>',
  ...App
})
