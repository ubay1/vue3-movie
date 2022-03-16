<template>
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
					v-if="dataListVideos.length === 0"
					class="mt-5 flex justify-center items-center"
				>
					list video tidak ditemukan
				</div>
				<div v-else class="p-2">
					<div
						v-for="(item, index) in dataListVideos[0]"
						:key="`list videos ${index}`"
						@click="changeMainVideo(item, index)"
						class="cursor-pointer"
						:class="{
							'bg-gray-100 dark:bg-gray-700': index === indexMainVideos,
						}"
					>
						<div class="flex justify-between gap-2 p-2 h-24">
							<div class="w-1/2 sm:w-1/4 md:w-1/2 lg:w-1/3 h-full">
								<div class="h-full border-0">
									<img
										v-lazy-img="thumbnailImageVideo()"
										class="bg-gray-200 dark:bg-gray-400 img-lazy w-full h-full object-cover object-top pointer-events-none"
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
</template>

<script>
import { ref, reactive, toRefs, onMounted, watch, computed, isProxy, toRaw, unref } from "vue";
import { useRoute } from "vue-router";
import LoaderCircle from "@/components/atoms/loader/LoaderCircle.vue";
import Api from "@/apis";
import { formatCurrency } from "../../../utils/currency";

export default {
	components: {
		LoaderCircle,
	},
	props: {
		isLoading: {
			type: Boolean,
		},
		isLoadingListVideo: {
			type: Boolean,
		},
		dataMainVideos: {
			type: Object,
		},
		dataListVideos: {
			type: Array,
		},
		indexMainVideos: {
			type: Number,
			default: () => (0)
		},
		backdropImageMovie: {
			type: String,
		},
	},
	setup(props, context) {
		// const loadingMainVideo = ref(true);
		// const loadingListVideo = ref(true);
		// const idxMainVideos = ref(0);
		const backdropImage = ref();
		const dataMainVideo = ref({});

		onMounted(()=>{
			setTimeout(() => {
				if(isProxy(props)){
					const rawObject = toRaw(props)
	
					// console.log(rawObject);
	
					// loadingMainVideo.value = rawObject.isLoading;
					// loadingListVideo.value = rawObject.isLoadingListVideo;
					// idxMainVideos.value = rawObject.indexMainVideos;
					backdropImage.value = rawObject.backdropImageMovie;
					
					if(isProxy(rawObject.dataMainVideos)) {
						const rawDataMainVideos = toRaw(rawObject.dataMainVideos)
						dataMainVideo.value = rawDataMainVideos
					} else {
						dataMainVideo.value = rawObject.dataMainVideos
					}
				}
			}, 500);
		})

		/* -------------------------------------------------------------------------- */
		/*                                  computed                                  */
		/* -------------------------------------------------------------------------- */
		const compDataMainVideo = computed(() => {
			return dataMainVideo.value;
		});

		const compBackdropImage = computed(() => {
			return props.backdropImageMovie
		});

		// const compIsLoading = computed(() => {
		// 	return loadingMainVideo.value;
		// });

		// const compIsLoadingListVideo = computed(() => {
		// 	return loadingListVideo.value
		// });

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

		const changeMainVideo = (data, idx) => {
			// console.log(data, idx);
			const datas = {
				data,
				idx,
			}
			context.emit("changeMainVideo", datas)
		}

		const thumbnailImageVideo = () => {
			if (![null, "", undefined].includes(compBackdropImage.value)) {
				return `${import.meta.env.VITE_POSTER_IMAGE_URL}w300${
					compBackdropImage.value
				}`;
			}
		};
		
		/* -------------------------------------------------------------------------- */
		/*                                   watcher                                  */
		/* -------------------------------------------------------------------------- */
		// watch(compIsLoading, (value) => {
		// 	console.log('loading = ', value)
		// });
		
		return {
			compDataMainVideo,
			openVideo,
			changeMainVideo,
			thumbnailImageVideo
		};
	},
};
</script>
