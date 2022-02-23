<template>
	<div class="flex items-center justify-center h-full">
		<svg v-if="isLoading" class="spinner" viewBox="0 0 50 50">
			<circle
				class="path"
				cx="25"
				cy="25"
				r="20"
				fill="none"
				stroke="black"
				stroke-width="5"
			></circle>
		</svg>
	</div>
</template>

<script>
export default {
	props: {
		isLoading: Boolean,
	},

	// eslint-disable-next-line no-unused-vars
	setup(props) {
		// console.log(props.isLoading);
	},
};
</script>
