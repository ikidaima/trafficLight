import Vue from 'vue';
import Router from 'vue-router';

import TrafficLight from '../components/trafficLights/TrafficLight.vue';

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      component: TrafficLight
    },
    {
      path: '/:routeColor',
      component: TrafficLight,
      props: true
    }
  ]
});

export default router;

