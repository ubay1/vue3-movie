<template>
	<div>
		<div class="mt-4">
			<div v-for="(item) in dataGenre" :key="item.id">
				{{item.name}}
			</div>
		</div>
		
		<div class="mt-4">
			<div v-for="(item) in dataPopulerTv" :key="item.id">
				{{item.name}}
			</div>
		</div>

		<div class="mt-4">
			<div v-for="(item) in dataPopulerMovie" :key="item.id">
				{{item.original_title}}
			</div>
		</div>
	</div>
</template>

<script>
import { ref, onMounted } from "vue";
import tv from "../../apis/tv";
import Api from '@/apis';

export default {
	async setup() {
		const dataGenre = ref();
		const dataPopulerTv = ref();
		const dataPopulerMovie = ref();

		const api = () => {
			return Api(
				import.meta.env.VITE_API_URL,
				import.meta.env.VITE_API_KEY_TMDB_V3
			);
		};

		const getListGenre = await api().tv.getListGenre({
			language: "en-US",
		});

		const getTvPopuler = await api().tv.getPopulerTvSeries({
			language: "en-US",
			page: 1,
		});

		const getMoviePopuler = await api().tv.getPopulerMovieSeries({
			language: "en-US",
			page: 1,
		});

		dataGenre.value = getListGenre.data.genres;
		dataPopulerTv.value = getTvPopuler.data.results;
		dataPopulerMovie.value = getMoviePopuler.data.results;

		return {
			dataGenre,
			dataPopulerTv,
			dataPopulerMovie,
		};
	},
};
</script>
