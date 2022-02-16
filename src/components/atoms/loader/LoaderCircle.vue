<template>
	<div class="flex items-center justify-center h-full">
		<img
			v-if="isLoading"
			src="@/assets/images/loader.gif"
			alt=""
			class="w-10"
		/>
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
