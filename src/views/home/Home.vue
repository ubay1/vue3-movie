<template>
	<LayoutDefault>
		<div class="px-2 sm:px-6 lg:px-8">
			<LoaderCircle v-if="isLoading" :is-loading="isLoading" class="mt-10" />

			<div v-else class="flex flex-col">
				<!-- genres -->
				<div class="mt-6 mb-8 hidden md:block">
					<Carousel :breakpoints="breakpointsListGenre">
						<Slide 
							v-for="(item, index) in listGenre[0]"
							:key="`list-genre ${index}`"
						>
							<div
								class="w-full h-full cursor-pointer bg-gray-600 hover:bg-gray-700 text-white dark:bg-white dark:hover:bg-gray-100 dark:text-gray-800 p-2 rounded-md whitespace-nowrap text-ellipsis overflow-hidden"
							>
								{{ item.name }}
							</div>
						</Slide>
	
						<template #addons>
							<Navigation />
						</template>
					</Carousel>
				</div>
				<div class="flex justify-center items-center mt-6 mb-8 md:hidden">
					<div class="flex overflow-x-auto">
						<div
							v-for="(item, index) in listGenre[0]"
							:key="`list-genre ${index}`"
						>
							<div
								class="flex justify-center items-center cursor-pointer bg-gray-600 hover:bg-gray-700 text-white dark:bg-white dark:hover:bg-gray-100 dark:text-gray-800 p-2 rounded-md mr-2 mb-2 whitespace-nowrap text-ellipsis overflow-hidden"
							>
								{{ item.name }}
							</div>
						</div>
					</div>
				</div>

				<!-- popular movie -->
				<div class="mb-8">
					<div class="flex justify-between items-center md:px-3">
						<div class="font-extrabold text-xl">Film Terpopuler</div>
						<button
							class="bg-red-400 hover:bg-red-500 text-white rounded-md p-1 px-2 text-sm"
						>
							Lihat Semua
						</button>
					</div>
					<div class="mt-2 hidden md:block">
						<Carousel :breakpoints="breakpointsListPopularMovie">
							<Slide 
								v-for="(item, index) in listPopularMovie[0]"
								:key="`list populer movie ${index}`"
							>
								<button class="w-full poster-movie" @click="detailMovie(item)">
									<div
										class="shimmer-image bg-gray-200 dark:bg-gray-400 flex items-center rounded-md"
									>
										<img
											v-lazy="posterMovie(item.poster_path)"
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
							v-for="(item, index) in listPopularMovie[0]"
							:key="`list populer movie - ${index}`"
							class="display-movie"
						>
							<button class="mr-2 mb-2 poster-movie" @click="detailMovie(item)">
								<div
									class="shimmer-image bg-gray-200 dark:bg-gray-400 flex items-center rounded-md"
								>
									<img
										v-lazy="posterMovie(item.poster_path)"
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

				<!-- tv series terpopuler -->
				<div class="mb-8">
					<div class="flex justify-between items-center md:px-3">
						<div class="font-extrabold text-xl">TV Series Terpopuler</div>
						<button
							class="bg-red-400 hover:bg-red-500 text-white rounded-md p-1 px-2 text-sm"
						>
							Lihat Semua
						</button>
					</div>
					<div class="mt-4 hidden md:block">
						<Carousel :breakpoints="breakpointsListPopularMovie">
							<Slide 
								v-for="(item, index) in listPopularTvSeries[0]"
								:key="`list populer movie ${index}`"
							>
								<button class="w-full poster-movie" @click="detailTv(item)">
									<div
										class="shimmer-image bg-gray-200 dark:bg-gray-400 flex items-center rounded-md"
									>
										<img
											v-lazy="posterMovie(item.poster_path)"
											alt=""
											class="m-auto object-cover pointer-events-none rounded-md"
										/>
										<div class="title-movie rounded-md">
											{{ item.original_name }}
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
							v-for="(item, index) in listPopularTvSeries[0]"
							:key="`list populer movie - ${index}`"
							class="display-movie"
						>
							<button class="mr-2 mb-2 poster-movie" @click="detailTv(item)">
								<div
									class="shimmer-image bg-gray-200 dark:bg-gray-400 flex items-center rounded-md"
								>
									<img
										v-lazy="posterMovie(item.poster_path)"
										alt=""
										class="m-auto object-cover pointer-events-none rounded-md"
									/>
									<div class="title-movie rounded-md">
										{{ item.original_name }}
									</div>
								</div>
							</button>
						</div>
					</div>
				</div>
			</div>
			<!-- <button @click="isOpen = !isOpen">click</button>
			<div v-if="errors">{{errors}}</div>
			<AsyncComp v-if="isOpen"/> -->
		</div>
	</LayoutDefault>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { onBeforeMount, defineAsyncComponent, onMounted, onUnmounted, reactive, ref, onErrorCaptured } from "vue";
