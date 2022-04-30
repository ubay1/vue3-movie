<template>
	<div>
		<div class="flex flex-col justify-center items-center">
			<div class="text-gray-600 dark:text-white" v-if="isLoading">
				Load data movie..
			</div>

			<div v-if="listMovie.length === 0 && !isLoading">movie not found</div>
			<div v-else>
				<div class="search-movie-container p-4 pb-2">
					<div
						v-for="(item, index) in listMovie"
						:key="`list search movie - ${index}`"
						class="search-movie-list"
					>
						<button class="poster-movie" @click="detailMovie(item)">
							<div
								class="shimmer-image bg-gray-200 dark:bg-gray-400 flex items-center rounded-md"
							>
								<img
									v-lazy-img="posterMovie(item.poster_path)"
									alt=""
									class="m-auto object-cover pointer-events-none rounded-md"
								/>
								<div class="search-movie-title rounded-md">
									{{ item.original_title }}
								</div>
							</div>
						</button>
					</div>
				</div>
				<div
					class="p-4 m-auto flex justify-center loadmore"
					:class="isActiveBtnLoadMore"
				>
					<button
						@click="loadMoreMovie"
						class="bg-red-400 hover:bg-red-500 text-white rounded-md p-1 px-2 text-sm w-28"
					>
						Load More
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { ref, toRefs, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
	// components: {}
	props: {
		isLoading: {
			type: Boolean,
			default: false,
		},
		listMovie: {
			type: Array,
			default: () => [],
		},
		currPage: {
			type: Number,
			default: 0,
		},
		totalPage: {
			type: Number,
			default: 0,
		},
	},
	setup(props, context) {
		//const titles = toRefs(props.title);
		const router = useRouter();
		/* -------------------------------------------------------------------------- */
		/*                                 lifecycle                                  */
		/* -------------------------------------------------------------------------- */

		/* -------------------------------------------------------------------------- */
		/*                                   method                                   */
		/* -------------------------------------------------------------------------- */
		const loadMoreMovie = () => {
			context.emit("loadMoreMovie");
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
		/* -------------------------------------------------------------------------- */
		/*                                 computed                                   */
		/* -------------------------------------------------------------------------- */
		//const compCount = computed(() => {
		//	return count.value + 2;
		//});
		const isActiveBtnLoadMore = computed(() => ({
			hideBtnLoadMore: props.currPage === props.totalPage,
		}));
		/* -------------------------------------------------------------------------- */
		/*                                 watcher                                    */
		/* -------------------------------------------------------------------------- */
		// eslint-disable-next-line no-undef
		//watch(
		//	() => count.value,
		//		(currCount, prevCount) => {
		//		console.log(currCount, prevCount);
		//	}
		//);
		//watch(titles, (title) => console.log(title));
		return {
			loadMoreMovie,
			posterMovie,
			detailMovie,
			isActiveBtnLoadMore,
		};
	},
};
</script>

<style lang="scss" scoped>
.search-movie-container {
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	gap: 20px;

	.search-movie-list {
		display: grid;
		grid-template-columns: 100% !important;
	}
	.search-movie-title {
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
}
.loadmore {
	display: flex;
	justify-content: center;
	align-items: center;
}

.hideBtnLoadMore {
	display: none !important;
}

@media (min-width: 768px) and (max-width: 991.9px) {
	.search-movie-container {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 20px;
	}
}

@media (min-width: 582px) and (max-width: 767.9px) {
	.search-movie-container {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 20px;
	}
}

@media (min-width: 320px) and (max-width: 581.9px) {
	.search-movie-container {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 20px;

		// .search-movie-list {
		// 	display: flex;
		// 	justify-content: space-between;
		// }
	}
}

@media (min-width: 0px) and (max-width: 319.9px) {
	.search-movie-container {
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		gap: 20px;
	}
}
</style>
