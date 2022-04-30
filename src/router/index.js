import { createRouter, createWebHistory } from "vue-router";
import Error from "@/layouts/Error.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.VITE_BASE_URL),
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
			component: () => import("../views/Home.vue"),
			meta: {
				reload: true,
				layout: "layout-default",
			},
		},
		{
			path: "/search-movie",
			name: "searchmovie",
			component: () => import("../views/SearchMovie.vue"),
			meta: {
				reload: true,
				layout: "layout-default",
			},
		},
		{
			path: "/detail/movie/genre",
			name: "detail-movie-genre",
			component: () => import("../views/detail/MovieListFromGenre.vue"),
			meta: {
				reload: true,
				layout: "layout-default",
			},
		},
		{
			path: "/detail/movie/populer",
			name: "detail-movie-populer",
			component: () => import("../views/detail/MovieListPopuler.vue"),
			meta: {
				reload: true,
				layout: "layout-default",
			},
		},
		{
			path: "/detail/tv/populer",
			name: "detail-tv-populer",
			component: () => import("../views/detail/TvListPopuler.vue"),
			meta: {
				reload: true,
				layout: "layout-default",
			},
		},
		{
			path: "/detail/movie",
			name: "detail-movie",
			component: () => import("../views/detail/Movie.vue"),
			meta: {
				reload: true,
				layout: "layout-default",
			},
		},
		{
			path: "/detail/tv",
			name: "detail-tv",
			component: () => import("../views/detail/Tv.vue"),
			meta: {
				reload: true,
				layout: "layout-default",
			},
		},
	],
	// scrollBehavior(to, from, savedPosition) {
	// 	console.log(savedPosition);
	// 	if (savedPosition) {
	// 		return savedPosition;
	// 	} else {
	// 		return { x: 0, y: 0 };
	// 	}
	// },
});

export default router;
