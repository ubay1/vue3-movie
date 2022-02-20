<template>
	<LayoutDefault>
		<div class="flex flex-col justify-between gap-4 mx-4 mt-4 md:h-1/2">
			<div class="flex flex-col justify-between gap-4 md:flex-row">
				<!-- video utama -->
				<div
					class="w-full h-80 bg-gray-300 dark:bg-gray-800 md:w-4/6 md:h-80 lg:h-96"
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
					class="bg-white dark:bg-gray-600 shadow overflow-auto h-72 md:h-80 md:w-2/6 lg:h-96"
				>
					<div class="bg-gray-300 dark:bg-gray-800 text-center text-lg p-2">
						Video Lainnya
					</div>
					<LoaderCircle
						v-if="isLoadingListVideo"
						:is-loading="isLoadingListVideo"
					/>
					<div v-else>
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
			</div>

			<div class="my-3">
				<hr />

				<div class="mt-3">
					<LoaderCircle
						v-if="isLoadingListVideo"
						:is-loading="isLoadingListVideo"
					/>
					<div v-else>
						<div class="text-lg font-bold mb-3">{{ dataMovie.title }}</div>
						<div class="flex gap-4">
							<div class="w-1/3">
								<img
									:src="thumbnailImagePoster(compPosterImageMovie)"
									alt="backdrop-image-movie"
									class="h-full w-full"
								/>
							</div>
							<div class="w-2/3">
								{{ dataMovie.overview }}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</LayoutDefault>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { ref, reactive, toRefs, onMounted, watch, computed } from "vue";
import { useRoute } from "vue-router";
import LayoutDefault from "@/layouts/Default.vue";
import LoaderCircle from "@/components/atoms/loader/LoaderCircle.vue";
import Api from "@/apis";
// import axios from "axios";

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
		const isLoadingListVideo = ref(false);
		const dataMainVideos = ref({});
		const indexMainVideos = ref(0);
		const backdropImageMovie = ref(null);
		const posterImageMovie = reactive({
			file_path: "",
		});
		const dataVideos = reactive([]);
		const dataMovie = ref({});
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

			return api().movie.getDetailMovie(params);
		};

		const getImagesFromMovie = () => {
			const params = {
				movieId: route.query.id,
				language: "en-US",
				include_image_language: "en",
			};

			return api().movie.getImagesFromMovie(params);
		};

		const getVideosFromMovie = () => {
			const params = {
				language: "en-US",
				movieId: route.query.id,
			};

			return api().movie.getVideosFromMovie(params);
		};

		const loadAllApi = () => {
			isLoading.value = true;
			isLoadingListVideo.value = true;

			Promise.all([
				getImagesFromMovie(),
				getDetailMovie(),
				getVideosFromMovie(),
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
					console.log(resultDetailMovie);

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

		const thumbnailImageVideo = () => {
			if (![null, "", undefined].includes(backdropImageMovie.value)) {
				return `${import.meta.env.VITE_POSTER_IMAGE_URL}w300${
					backdropImageMovie.value
				}`;
			}
		};

		const thumbnailImagePoster = (image) => {
			if (![null, "", undefined].includes(image)) {
				return `${import.meta.env.VITE_BACKDROP_IMAGE_URL}w780${image}`;
			} else {
				return `https://agent1.pk/images/uploads/img.jpg`;
			}
		};
		/* -------------------------------------------------------------------------- */
		/*                                 computed                                   */
		/* -------------------------------------------------------------------------- */
		const compPosterImageMovie = computed(() => {
			return posterImageMovie.file_path;
		});
		/* -------------------------------------------------------------------------- */
		/*                                 watchEffecter                                    */
		/* -------------------------------------------------------------------------- */
		// eslint-disable-next-line no-undef
		watch(isLoadingListVideo, (video) => console.log(video));
		/* -------------------------------------------------------------------------- */
		/*                                 lifecycle                                  */
		/* -------------------------------------------------------------------------- */
		onMounted(() => {
			// console.log("query route = ", route.query);
			backdropImageMovie.value = route.query.image;
			loadAllApi();
			// loadAllEndpoint();
		});

		const api = () => {
			return Api(
				import.meta.env.VITE_API_URL,
				import.meta.env.VITE_API_KEY_TMDB_V3
			);
		};

		return {
			isLoading,
			isLoadingListVideo,
			dataMainVideos,
			indexMainVideos,
			dataVideos,
			dataMovie,
			...toRefs(props),
			openVideo,
			changeMainVideo,
			thumbnailImageVideo,
			thumbnailImagePoster,
			backdropImageMovie,
			posterImageMovie,
			compPosterImageMovie,
		};
	},
};
</script>

<style scoped>
.grid-container-detail-movie {
	display: grid;
	grid-template-columns: 20% 80%;
}

.grid-item-detail-movie-img {
	height: 200px;
}
</style>
