import App from './App'
// main.js
import uView from 'uview-ui';
Vue.use(uView);

Vue.prototype.darkTheme = uni.getStorageSync("theme");  
Vue.prototype.language = uni.getStorageSync("language");

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif