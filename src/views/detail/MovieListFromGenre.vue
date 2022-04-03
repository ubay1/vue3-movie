<template>
	<MovieListFromGenreOrganisms />
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { ref, reactive, toRefs, onMounted, watch, computed } from "vue";
import { useRoute } from "vue-router";
import LoaderCircle from "@/components/atoms/loader/LoaderCircle.vue";
import MovieListFromGenreOrganisms from "@/components/organisms/MovieListFromGenre.vue";
// import axios from "axios";

export default {
	components: {
		LoaderCircle,
		MovieListFromGenreOrganisms,
	},
	setup() {
		return {};
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
