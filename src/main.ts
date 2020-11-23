import "regenerator-runtime/runtime";
import Vue from "vue";
import App from "./App.vue";
import router from "./Router";
import store from "@/Store";
import * as serviceWorker from "../public/serviceWorker";
import VueMobileDetection from "vue-mobile-detection";




Vue.use(VueMobileDetection);
Vue.config.productionTip = true;

// Initialize new Vue app using App.vue as entry point
// and mount it on element with id: #app


new Vue({
	router,
	store,
	render(render) {
		return render(App);
	}
}).$mount("#root");


serviceWorker.unregister();
