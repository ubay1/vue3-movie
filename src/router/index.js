import { createRouter, createWebHistory } from "vue-router";
import Error from "@/layouts/Error.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/:pathMatch(.*)*",
			name: "NotFound",
			component: () => import("../views/NotFound.vue"),
			meta: {
				layout: Error,
			},
		},
		{
			path: "/",
			name: "home",
			component: () => import("../views/home/Home.vue"),
		},
		{
			path: "/detail",
			name: "detail",
			component: () => import("../views/detail/Detail.vue"),
			meta: {
				reload: true,
			},
		},
	],
});

export default router;
