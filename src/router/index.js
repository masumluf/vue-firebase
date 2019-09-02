import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import About from '../components/front-view/About.vue'
import Items from '../components/front-view/Items.vue'
import Admin from '../components/admin/Admin.vue'
import Overview from '../components/admin/Overview.vue'
import Products from '../components/admin/Product.vue'
import {
  fb
} from '../firebase'
Vue.use(Router)

export const router = new Router({
  mode: 'history',
  routes: [{
      path: '/',
      component: Home
    },
    {
      path: '/about',
      component: () => import('../components/front-view/About'),

    },
    {
      path: '/items',
      component: Items
    },
    {
      path: '/admin',
      component: Admin,

      meta: {
        requiresAuth: true
      },
      children: [{
          path: 'over',
          component: Overview
        },
        {
          path: 'products',
          component: Products
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {

  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = fb.auth().currentUser

  if (requiresAuth && !currentUser) {
    next('/')
  } else if (requiresAuth && currentUser) {
    next()
  } else {
    next()
  }
})
export default router
