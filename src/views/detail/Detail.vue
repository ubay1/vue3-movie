<template>
	<LayoutDefault>
		<div
			class="flex flex-col justify-between h-1/2 gap-4 md:flex-row my-4 mx-4"
		>
			<div class="w-full h-full bg-gray-800 md:w-4/6">
				<LoaderCircle v-if="isLoading" :is-loading="isLoading" />
				<div v-else class="h-full">
					<iframe
						class="w-full h-full"
						:src="openVideo(dataMainVideos)"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen
					></iframe>
				</div>
			</div>

			<div class="bg-white dark:bg-gray-600 shadow overflow-auto md:w-2/6">
				<div class="bg-gray-300 dark:bg-gray-800 text-center text-lg p-2">
					Video Lainnya
				</div>
				<div
					v-for="(item, index) in dataVideos[0]"
					:key="`list videos ${index}`"
					@click="changeMainVideo(item, index)"
					class="cursor-pointer"
					:class="{ 'bg-gray-100 dark:bg-gray-500': index === indexMainVideos }"
				>
					<div class="flex justify-between gap-2 p-2 h-24">
						<div class="md:w-1/2 lg:w-1/3 h-full">
							<div class="h-full">
								<img
									v-lazy="thumbnailImageVideo(...dataMovie)"
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
		const dataVideos = reactive([]);
		const dataMovie = reactive([]);
		const route = useRoute();
		const imageUrls = reactive([]);

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
					dataMainVideos.value = results[0];
					dataVideos.push(results);
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

		const thumbnailImageVideo = (data) => {
			if (![null, "", undefined].includes(data)) {
				return `${import.meta.env.VITE_POSTER_IMAGE_URL}w300${
					data.backdrop_path
				}`;
			}
		};

		const generateImageUrls = (start = 0, length = 10) => {
			const a = Array.from(
				new Array(length),
				(x, i) => `https://picsum.photos/400/400?image=${i + start}`
			);

			if (start !== 0) {
				imageUrls[0].push(...a);
			} else {
				imageUrls.push(a);
			}
		};

		const addNewImages = () => {
			generateImageUrls(imageUrls[0].length);
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
			loadAllApi();
			generateImageUrls();
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
			imageUrls,
			addNewImages,
		};
	},
};
</script>
