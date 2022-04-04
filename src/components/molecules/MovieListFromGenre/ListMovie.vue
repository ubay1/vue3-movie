<template>
	<div>
		<div class="movie-genre-container p-4 pb-2">
			<div
				v-for="(item, index) in compDataMovie"
				:key="`list populer movie - ${index}`"
				class="movie-genre-list"
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
						<div class="movie-genre-title rounded-md">
							{{ item.original_title }}
						</div>
					</div>
				</button>
			</div>
		</div>
		<div class="p-4 m-auto flex justify-center loadmore">
			<button
				@click="loadMoreMovie()"
				class="bg-red-400 hover:bg-red-500 text-white rounded-md p-1 px-2 text-sm w-28"
			>
				Load More
			</button>
		</div>
	</div>
</template>

<script>
import { onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import Api from "@/apis";

export default {
	components: {},
	async setup() {
		const genreId = ref();
		const currPage = ref(1);
		const dataMovie = ref(null);

		const route = useRoute();
		genreId.value = route.query.id;

		const router = useRouter();

		/* -------------------------------------------------------------------------- */
		/*                                  computed                                  */
		/* -------------------------------------------------------------------------- */
		const compDataMovie = computed(() => {
			return dataMovie.value;
		});

		/* -------------------------------------------------------------------------- */
		/*                                   method                                   */
		/* -------------------------------------------------------------------------- */
		const loadMoreMovie = async () => {
			currPage.value += 1;
			const res = await api().movie.getMovieFromGenre({
				language: "en-US",
				page: currPage.value,
				with_genres: genreId.value,
			});
			res.data.results.map((item) => {
				dataMovie.value.push(item);
			});
		};

		const api = () => {
			return Api(
				import.meta.env.VITE_API_URL,
				import.meta.env.VITE_API_KEY_TMDB_V3
			);
		};

		const getMovieFromGenre = await api().movie.getMovieFromGenre({
			language: "en-US",
			page: currPage.value,
			with_genres: genreId.value,
		});

		if (dataMovie.value === null) {
			dataMovie.value = getMovieFromGenre.data.results;
		}

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
		/*                                  lifecycle                                 */
		/* -------------------------------------------------------------------------- */

		return {
			genreId,
			dataMovie,
			compDataMovie,
			detailMovie,
			posterMovie,
			loadMoreMovie,
		};
	},
};
</script>

<style lang="scss" scoped>
.movie-genre-container {
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	gap: 20px;

	.movie-genre-list {
		display: grid;
		grid-template-columns: 100% !important;
	}
	.movie-genre-title {
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

@media (min-width: 768px) and (max-width: 991.9px) {
	.movie-genre-container {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 20px;
	}
}

@media (min-width: 582px) and (max-width: 767.9px) {
	.movie-genre-container {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 20px;
	}
}

@media (min-width: 320px) and (max-width: 581.9px) {
	.movie-genre-container {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 20px;

		// .movie-genre-list {
		// 	display: flex;
		// 	justify-content: space-between;
		// }
	}
}

@media (min-width: 0px) and (max-width: 319.9px) {
	.movie-genre-container {
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		gap: 20px;
	}
}
</style>
