<template>
	<div>
		<div class="display-container p-4 pb-2">
			<div
				v-for="(item, index) in compDataMovie"
				:key="`list populer movie - ${index}`"
				class="display-movie"
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
						<div class="title-movie rounded-md">
							{{ item.original_title }}
						</div>
					</div>
				</button>
			</div>
			<div class="pb-2 flex justify-center loadmore">
				<button
					@click="loadMoreMovie()"
					class="bg-red-400 hover:bg-red-500 text-white rounded-md p-1 px-2 text-sm w-full"
				>
					Load More
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import { onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import Api from "@/apis";

export default {
	components: {},
	setup() {
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
			getMovieFromGenre();
		};

		const api = () => {
			return Api(
				import.meta.env.VITE_API_URL,
				import.meta.env.VITE_API_KEY_TMDB_V3
			);
		};

		const getMovieFromGenre = async () => {
			const res = await api().movie.getMovieFromGenre({
				language: "en-US",
				page: currPage.value,
				with_genres: genreId.value,
			});

			if (dataMovie.value === null) {
				dataMovie.value = res.data.results;
			} else {
				res.data.results.map((item) => {
					dataMovie.value.push(item);
				});
			}
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
		/*                                  lifecycle                                 */
		/* -------------------------------------------------------------------------- */
		onMounted(() => {
			getMovieFromGenre();
		});

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

<style></style>
