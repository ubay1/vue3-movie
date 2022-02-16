<template>
	<div>
		<img
			v-if="isLoading"
			src="@/assets/images/loader.gif"
			alt=""
			class="w-10 m-auto mt-4"
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
