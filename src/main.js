// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store"
import "./assets/css/reset.css"

// element-ui
import ElementUi from "element-ui"
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUi)


//事件处理
import commonComponents from "./components/index"
for(let i in commonComponents){
  Vue.component(i,commonComponents[i])
}

//过滤器处理
import filters from "./filters/index"
for(let i in filters){
  Vue.filter(i,filters[i])
}

Vue.prototype.$imgPre="http://localhost:3000"

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
