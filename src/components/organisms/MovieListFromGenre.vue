<template>
	<div>
		<Suspense>
			<template #default>
				<ListMovie />
			</template>
			<template #fallback>
				<Loading />
			</template>
		</Suspense>
	</div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import Loading from "../molecules/MovieListFromGenre/Loading.vue";
import ListMovie from "../molecules/MovieListFromGenre/ListMovie.vue";

export default {
	components: {
		Loading,
		ListMovie,
	},
	setup() {
		return {};
	},
};
</script>
