<template>
	<LayoutDefault>
		<div class="flex flex-col justify-between gap-4 m-4 md:h-1/2">
			<div class="flex flex-col justify-between gap-4 md:flex-row">
				<!-- video utama -->
				<div
					class="w-full h-80 bg-gray-300 dark:bg-gray-800 md:w-4/6 md:h-80 lg:h-80"
				>
					<LoaderCircle v-if="isLoading" :is-loading="isLoading" />
					<div v-else class="h-full">
						<div
							v-if="Object.keys(dataMainVideos).length === 0"
							class="w-full h-full flex justify-center items-center"
						></div>
						<iframe
							v-else
							class="w-full h-full"
							:src="openVideo(dataMainVideos)"
							frameborder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowfullscreen
						></iframe>
					</div>
				</div>

				<!-- video lainnya -->
				<div
					class="bg-white dark:bg-gray-600 shadow overflow-auto h-72 md:h-80 md:w-2/6 lg:h-80"
				>
					<div class="bg-gray-300 dark:bg-gray-800 text-center text-lg p-2">
						Video Lainnya
					</div>
					<div
						v-if="dataVideos.length === 0"
						class="mt-5 flex justify-center items-center"
					>
						list video tidak ditemukan
					</div>
					<div v-else class="p-2">
						<div
							v-for="(item, index) in dataVideos[0]"
							:key="`list videos ${index}`"
							@click="changeMainVideo(item, index)"
							class="cursor-pointer"
							:class="{
								'bg-gray-100 dark:bg-gray-700': index === indexMainVideos,
							}"
						>
							<div class="flex justify-between gap-2 p-2 h-24">
								<div class="w-1/2 sm:w-1/4 md:w-1/2 lg:w-1/3 h-full">
									<div class="h-full">
										<img
											v-lazy="thumbnailImageVideo()"
											class="placeholder bg-gray-100 img-lazy w-full h-full object-cover object-top"
										/>
									</div>
								</div>
								<div class="w-full md:w-1/2 lg:w-2/3 h-full line-clamp-2">
									{{ item.name }}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="my-3">
				<hr />
				<div class="mt-3 mb-10">
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse iste
					alias repellendus temporibus sint repellat dolor consectetur corporis
					minus! Eum quo qui rem nostrum dolore hic. Ullam, quo! Ex, saepe?
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
					esse nam adipisci. Neque pariatur ipsam praesentium corrupti quos
					consequatur, doloremque eligendi minus ducimus. Consectetur expedita
					quos ut nemo. At, rem?
				</div>
			</div>
		</div>
	</LayoutDefault>
	<!-- {{ dataMovie }} -->
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { ref, reactive, toRefs, onMounted, watchEffect } from "vue";
import { useRoute } from "vue-router";
import LayoutDefault from "@/layouts/Default.vue";
import LoaderCircle from "@/components/atoms/loader/LoaderCircle.vue";
import Api from "@/apis";

export default {
	components: {
		LayoutDefault,
		LoaderCircle,
	},
	props: {
		title: {
			type: String,
			default: () => {
				return "hallo ha";
			},
		},
	},
	setup(props) {
		const isLoading = ref(false);
		const dataMainVideos = ref({});
		const indexMainVideos = ref(0);
		const imageMovie = ref(null);
		const dataVideos = reactive([]);
		const dataMovie = reactive([]);
		const route = useRoute();

		/* -------------------------------------------------------------------------- */
		/*                                   method                                   */
		/* -------------------------------------------------------------------------- */
		const openVideo = (data) => {
			if (data.site === "YouTube") {
				return import.meta.env.VITE_VIDEO_YOUTUBE + data.key;
			} else {
				return import.meta.env.VITE_VIDEO_VIMEO + data.key;
			}
		};

		const changeMainVideo = (data, index) => {
			isLoading.value = true;
			dataMainVideos.value = {};
			dataMainVideos.value = data;
			indexMainVideos.value = index;
			setTimeout(() => {
				isLoading.value = false;
			}, 2000);
		};

		const getDetailMovie = () => {
			const params = {
				language: "en-US",
				movieId: route.query.id,
			};

			api()
				.movie.getDetailMovie(params)
				.then(({ data }) => {
					// console.log("data movie = ", data);
					dataMovie.push(data);
				})
				.catch((error) => {
					console.error(error);
				});
		};

		const getVideos = () => {
			const params = {
				language: "en-US",
				movieId: route.query.id,
			};

			api()
				.movie.getVideosFromMovie(params)
				.then(({ data: { results } }) => {
					// console.log("data videos movie = ", results);
					if (results.length !== 0) {
						dataMainVideos.value = results[0];
						dataVideos.push(results);
					}
				})
				.catch((error) => {
					console.error(error);
				});
		};

		const loadAllApi = () => {
			isLoading.value = true;
			Promise.all([getDetailMovie(), getVideos()])
				// eslint-disable-next-line no-unused-vars
				.then((result) => {
					// console.log(result);
				})
				.catch((error) => console.log(error))
				.finally(() => (isLoading.value = false));
		};

		const thumbnailImageVideo = () => {
			if (![null, "", undefined].includes(imageMovie.value)) {
				return `${import.meta.env.VITE_POSTER_IMAGE_URL}w300${
					imageMovie.value
				}`;
			}
		};
		/* -------------------------------------------------------------------------- */
		/*                                 computed                                   */
		/* -------------------------------------------------------------------------- */
		//const compCount = computed(() => {
		//	return count.value + 2;
		//});
		/* -------------------------------------------------------------------------- */
		/*                                 watchEffecter                                    */
		/* -------------------------------------------------------------------------- */
		// eslint-disable-next-line no-undef
		// watchEffect(() => console.log(dataMainVideos.value));
		/* -------------------------------------------------------------------------- */
		/*                                 lifecycle                                  */
		/* -------------------------------------------------------------------------- */
		onMounted(() => {
			// console.log("query route = ", route.query);
			imageMovie.value = route.query.image;
			loadAllApi();
		});

		const api = () => {
			return Api(
				import.meta.env.VITE_API_URL,
				import.meta.env.VITE_API_KEY_TMDB_V3
			);
		};

		return {
			isLoading,
			dataMainVideos,
			indexMainVideos,
			dataVideos,
			dataMovie,
			...toRefs(props),
			openVideo,
			changeMainVideo,
			thumbnailImageVideo,
			imageMovie,
		};
	},
};
</script>
