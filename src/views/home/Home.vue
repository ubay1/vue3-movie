<template>
	<LayoutDefault>
		<div class="px-2 sm:px-6 lg:px-8">
			<!-- loader -->
			<LoaderCircle v-if="isLoading" :is-loading="isLoading" class="mt-10" />

			<div v-else>
				<!-- genres -->
				<div class="flex justify-center items-center my-4">
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
				<div class="mt-8">
					<div class="flex justify-between items-center">
						<div class="font-extrabold text-xl">Film Terpopuler</div>
						<button
							class="bg-red-400 hover:bg-red-500 text-white rounded-md p-1 px-2 text-sm"
						>
							Lihat Semua
						</button>
					</div>
					<div class="flex mt-4 overflow-x-auto">
						<div
							v-for="(item, index) in listPopularMovie[0]"
							:key="`list populer movie - ${index}`"
							class="display-movie"
						>
							<button class="mr-2 mb-2 poster-movie" @click="detailMovie(item)">
								<img
									:src="posterMovie(item.poster_path)"
									alt=""
									class="w-full h-full object-cover pointer-events-none rounded-md"
								/>
								<div class="title-movie rounded-md">
									{{ item.original_title }}
								</div>
								<!-- <div class="overlay">
									<button
										class="bg-green-400 hover:bg-green-500 text-sm p-2 w-4/5 capitalize rounded-md mb-2"
									>
										detail movie
									</button>
									<button
										class="bg-red-400 hover:bg-red-500 text-sm p-2 w-4/5 capitalize rounded-md"
									>
										tonton trailer
									</button>
								</div> -->
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</LayoutDefault>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { onBeforeMount, onMounted, onUnmounted, reactive, ref } from "vue";
import LayoutDefault from "@/layouts/Default.vue";
import LoaderCircle from "@/components/atoms/loader/LoaderCircle.vue";
import Api from "@/apis";
// import router from "../../router";

export default {
	components: {
		LayoutDefault,
		LoaderCircle,
	},
	setup() {
		const isLoading = ref(false);

		const listGenre = reactive([]);
		const listPopularMovie = reactive([]);

		const loadListGenre = () => {
			const params = {
				language: "en-US",
			};

			api()
				.movie.getListGenre(params)
				.then(({ data: { genres } }) => {
					// console.log(genres));
					listGenre.push(genres);
				})
				.catch((error) => {
					console.error(error);
				});
		};

		const loadListPopulerMovie = () => {
			const params = {
				language: "en-US",
				page: 1,
			};

			api()
				.movie.getListPopulerMovie(params)
				.then(({ data: { results } }) => {
					listPopularMovie.push(results);
				})
				.catch((error) => {
					console.error(error);
				});
		};

		const loadAllData = () => {
			isLoading.value = true;
			Promise.all([loadListGenre(), loadListPopulerMovie()])
				// eslint-disable-next-line no-unused-vars
				.then((result) => {
					// console.log(result);
				})
				.catch((error) => console.log(error))
				.finally(() => (isLoading.value = false));
		};

		const detailMovie = (item) => {
			console.log(item.poster_path);
			location.replace(`/detail?id=${item.id}`);
			// router.replace({
			// 	path: "/detail",
			// 	query: {
			// 		id: item.id,
			// 	},
			// });
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

		return {
			isLoading,
			listGenre,
			listPopularMovie,
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
.poster-movie:hover .overlay {
	opacity: 1;
}
.title-movie {
	background: url("https://s8.indexmovies.xyz/wp-content/themes/dunia21/images/mask-title.png")
		center top repeat-x;
	bottom: 0;
	left: 0;
	padding: 10px 5px;
	position: absolute;
	width: 100%;
	z-index: 5;
	color: #fff;
	text-align: center;
	/* font-size: 80%; */
	font-weight: 500;
	margin: 0;
	text-shadow: 0 0 2px #000;
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
</style>
