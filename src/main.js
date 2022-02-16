/* eslint-disable no-undef */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createI18n } from "vue-i18n";
import { createHead } from "@vueuse/head";
import Lazy from "@/utils/lazy.js";

import "./assets/global.css";
import "./assets/tailwind.css";

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
app.use(i18n);
app.use(router);
app.use(head);
app.use(Lazy);

app.mount("#app");