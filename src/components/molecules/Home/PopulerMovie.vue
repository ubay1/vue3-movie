<template>
	<div class="mb-8">
		<div class="flex justify-between items-center md:px-3">
			<div class="font-extrabold text-xl">Popular Movie</div>
			<button
				class="bg-red-400 hover:bg-red-500 text-white rounded-md p-1 px-2 text-sm"
			>
				Open All
			</button>
		</div>
		<div class="mt-2 hidden md:block">
			<Carousel :breakpoints="breakpointsListPopularMovie">
				<Slide
					v-for="(item, index) in dataListPopulerMovie"
					:key="`list populer movie ${index}`"
				>
					<button class="w-full poster-movie" @click="detailMovie(item)">
						<div
							class="shimmer-image bg-gray-200 dark:bg-gray-400 flex items-center rounded-md"
						>
							<img
								v-lazy-img="posterMovie(item.poster_path)"
								alt=""
								class="m-auto object-cover pointer-events-none rounded-md"
							/>
							<div class="title-movie rounded-md">
								{{ item.original_title }}
							</div>
						</div>
					</button>
				</Slide>

				<template #addons>
					<Navigation />
				</template>
			</Carousel>
		</div>
		<div class="flex mt-4 overflow-x-auto md:hidden">
			<div
				v-for="(item, index) in dataListPopulerMovie"
				:key="`list populer movie - ${index}`"
				class="display-movie"
			>
				<button class="mr-2 mb-2 poster-movie" @click="detailMovie(item)">
					<div
						class="shimmer-image bg-gray-200 dark:bg-gray-400 flex items-center rounded-md"
					>
						<img
							v-lazy-img="posterMovie(item.poster_path)"
							alt=""
							class="m-auto object-cover pointer-events-none rounded-md"
						/>
						<div class="title-movie rounded-md">
							{{ item.original_title }}
						</div>
					</div>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { ref, toRefs, onMounted } from "vue";
import { Carousel, Navigation, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import Api from "@/apis";
import { useRouter } from "vue-router";

export default {
	components: {
		Carousel,
		Slide,
		Navigation,
	},
	async setup() {
		const dataListPopulerMovie = ref();

		const router = useRouter();

		const breakpointsListPopularMovie = {
			// 700px and up
			768: {
				itemsToShow: 3,
				snapAlign: "center",
			},
			850: {
				itemsToShow: 4,
				snapAlign: "center",
			},
			// 1024 and up
			1024: {
				itemsToShow: 5,
				snapAlign: "start",
			},
			1280: {
				itemsToShow: 6,
				snapAlign: "start",
			},
			1500: {
				itemsToShow: 7,
				snapAlign: "start",
			},
		};

		const detailMovie = (item) => {
			router.push({
				path: "/detail/movie",
				query: {
					id: item.id,
					image: item.backdrop_path,
				},
			});
		};

		const posterMovie = (poster_path) => {
			return `${import.meta.env.VITE_POSTER_IMAGE_URL}w342${poster_path}`;
		};

		const api = () => {
			return Api(
				import.meta.env.VITE_API_URL,
				import.meta.env.VITE_API_KEY_TMDB_V3
			);
		};

		const getListPopulerMovie = await api().movie.getListPopulerMovie({
			language: "en-US",
			page: 1,
		});

		dataListPopulerMovie.value = getListPopulerMovie.data.results;

		return {
			dataListPopulerMovie,
			breakpointsListPopularMovie,
			posterMovie,
			detailMovie,
		};
	},
};
</script>

<style>
.display-movie {
	display: grid;
	grid-template-columns: 200px;
}
.title-movie {
	background: url("https://s8.indexmovies.xyz/wp-content/themes/dunia21/images/mask-title.png")
		center top repeat-x;
	bottom: 0;
	left: 0;
	padding: 10px 5px;
	position: absolute;
	width: 100%;
	z-index: 20;
	color: #fff;
	text-align: center;
	/* font-size: 80%; */
	font-weight: 500;
	margin: 0;
	text-shadow: 0 0 2px #000;
}
.poster-movie:hover .overlay {
	opacity: 1;
}
.overlay {
	position: absolute;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);
	color: #f1f1f1;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	transition: 0.5s ease;
	opacity: 0;
	color: white;
	font-size: 20px;
	padding: 20px;
	text-align: center;
	z-index: 10;
	border-radius: 0.375rem;
}

@media (min-width: 0px) and (max-width: 767.9px) {
	.list-genre-carousel {
		display: none;
	}
}
</style>
