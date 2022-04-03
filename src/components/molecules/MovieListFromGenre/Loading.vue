<template>
	<div class="display-container p-4">
		<div
			v-for="(item, index) in 20"
			:key="`list populer movie - ${index}`"
			class="display-movie"
		>
			<button class="mr-2 mb-2 poster-movie">
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
