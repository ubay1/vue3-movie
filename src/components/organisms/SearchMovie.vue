<template>
	<FormInput @search="searching" />
	<ListMovie
		:isLoading="isLoading"
		:listMovie="dataMovie"
		:currPage="currPage"
		:totalPage="totalPage"
		@loadMoreMovie="loadMoreMovie"
	/>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { ref, toRefs, onMounted } from "vue";
import FormInput from "../molecules/SearchMovie/FormInput.vue";
import ListMovie from "../molecules/SearchMovie/ListMovie.vue";
import Api from "@/apis";

export default {
	components: {
		FormInput,
		ListMovie,
	},
	props: {},
	setup(props) {
		const searchValue = ref(null);
		const dataMovie = ref([]);
		const isLoading = ref(false);
		const currPage = ref(0);
		const totalPage = ref(0);
		/* -------------------------------------------------------------------------- */
		/*                                    data                                    */
		/* -------------------------------------------------------------------------- */

		/* -------------------------------------------------------------------------- */
		/*                                   methods                                  */
		/* -------------------------------------------------------------------------- */
		const searching = (value) => {
			console.log(value);
			loadMovie(value);
		};

		const loadMoreMovie = () => {
			loadMovie(searchValue.value, true);
		};

		const loadMovie = async (value, loadMore = false) => {
			if (!loadMore) {
				currPage.value = 0;
				totalPage.value = 0;
				dataMovie.value = [];
			}

			if (!value && !loadMore) {
				currPage.value = 0;
				totalPage.value = 0;
				dataMovie.value = [];
			} else {
				if (currPage.value <= totalPage.value) {
					isLoading.value = true;
					currPage.value += 1;
					try {
						const res = await api().movie.getMovieFromSearching({
							language: "en-US",
							page: currPage.value,
							query: value,
						});

						totalPage.value = res.data.total_pages;
						dataMovie.value = [...dataMovie.value, ...res.data.results];
					} catch (error) {
						console.log("error get movie from search = ", error);
					} finally {
						isLoading.value = false;
					}
				}
			}

			// res.data.results.map((item) => {
			// 	dataMovie.value.push(item);
			// });
		};

		const api = () => {
			return Api(
				import.meta.env.VITE_API_URL,
				import.meta.env.VITE_API_KEY_TMDB_V3
			);
		};

		return {
			searching,
			isLoading,
			totalPage,
			currPage,
			dataMovie,
			loadMoreMovie,
		};
	},
};
</script>
