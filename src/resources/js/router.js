import Router from 'vue-router'
import NotFound from './views/NotFound.vue'
import Home from './views/Home.vue'

export default new Router({
  mode: 'history',
  routes: [
    {
        path: '*',
        component: NotFound
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
  ]
});
