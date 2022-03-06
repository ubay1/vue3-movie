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
												class="placeholder bg-gray-200 dark:bg-gray-400 img-lazy w-full h-full object-cover object-top"
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

			<!-- deskripsi movie -->
			<div class="my-3">
				<hr />

				<div class="mt-3">
					<LoaderCircle
						v-if="isLoadingListVideo"
						:is-loading="isLoadingListVideo"
					/>
					<div v-else>
						<div class="text-lg font-bold mb-3">{{ dataTv.name }}</div>
						<div class="flex flex-col md:flex-row gap-4">
							<div
								class="w-1/2 m-auto sm:w-2/5 md:w-1/5 md:m-0 lg:w-1/5 lg:m-0"
							>
								<img
									:src="thumbnailImagePoster(compPosterImageTv)"
									alt="backdrop-image-movie"
									class="h-full w-full object-cover"
								/>
							</div>
							<div class="w-full md:w-2/3">
								<div class="flex flex-col gap-2">
									<div class="grid-container-title">
										<div class="title">Negara:</div>
										<div class="flex gap-x-2 flex-wrap">
											<div
												v-for="(item, index) in dataTv.production_countries"
												:key="`dataProductionCountry - ${index}`"
											>
												{{
													`${item.name}${checkCommaOrPoint(
														dataTv.production_countries.length,
														index
													)}`
												}}
											</div>
										</div>
									</div>
									<div class="grid-container-title">
										<div class="title">Genre Film:</div>
										<div class="flex gap-x-2 flex-wrap">
											<div
												v-for="(item, index) in dataTv.genres"
												:key="`dataGenreFilm - ${index}`"
											>
												{{
													`${item.name}${checkCommaOrPoint(
														dataTv.genres.length,
														index
													)}`
												}}
											</div>
										</div>
									</div>
									<div class="grid-container-title">
										<div class="title">Diterbitkan:</div>
										<div>{{ dataTv.first_air_date }}</div>
									</div>
									<div class="grid-container-title">
										<div class="title">Status:</div>
										<div>{{ dataTv.status === 'Ended' ? 'Selesai' : 'Sedang Jalan' }}</div>
									</div>
									<div class="grid-container-title">
										<div class="title">Synopsis:</div>
										<div>{{ dataTv.overview }}</div>
									</div>
								</div>
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
		const imageMovie = ref(null);
		const dataVideos = reactive([]);
		const dataTv = ref({});
		const posterImageTv = reactive({
			file_path: "",
		});
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

		const getDetailTv = () => {
			const params = {
				language: "en-US",
				tvId: route.query.id,
			};

			return api().movie.getDetailTv(params);
		};

		const getImagesFromTv = () => {
			const params = {
				movieId: route.query.id,
				language: "en-US",
				include_image_language: "en",
			};

			return api().movie.getImagesFromTv(params);
		};

		const getVideos = () => {
			const params = {
				language: "en-US",
				tvId: route.query.id,
			};

			return api().movie.getVideosFromTv(params);
		};

		const loadAllApi = () => {
			isLoading.value = true;
			isLoadingListVideo.value = true;

			Promise.all([getImagesFromTv(), getDetailTv(), getVideos()])
				.then(([imagesTv, detailTv, videos]) => {
					const {
						data: { posters },
					} = imagesTv;
					posters.length > 1
						? (posterImageTv.file_path = posters[1].file_path)
						: posters.length > 0
						? (posterImageTv.file_path = posters[0].file_path)
						: null;

					const { data: resultDetailTv } = detailTv;
					const updateDataMovie = { ...dataTv.value, ...resultDetailTv };
					dataTv.value = updateDataMovie;
					// console.log(resultDetailMovie);

					const {
						data: { results: resultVideos },
					} = videos;

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
			if (![null, "", undefined].includes(imageMovie.value)) {
				return `${import.meta.env.VITE_POSTER_IMAGE_URL}w300${
					imageMovie.value
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

		const checkCommaOrPoint = (dataLength, index) => {
			return dataLength > 1 && index !== dataLength - 1 ? "," : ".";
		};
		/* -------------------------------------------------------------------------- */
		/*                                 computed                                   */
		/* -------------------------------------------------------------------------- */
		//const compCount = computed(() => {
		//	return count.value + 2;
		//});
		const compPosterImageTv = computed(() => {
			return posterImageTv.file_path;
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
			imageMovie.value = route.query.image;
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
			dataTv,
			...toRefs(props),
			openVideo,
			changeMainVideo,
			thumbnailImageVideo,
			thumbnailImagePoster,
			checkCommaOrPoint,
			compPosterImageTv,
			imageMovie,
		};
	},
};
</script>

<style scoped>
@media (min-width: 0px) and (max-width: 639.9px) {
	.grid-container-title {
		display: grid;
		grid-template-columns: repeat(1, 1fr);
	}
}

@media (min-width: 640px) and (max-width: 767.9px) {
	.grid-container-title {
		display: grid;
		grid-template-columns: 20% 80%;
		/* padding-left: 2rem;
		padding-right: 2rem; */
	}
	.grid-container-title .title {
		align-self: flex-start;
	}
}

@media (min-width: 768px) and (max-width: 1023.9px) {
	.grid-container-title {
		display: grid;
		grid-template-columns: 25% 75%;
	}
}

@media (min-width: 1024px) {
	.grid-container-title {
		display: grid;
		grid-template-columns: 15% 85%;
	}
}
</style>
