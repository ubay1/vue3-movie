/* eslint-disable no-undef */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createI18n } from "vue-i18n";
import { createHead } from "@vueuse/head";
import LazyImg from "@/utils/lazyImg.js";
import LayoutDefault from "@/layouts/Default.vue";

import "virtual:windi.css";
import "./assets/global.css";

import en from "./locales/en";
import id from "./locales/id";

const i18n = createI18n({
	locale: ["en", "id"],
	fallbackLocale: "en",
	messages: {
		en: {
			...en,
		},
		id: {
			...id,
		},
	},
});

const head = createHead();
const app = createApp(App);
app.component("layout-default", LayoutDefault);
app.use(i18n);
app.use(router);
app.use(head);
app.use(LazyImg);

app.mount("#app");
