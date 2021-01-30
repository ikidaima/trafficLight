import Vue from "vue";
import App from './components/App.vue';
import router from './router/router';

const app = new Vue({
  el: '#app',
  render: h => h(App),
  router
});