import { Carousel, Navigation, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
import LayoutDefault from "@/layouts/Default.vue";
import LoaderCircle from "@/components/atoms/loader/LoaderCircle.vue";
import TestLoading from "@/components/atoms/TestLoading.vue";
import Api from "@/apis";
import { useRouter } from "vue-router";

// const TestDefineAsyncComponent = () => {
// 	return new Promise((resolve, reject) => {
// 		try {
// 			resolve (import("@/components/atoms/Test.vue"))
// 		} catch (error) {
// 			reject(error)
// 		}
// 	})
// }

// const AsyncComp = defineAsyncComponent(({
// 	loader: TestDefineAsyncComponent,
// 	loadingComponent: TestLoading,
// 	delay: 100, // delay loading
// 	timeout: 10 // timout jika component tampil melebihi 3000ms
// })
// )

export default {
	components: {
		LayoutDefault,
		LoaderCircle,
		Carousel,
    Slide,
    Navigation,
	},
	setup() {
		const isOpen = ref(false);
		const errors = ref(null);

		const isLoading = ref(false);
		const router = useRouter();

		const listGenre = reactive([]);
		const listPopularMovie = reactive([]);
		const listPopularTvSeries = reactive([]);

		const settings = reactive({
      itemsToShow: 1,
      snapAlign: 'center',
    })

		const breakpointsListGenre = ({
      // 700px and up
      768: {
        itemsToShow: 5,
        snapAlign: 'center',
      },
      // 1024 and up
      1024: {
        itemsToShow: 8,
        snapAlign: 'start',
      },
			1280: {
        itemsToShow: 10,
        snapAlign: 'start',
      },
    })

		const breakpointsListPopularMovie = ({
      // 700px and up
      768: {
        itemsToShow: 3,
        snapAlign: 'center',
      },
			850: {
        itemsToShow: 4,
        snapAlign: 'center',
      },
      // 1024 and up
      1024: {
        itemsToShow: 5,
        snapAlign: 'start',
      },
			1280: {
        itemsToShow: 6,
        snapAlign: 'start',
      },
			1500: {
        itemsToShow: 7,
        snapAlign: 'start',
      },
    })

		const loadListGenre = () => {
			const params = {
				language: "en-US",
			};

			return api().movie.getListGenre(params);
		};

		const loadListPopulerMovie = () => {
			const params = {
				language: "en-US",
				page: 1,
			};

			return api().movie.getListPopulerMovie(params);
		};

		const loadListPopulerTvSeries = () => {
			const params = {
				language: "en-US",
				page: 1,
			};

			return api().movie.getPopulerTvSeries(params);
		};

		const loadAllData = () => {
			isLoading.value = true;

			Promise.all([
				loadListGenre(),
				loadListPopulerMovie(),
				loadListPopulerTvSeries(),
			])
				.then(([listGenres, listPopulerMovie, listPopulerTvSeries]) => {
					const {
						data: { genres },
					} = listGenres;
					listGenre.push(genres);

					const {
						data: { results: resultPopularMovie },
					} = listPopulerMovie;
					listPopularMovie.push(resultPopularMovie);

					const {
						data: { results: resultTvResies },
					} = listPopulerTvSeries;
					listPopularTvSeries.push(resultTvResies);
				})
				.catch((error) => console.log(error))
				.finally(() => (isLoading.value = false));
		};

		// eslint-disable-next-line no-unused-vars
		const getValue = (key, objectName) => {
			const { [key]: returnValue } = objectName;
			return returnValue;
		};

		const detailMovie = (item) => {
			router.replace({
				path: "/detail/movie",
				query: {
					id: item.id,
					image: item.backdrop_path,
				},
			});
		};

		const detailTv = (item) => {
			router.replace({
				path: "/detail/tv",
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

		onMounted(() => {
			loadAllData();
		});

		onUnmounted(() => console.log("destroy page home"));

		onErrorCaptured((e) => {
			errors.value = e;
		})

		return {
			isOpen,
			errors,
			breakpointsListGenre,
			breakpointsListPopularMovie,
			isLoading,
			listGenre,
			listPopularMovie,
			listPopularTvSeries,
			posterMovie,
			detailMovie,
			detailTv,
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
/* .carousel__item {
  min-height: 200px;
  width: 100%;
  background-color: var(--vc-clr-primary);
  color:  var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
} */

.carousel__slide {
  padding: 10px;
}

.carousel__prev--in-active {
	opacity: 0;
	left: 50px !important;
	cursor: default;
	z-index: -10;
}
.carousel__next--in-active {
	opacity: 0;
	right: 50px !important;
	cursor: default;
	z-index: -10;
}

.carousel__prev {
	left: 20px;
	border: unset !important;
	background: #fff;
	padding: 5px;
	transition: all 0.5s cubic-bezier(0.2, 0.64, 0.21, 1) 0s;
	box-sizing: content-box;
	box-shadow: 0px 2px 4px gray;
}
.carousel__next {
	right: 20px;
	border: unset;
	background: #fff;
	padding: 5px;
	transition: all 0.5s cubic-bezier(0.2, 0.64, 0.21, 1) 0s;
	box-sizing: content-box;
	box-shadow: 0px 2px 4px gray;
}
.carousel__icon {
	fill: #000 !important;
}
</style>
