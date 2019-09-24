import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/test2',
      name: 'test2',
      component: () => import(/* webpackChunkName: "about" */ './views/test2.vue')
    },
    {
      path: '/recursion',
      name: 'recursion',
      component: () => import(/* webpackChunkName: "about" */ './views/test3.vue')
    },
    {
      path: '/cascade',
      name: 'cascade',
      component: () => import(/* webpackChunkName: "about" */ './views/test4.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/test',
      name: 'test',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/test.vue')
    },
    {
        path:"/tree",
        name:"tree",
        component: () => import(/* webpackChunkName: "about" */ './views/tree2/index'),
    },
    {
        path:"/treeRender",
        name:"treeRender",
        component: () => import( /* webpackChunkName: 'about' */ './views/tree2/index2')
    },
    {
        path:"/treeSelect",
        name:"treeSelect",
        component: () => import( /* webpackChunkName: 'about' */ './views/tree3/index')
    },
    {
        path:"/testKey",
        name:"testKey",
        component: () => import( /* webpackChunkName: 'about' */ './views/test-key/index')
    },
    {
        path:"/apiRequest",
        name:"apiRequest",
        component: () => import (/* webpackChunkName: 'about' */ './views/api-request/index')
    }
  ]
});