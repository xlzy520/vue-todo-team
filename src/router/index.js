import Vue from 'vue'
import VueRouter from 'vue-router'
import login from "../components/Login";
import home from "@/views/home";
import PageNotFound from "@/views/Page404";
import register from "@/views/register";
import accountCenter from "@/views/accountCenter";
import resetPassword from "@/views/resetPassword";
import todayTomorrow from "@/views/today-tomorrow";
import statistics from "@/views/statistics";
import sevenDay from "@/views/7day";
import filter from "@/views/filter";
import group from "@/views/group/group";
import groupDetail from "@/views/group/groupDetail";

Vue.use(VueRouter)


const routes = [
  { path:  '/', redirect: '/todo', component: home },
  { path: '/todo', component: home , redirect: 'todo/today-tomorrow',
    children: [
      {
        path: 'today-tomorrow',
        name: '今天明天',
        component: todayTomorrow,
      },
      {
        path: '7day',
        name: '最近七天',
        component: sevenDay,
      },
      {
        path: 'filter',
        name: '筛选',
        component: filter,
      },
      {
        path: 'group/:id',
        name: '团队详情',
        component: groupDetail,
      },
      {
        path: 'teamList',
        name: '团队任务列表',
        component: group,
      },
      {
        path: 'team/:id',
        name: '团队',
        component: groupDetail
      },
      { path: 'account/center', component: accountCenter },
    ]
  },
  { path:  '/login', component: login },
  { path: '/register', component: register },
  { path: '/resetPassword', component: resetPassword },
  { path: '/statistics', component: statistics },
  { path: "*", component: PageNotFound},

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
