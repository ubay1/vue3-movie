<template>
	<LayoutDefault>
		<LoaderCircle v-if="isLoading" :is-loading="isLoading" />

		<div
			v-else
			class="flex flex-col justify-between h-1/2 gap-4 md:flex-row my-4 mx-4"
		>
			<div class="w-full h-full bg-gray-500 md:w-4/6">
				<div class="h-full">
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
				<div class="bg-gray-200 dark:bg-gray-800 text-center text-lg p-2">
					Video Lainnya
				</div>
				<button
					v-for="(item, index) in dataVideos[0]"
					:key="`list videos ${index}`"
					@click="changeMainVideo(item)"
				>
					<div class="flex justify-between gap-2 p-2 h-24">
						<div class="w-1/2 h-16">
							<div class="h-full">
								<img
									v-lazy="thumbnailImageVideo(...dataMovie)"
									class="placeholder bg-gray-100 img-lazy w-full h-full object-cover object-top"
								/>
							</div>
						</div>
						<div class="w-full h-full line-clamp-2">
							{{ item.name }}
						</div>
					</div>
				</button>
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

		const changeMainVideo = (data) => {
			console.log(data)
		};

		const getDetailMovie = () => {
			const params = {
				language: "en-US",
				movieId: route.query.id,
			};

			api()
				.movie.getDetailMovie(params)
				.then(({ data }) => {
					console.log("data movie = ", data);
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
					console.log("data videos movie = ", results);
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
		watchEffect(() => console.log(imageUrls));
		/* -------------------------------------------------------------------------- */
		/*                                 lifecycle                                  */
		/* -------------------------------------------------------------------------- */
		onMounted(() => {
			console.log("query route = ", route.query);
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
