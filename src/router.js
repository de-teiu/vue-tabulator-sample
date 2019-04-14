import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import Sample1 from './views/Sample1.vue'
import Sample2 from './views/Sample2.vue'
import Sample3 from './views/Sample3.vue'
import Sample4 from './views/Sample4.vue'

import Othello from './views/Othello.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/sample1',
      name: 'sample1',
      component: Sample1
    }, {
      path: '/sample2',
      name: 'sample2',
      component: Sample2
    }, {
      path: '/sample3',
      name: 'sample3',
      component: Sample3
    }, {
      path: '/sample4',
      name: 'sample4',
      component: Sample4
    }, {
      path: '/othello',
      name: 'othello',
      component: Othello
    }
  ]
})