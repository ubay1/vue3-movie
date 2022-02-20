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
			path: "/detail/movie",
			name: "detail/movie",
			component: () => import("../views/detail/Movie.vue"),
			meta: {
				reload: true,
			},
		},
		{
			path: "/detail/tv",
			name: "detail/tv",
			component: () => import("../views/detail/Tv.vue"),
			meta: {
				reload: true,
			},
		},
	],
});

export default router;
