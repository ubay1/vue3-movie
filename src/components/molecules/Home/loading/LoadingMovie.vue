<template>
	<div :class="mBottom">
		<div class="flex justify-between items-center">
			<div class="shimmer-image h-8 rounded-md w-32 bg-gray-200 dark:bg-gray-400"></div>
			<div class="shimmer-image h-8 rounded-md w-32 bg-gray-200 dark:bg-gray-400"></div>
		</div>
		<div class="flex mt-4 overflow-hidden">
			<div
				v-for="(item, index) in 10"
				:key="`list lading populer movie - ${index}`"
				class="display-movie"
			>
				<button class="mr-2 mb-2 poster-movie">
					<div
						class="shimmer-image bg-gray-200 dark:bg-gray-400 flex items-center rounded-md"
					>
					</div>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import { ref } from "vue";
export default {
	props: {
		mBottom: {
			type: String,
			default: () => {
				return "mb-8";
			},
		},
	},
	setup(props) {

		const mBottom = ref(props.mBottom);

		return {
			mBottom
		}
	},
};
</script>
