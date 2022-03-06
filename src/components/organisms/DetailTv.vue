<template>
	<LayoutDefault>
		<div class="flex flex-col justify-between gap-4 mx-4 mt-4 md:h-1/2">
			<ListVideos 
				:dataMainVideos="compDataMainVideos"
				:isLoading="compIsLoading"
				:isLoadingListVideo="compIsLoadingListVideo"
				:indexMainVideos="indexMainVideos"
				:backdropImageMovie="compBackdropImage"
				:dataListVideos="dataVideos"
				@changeMainVideo="changeMainVideo"
			/>
			<DescriptMovie 
				:isLoadingListVideo="compIsLoadingListVideo"
				:dataMovie="compDataMovie"
				:posterImageMovie="compPosterImageMovie"
			/>
		</div>
	</LayoutDefault>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { ref, reactive, toRefs, onMounted, watch, computed } from "vue";
import LayoutDefault from "@/layouts/Default.vue";
import ListVideos from "../molecules/DetailMovie/ListVideos.vue";
import { useRoute } from "vue-router";
import Api from "@/apis";
import DescriptMovie from "../molecules/DetailMovie/DescriptMovie.vue";


export default {
	components: {
    LayoutDefault,
    ListVideos,
    DescriptMovie
},
	setup() {
		const isLoading = ref(false);
		const isLoadingListVideo = ref(false);
		const dataMainVideos = ref({});
		const indexMainVideos = ref(0);
		const backdropImageMovie = ref();
		const posterImageMovie = reactive({
			file_path: "",
		});
		const dataVideos = reactive([]);
		const dataMovie = ref({});
		const route = useRoute();

		/* -------------------------------------------------------------------------- */
		/*                                   method                                   */
		/* -------------------------------------------------------------------------- */

		const changeMainVideo = ({data, idx}) => {
			isLoading.value = true;
			dataMainVideos.value = {};
			dataMainVideos.value = data;
			indexMainVideos.value = idx;
			setTimeout(() => {
				isLoading.value = false;
			}, 1000);
		};

		/* ------------------------------ API handling ------------------------------ */

		const getDetailTv = () => {
			const params = {
				language: "en-US",
				tvId: route.query.id,
			};

			return api().tv.getDetailTv(params);
		};

		const getImagesFromTv = () => {
			const params = {
				tvId: route.query.id,
				language: "en-US",
				include_image_language: "en",
			};

			return api().tv.getImagesFromTv(params);
		};

		const getVideosFromTv = () => {
			const params = {
				language: "en-US",
				tvId: route.query.id,
			};

			return api().tv.getVideosFromTv(params);
		};

		const loadAllApi = () => {
			isLoading.value = true;
			isLoadingListVideo.value = true;

			Promise.all([
				getImagesFromTv(),
				getDetailTv(),
				getVideosFromTv(),
			])
				.then(([imagesMovie, detailMovie, videosMovie]) => {

					const {
						data: { posters },
					} = imagesMovie;
					posters.length > 1
						? (posterImageMovie.file_path = posters[1].file_path)
						: posters.length > 0
						? (posterImageMovie.file_path = posters[0].file_path)
						: null;

					const { data: resultDetailMovie } = detailMovie;
					const updateDataMovie = { ...dataMovie.value, ...resultDetailMovie };
					dataMovie.value = updateDataMovie;
					// console.log(resultDetailMovie);

					const {
						data: { results: resultVideos },
					} = videosMovie;

					if (resultVideos.length !== 0) {
						dataMainVideos.value = resultVideos[0];
						dataVideos.push(resultVideos);
					}
				})
				.catch((error) => console.log(error))
				.finally(() => {
					isLoading.value = false;
					isLoadingListVideo.value = false;
				});
		};

		/* ---------------------------- End API handling ---------------------------- */

		const thumbnailImagePoster = (image) => {
			if (![null, "", undefined].includes(image)) {
				return `${import.meta.env.VITE_BACKDROP_IMAGE_URL}w780${image}`;
			} else {
				return `https://agent1.pk/images/uploads/img.jpg`;
			}
		};

		const checkCommaOrPoint = (dataLength, index) => {
			return dataLength > 1 && index !== dataLength - 1 ? "," : ".";
		};

		const api = () => {
			return Api(
				import.meta.env.VITE_API_URL,
				import.meta.env.VITE_API_KEY_TMDB_V3
			);
		};
		/* -------------------------------------------------------------------------- */
		/*                                 computed                                   */
		/* -------------------------------------------------------------------------- */
		const compPosterImageMovie = computed(() => {
			return posterImageMovie.file_path;
		});

		const compDataMainVideos = computed(() => {
			return dataMainVideos.value;
		});

		const compDataMovie = computed(() => {
			return dataMovie.value;
		});

		const compDataVideos = computed(() => {
			return dataVideos.value;
		});

		const compBackdropImage = computed(() => {
			return backdropImageMovie.value;
		});

		const compIsLoading = computed(() => {
			return isLoading.value;
		});

		const compIsLoadingListVideo = computed(() => {
			return isLoadingListVideo.value
		});
		/* -------------------------------------------------------------------------- */
		/*                                 watchEffecter                                    */
		/* -------------------------------------------------------------------------- */
		// eslint-disable-next-line no-undef
		// watch(compIsLoading, (val) => console.log('loading = ', val));
		/* -------------------------------------------------------------------------- */
		/*                                 lifecycle                                  */
		/* -------------------------------------------------------------------------- */
		backdropImageMovie.value = route.query.image;
		loadAllApi();
		// onMounted(() => {
		// });

		return {
			compIsLoading,
			compIsLoadingListVideo,
			compDataMainVideos,
			indexMainVideos,
			dataVideos,
			compDataVideos,
			dataMovie,
			compDataMovie,
			changeMainVideo,
			thumbnailImagePoster,
			compBackdropImage,
			posterImageMovie,
			compPosterImageMovie,
			checkCommaOrPoint,
			// openVideo,
			// thumbnailImageVideo,
			// formatCurrency,
		};
	}
};
</script>
