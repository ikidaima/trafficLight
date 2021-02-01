import Vue from "vue";
import App from './App.vue';
import router from './router/router';

import './index.html';

const app = new Vue({
  el: '#app',
  render: h => h(App),
  router
});
