<template>
	<div class="movie-genre-container-loading p-4">
		<div
			v-for="(item, index) in 20"
			:key="`list populer movie - ${index}`"
			class="movie-genre-list-loading"
		>
			<button class="">
				<div
					class="shimmer-image bg-gray-200 dark:bg-gray-400 flex items-center rounded-md"
				></div>
			</button>
		</div>
	</div>
</template>

<script>
import { ref } from "vue";
export default {
	setup(props) {
		return {};
	},
};
</script>

<style lang="scss" scoped>
.movie-genre-container-loading {
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	gap: 20px;

	.movie-genre-list-loading {
		display: grid;
		grid-template-columns: 100% !important;
	}
}

@media (min-width: 768px) and (max-width: 991.9px) {
	.movie-genre-container-loading {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 20px;
	}
}

@media (min-width: 582px) and (max-width: 767.9px) {
	.movie-genre-container-loading {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 20px;
	}
}

@media (min-width: 424px) and (max-width: 581.9px) {
	.movie-genre-container-loading {
		display: grid;
		grid-template-columns: 50% 50%;
		gap: 20px;
	}
}

@media (min-width: 0px) and (max-width: 423.9px) {
	.movie-genre-container-loading {
		display: grid;
		grid-template-columns: 100%;
		gap: 20px;
	}
}
</style>
