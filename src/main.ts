import Vue from "vue";
import VueSlider from "vue-slider-component";
import Vuelidate from "vuelidate";
import Toasted from 'vue-toasted';
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";

Vue.config.productionTip = false;
Vue.component("VueSlider", VueSlider);
Vue.use(Toasted)
Vue.use(Vuelidate);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
