import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/cartlist',
    name: 'Cartlist',
    component: () => import(/* webpackChunkName: "cartlist" */ '../views/Cartlist.vue')
  },
  {
    path: '/orderconfirm/:id',
    name: 'OrderConfirm',
    component: () => import(/* webpackChunkName: "ordercomfirm" */ '../views/OrderConfirm.vue')
  },
  {
    path: '/orderlist',
    name: 'Orderlist',
    component: () => import(/* webpackChunkName: "orderlist" */ '../views/Orderlist.vue')
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: () => import(/* webpackChunkName: "shop" */ '../views/shop/Shop.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    beforeEnter (to, from, next) {
      const isLogin = localStorage.isLogin
      if (!isLogin) {
        next()
      } else {
        next({ name: 'Home' })
      }
    }
  },
  {
    path: '/enroll',
    name: 'Enroll',
    component: () => import(/* webpackChunkName: "enroll" */ '../views/Enroll.vue')
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.isLogin
  if (isLogin || to.name === 'Login' || to.name === 'Enroll') {
    next()
  } else {
    next({ name: 'Login' })
  }
})

export default router
