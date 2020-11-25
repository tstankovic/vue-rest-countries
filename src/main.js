import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/css/tailwind.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMoon as farMoon } from "@fortawesome/free-regular-svg-icons";
import {
  faMoon as fasMoon,
  faSearch,
  faCaretDown,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(farMoon, fasMoon, faSearch, faCaretDown, faArrowLeft);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
