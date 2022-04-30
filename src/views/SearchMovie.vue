<template>
	<SearchMovieOrganisms />
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { ref, toRefs, onMounted } from "vue";
import SearchMovieOrganisms from "@/components/organisms/SearchMovie.vue";

export default {
	components: {
		SearchMovieOrganisms,
	},
	props: {},
	setup() {
		return {};
	},
};
</script>
