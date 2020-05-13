import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import firebase from 'firebase'
import Notifications from 'vue-notification'
import 'ant-design-vue/dist/antd.css';
import './style/index.scss'
import Antd from 'ant-design-vue'
import './permission' // permission control

const firebaseConfig = {
  apiKey: "AIzaSyAjBiYXlMX5w-AoXmc2FTi7sfgHr8He7S8",
  authDomain: "vue-todo-1.firebaseapp.com",
  databaseURL: "https://vue-todo-1.firebaseio.com",
  projectId: "vue-todo-1",
  storageBucket: "vue-todo-1.appspot.com",
  messagingSenderId: "203196754559",
  appId: "1:203196754559:web:6dd477dc3577b801"
};

import formRules from './utils/formRules'
Vue.prototype.$rules = formRules

// firebase.initializeApp(firebaseConfig)
Vue.prototype.$message = (message, type = 'success', duration = 1) => { // 默认消息提示持续1S
  Antd.message[type](message, duration)
}
Vue.config.productionTip = false
Vue.use(Notifications)
Vue.use(Antd)
// Vue.use(VueRouter);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
