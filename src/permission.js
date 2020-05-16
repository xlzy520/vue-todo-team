// import router from './router'
// import store from './store'
// import NProgress from 'nprogress' // progress bar
// import 'nprogress/nprogress.css' // progress bar style
//
// NProgress.configure({ showSpinner: false }) // NProgress Configuration
//
// const whiteList = ['/login', '/register'] // no redirect whitelist
//
// router.beforeEach((to, from, next) => {
//   NProgress.start()
//   console.log(store.getters.getUserData);
//   const hasRoles = store.getters.getUserData
//   if (!hasRoles) {
//     if (!whiteList.includes(to.path)) {
//       try {
//         // store.dispatch('getInfo')
//         next({ ...to, replace: true })
//       } catch (error) {
//         next(`/login?redirect=${to.path}`)
//         NProgress.done()
//       }
//     }
//   } else {
//     next()
//   }
//   next()
// })
//
// router.afterEach(() => {
//   // finish progress bar
//   NProgress.done()
// })
