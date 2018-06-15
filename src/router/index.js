import Vue from 'vue';
import Router from 'vue-router';
import About from '@/components/about';
import mainPage from '@/components/main';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: mainPage,
    },
    {
      path: '/about',
      name: 'About',
      component: About,
    },
  ],
});

