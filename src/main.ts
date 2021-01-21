import Vue from "vue";
import VueSlider from "vue-slider-component";
import { ReactiveFormConfig, ClientLibrary } from '@rxweb/reactive-forms';
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";

ReactiveFormConfig.clientLib = ClientLibrary.Vue;

ReactiveFormConfig.set({
    validationMessage: {
        required: "This Field is required",
    }
});

Vue.config.productionTip = false;
Vue.component("VueSlider", VueSlider);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
