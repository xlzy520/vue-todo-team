import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import login from "../components/Login";
import todo from "../components/Todo";
import PageNotFound from "../components/Page404";
import register from "../components/register";
import resetPassword from "../components/resetPassword";

Vue.use(VueRouter)


const routes = [
  { path:  '/', component: login },
  { path: '/todo', component: todo },
  { path:  '/login', component: login },
  { path: "*", component: PageNotFound},
  { path: '/register', component: register },
  { path: '/resetPassword', component: resetPassword },
];

// const router = new VueRouter({
//   routes,
//   mode:'history'
// })

// const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Home
//   },
//   {
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//   }
// ]

const router = new VueRouter({
  routes,
  mode: 'hash'
})

export default router
