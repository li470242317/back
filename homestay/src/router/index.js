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
          path: 'room_type',
          name: 'room_type',
          component: () => import('../components/room_type')
        },
        {
          path: 'water',
          name: 'water',
          component: () => import('../components/water')
        },
        {
          path: 'position',
          name: 'position',
          component: () => import('../components/position')
        }
      ]
    }
  ]
})
