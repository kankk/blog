import Vue from 'vue';
import Router from 'vue-router';
import Home from '../pages/Home/index.vue';
import Person from '../pages/Person/index.vue';

Vue.use(Router);

function createRouter () {
  const routes = [
    {
      path: '/',
      component: Home
    },
    {
      path: '/person',
      component: Person
    }
  ];

  const router = new Router({
    mode: 'history',
    routes
  });

  return router;
}

export default createRouter;
