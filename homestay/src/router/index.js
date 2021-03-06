import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('../components/Home'),
      children: [
        {
          path: 'account',
          name: 'account',
          component: () => import('../components/account')
        },
        {
          path: 'client',
          name: 'client',
          component: () => import('../components/client')
        },
        {
          path: 'employee',
          name: 'employee',
          component: () => import('../components/employee')
        },
        {
          path: 'house',
          name: 'house',
          component: () => import('../components/house')
        },
        {
          path: 'manager',
          name: 'manager',
          component: () => import('../components/manager')
        },
        {
          path: 'water',
          name: 'water',
          component: () => import('../components/water')
        },
        {
          path: 'room_type',
          name: 'room_type',
          component: () => import('../components/room_type')
        },
        {
          path: 'position',
          name: 'position',
          component: () => import('../components/position')
        },
        {
          path: 'orders',
          name: 'orders',
          component: () => import('../components/orders')
        },
        {
          path: 'order_appraise',
          name: 'order_appraise',
          component: () => import('../components/order_appraise')
        },
        {
          path: 'price',
          name: 'price',
          component: () => import('../components/price')
        },
        {
          path: 'bank',
          name: 'bank',
          component: () => import('../components/bank')
        },
        {
          path: 'member',
          name: 'member',
          component: () => import('../components/member')
        }
      ]
    }, {
      path: '/',
      name: 'login',
      component: () => import('../components/Login')
    }
  ]
})
